"use server";

import { generateNewsInsight } from "@/lib/gemini";
import { supabase } from "@/lib/supabase";
import { NewsItem } from "@/types/news";
import { revalidatePath } from "next/cache";
import Parser from "rss-parser";

const parser = new Parser();

const RSS_FEEDS = [
    { name: 'Yonhap', url: 'https://www.yonhapnewstv.co.kr/browse/feed/', category: 'Society' },
    { name: 'NYT', url: 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml', category: 'Economy' },
    { name: 'BBC', url: 'http://feeds.bbci.co.uk/news/world/rss.xml', category: 'Science' }
];

// 환경 변수 체크
function checkEnv() {
    return !!(process.env.GEMINI_API_KEY && process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export async function syncGlobalNews() {
    if (!checkEnv()) {
        return { success: false, error: "서버 환경 변수(API 키 등)가 설정되지 않았습니다. Vercel 설정을 확인해주세요." };
    }

    console.log("뉴스 동기화 시작...");
    let successCount = 0;
    let skipCount = 0;

    for (const feed of RSS_FEEDS) {
        try {
            const feedData = await parser.parseURL(feed.url);
            const items = feedData.items.slice(0, 3); // 각 피드당 3개씩

            for (const item of items) {
                if (!item.title) continue;

                // 중복 체크
                const { data: existing } = await supabase
                    .from('news')
                    .select('id')
                    .eq('title', item.title.trim())
                    .maybeSingle();

                if (existing) {
                    skipCount++;
                    continue;
                }

                const content = `${item.title}. ${item.contentSnippet || item.content || ""}`;
                const insightJsonString = await generateNewsInsight(content);

                if (insightJsonString) {
                    const cleanJson = insightJsonString.replace(/```json|```/g, "").trim();
                    const parsed = JSON.parse(cleanJson);

                    const newNews = {
                        title: item.title.trim(),
                        category: parsed.category || feed.category,
                        summary: parsed.summary,
                        impact: parsed.impact,
                        actions: parsed.actions,
                        original_image_url: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1000",
                        ai_generated_image_url: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=1000",
                        created_at: new Date().toISOString(),
                    };

                    const { error: insertError } = await supabase.from('news').insert([newNews]);
                    if (insertError) {
                        console.error("Insert Error:", insertError);
                    } else {
                        successCount++;
                    }
                }
            }
        } catch (err) {
            console.error(`${feed.name} 처리 중 에러:`, err);
        }
    }

    revalidatePath("/");
    return { success: true, count: successCount, skipped: skipCount };
}

export async function fetchAllNews() {
    try {
        const { data, error } = await supabase
            .from('news')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error("DB 불러오기 에러:", error);
            return [];
        }

        return (data || []).map(item => ({
            id: item.id,
            title: item.title,
            category: item.category,
            summary: item.summary,
            impact: item.impact,
            actions: item.actions,
            originalImageUrl: item.original_image_url,
            aiImageUrl: item.ai_generated_image_url,
            createdAt: item.created_at
        })) as NewsItem[];
    } catch (err) {
        console.error("패치 에러:", err);
        return [];
    }
}

export async function processNewsUrl(url: string) {
    if (!checkEnv()) {
        return { success: false, error: "API 키가 설정되지 않았습니다." };
    }

    try {
        // 실제 운영 시에는 이 부분에 뉴스 스크래핑 로직이 들어갑니다.
        const mockContentForUrl = "사용자가 입력한 URL에서 추출된 뉴스 본문 예시입니다.";
        const insightJsonString = await generateNewsInsight(mockContentForUrl);

        if (!insightJsonString) throw new Error("AI 분석 실패");

        const cleanJson = insightJsonString.replace(/```json|```/g, "").trim();
        const parsedInsight = JSON.parse(cleanJson);

        const newNews = {
            title: parsedInsight.title,
            category: parsedInsight.category,
            summary: parsedInsight.summary,
            impact: parsedInsight.impact,
            actions: parsedInsight.actions,
            original_image_url: "https://images.unsplash.com/photo-1585829365234-781fcd04c838?w=1000",
            ai_generated_image_url: "https://images.unsplash.com/photo-1620712943543-bcc462824100?w=1000",
            created_at: new Date().toISOString(),
        };

        const { data, error } = await supabase.from('news').insert([newNews]).select();
        revalidatePath("/");
        return { success: true, data };
    } catch (err) {
        return { success: false, error: "뉴스 처리 중 오류가 발생했습니다." };
    }
}
