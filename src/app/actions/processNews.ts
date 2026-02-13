"use server";

import { generateNewsInsight } from "@/lib/gemini";
import { supabase } from "@/lib/supabase";
import { NewsItem } from "@/types/news";
import { revalidatePath } from "next/cache";
import Parser from "rss-parser";

const parser = new Parser();

const RSS_FEEDS = [
    { name: 'Yonhap', url: 'https://www.yonhapnewstv.co.kr/browse/feed/', category: 'Society' },
    { name: 'NYT', url: 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml', category: 'Economy' }
];

export async function syncGlobalNews() {
    console.log("뉴스 동기화 시작...");
    let successCount = 0;

    for (const feed of RSS_FEEDS) {
        try {
            const feedData = await parser.parseURL(feed.url);
            // 최신 2개 기사만 샘플링하여 처리 (과부하 방지)
            const items = feedData.items.slice(0, 2);

            for (const item of items) {
                // 중복 체크 (제목 기준)
                const { data: existing } = await supabase
                    .from('news')
                    .select('id')
                    .eq('title', item.title)
                    .single();

                if (existing) continue;

                const content = `${item.title}. ${item.contentSnippet || item.content || ""}`;
                const insightJsonString = await generateNewsInsight(content);

                if (insightJsonString) {
                    const cleanJson = insightJsonString.replace(/```json|```/g, "").trim();
                    const parsed = JSON.parse(cleanJson);

                    const newNews = {
                        title: item.title,
                        category: parsed.category || feed.category,
                        summary: parsed.summary,
                        impact: parsed.impact,
                        actions: parsed.actions,
                        original_image_url: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800",
                        ai_generated_image_url: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800",
                        created_at: new Date().toISOString(),
                    };

                    await supabase.from('news').insert([newNews]);
                    successCount++;
                }
            }
        } catch (err) {
            console.error(`${feed.name} 페치 에러:`, err);
        }
    }

    revalidatePath("/");
    return { success: true, count: successCount };
}

export async function processNewsUrl(url: string) {
    try {
        const rawContent = `뉴스 URL(${url})에서 추출된 원문 데이터 예시...`;
        const insightJsonString = await generateNewsInsight(rawContent);
        if (!insightJsonString) throw new Error("AI 분석 실패");

        const cleanJson = insightJsonString.replace(/```json|```/g, "").trim();
        const parsedInsight = JSON.parse(cleanJson);

        const newNews = {
            title: parsedInsight.title,
            category: parsedInsight.category,
            summary: parsedInsight.summary,
            impact: parsedInsight.impact,
            actions: parsedInsight.actions,
            original_image_url: "https://images.unsplash.com/photo-1585829365234-781fcd04c838?w=800",
            ai_generated_image_url: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800",
            created_at: new Date().toISOString(),
        };

        const { data, error } = await supabase
            .from('news')
            .insert([newNews])
            .select();

        if (error) console.error("DB 저장 에러:", error);

        revalidatePath("/");
        return { success: true, data };
    } catch (error) {
        console.error("뉴스 처리 중 에러:", error);
        return { success: false, error: "뉴스 분석 중 오류가 발생했습니다." };
    }
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

        return data.map(item => ({
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
        console.error("패치 중 예외 발생:", err);
        return [];
    }
}
