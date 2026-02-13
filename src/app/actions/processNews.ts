"use server";

import { generateNewsInsight } from "@/lib/gemini";
import { supabase } from "@/lib/supabase";
import { NewsItem } from "@/types/news";
import { revalidatePath } from "next/cache";

export async function processNewsUrl(url: string) {
    try {
        // 1. 실제 뉴스 데이터 수크랩 로직 (여기서는 예시 텍스트로 대체)
        // 실제 운영 시에는 cheerio나 puppeteer 등을 사용하여 URL의 본문을 추출합니다.
        const rawContent = `뉴스 URL(${url})에서 추출된 원문 데이터 예시...`;

        // 2. Gemini AI를 통한 구조화 분석
        const insightJsonString = await generateNewsInsight(rawContent);
        if (!insightJsonString) throw new Error("AI 분석 실패");

        // JSON 파싱 (Gemini 응답이 마크다운 코드 블록 등으로 올 수 있으므로 정제 필요)
        const cleanJson = insightJsonString.replace(/```json|```/g, "").trim();
        const parsedInsight = JSON.parse(cleanJson);

        // 3. DB 저장 (Supabase 사용 시)
        const newNews: Omit<NewsItem, 'id'> = {
            title: parsedInsight.title,
            category: parsedInsight.category,
            summary: parsedInsight.summary,
            impact: parsedInsight.impact,
            actions: parsedInsight.actions,
            originalImageUrl: "https://images.unsplash.com/photo-1585829365234-781fcd04c838?w=800", // 기본 이미지
            aiImageUrl: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800", // AI 생성 이미지
            createdAt: new Date().toISOString(),
        };

        const { data, error } = await supabase
            .from('news')
            .insert([newNews])
            .select();

        if (error) {
            console.error("DB 저장 에러:", error);
            // DB 연결이 안되어 있으면 로컬 메모리에라도 추가하는 로직이 필요할 수 있음
        }

        revalidatePath("/");
        return { success: true, data };
    } catch (error) {
        console.error("뉴스 처리 중 에러:", error);
        return { success: false, error: "뉴스 분석 중 오류가 발생했습니다." };
    }
}

export async function fetchAllNews() {
    const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('createdAt', { ascending: false });

    if (error) {
        console.error("뉴스 불러오기 에러:", error);
        return [];
    }
    return data as NewsItem[];
}
