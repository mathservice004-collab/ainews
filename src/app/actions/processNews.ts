"use server";

import { generateNewsInsight } from "@/lib/gemini";
import { supabase } from "@/lib/supabase";
import { NewsItem } from "@/types/news";
import { revalidatePath } from "next/cache";
import Parser from "rss-parser";

const parser = new Parser();

// RSS 피드 목록 (테스트를 위해 우선 2개로 축소)
const RSS_FEEDS = [
    { name: '연합뉴스', url: 'https://www.yonhapnewstv.co.kr/browse/feed/', category: 'Society' },
    { name: 'NYT', url: 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml', category: 'Economy' }
];

function checkEnv() {
    const keys = {
        GEMINI: !!process.env.GEMINI_API_KEY,
        SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        SUPABASE_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    };
    console.log("환경 변수 체크:", keys);
    return keys.GEMINI && keys.SUPABASE_URL && keys.SUPABASE_KEY;
}

export async function syncGlobalNews() {
    if (!checkEnv()) {
        return { success: false, error: "서버 설정(API 키)이 누락되었습니다. Vercel 환경 변수를 확인해주세요." };
    }

    let successCount = 0;
    let skipCount = 0;

    for (const feed of RSS_FEEDS) {
        try {
            console.log(`${feed.name} 데이터 가져오는 중...`);
            const feedData = await parser.parseURL(feed.url);

            // 타임아웃 방지를 위해 피드당 '가장 최신 1개'만 우선 처리
            const item = feedData.items[0];
            if (!item || !item.title) continue;

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

            console.log(`AI 분석 시작: ${item.title}`);
            const content = `${item.title}. ${item.contentSnippet || item.content || ""}`;
            const insightJsonString = await generateNewsInsight(content);

            if (insightJsonString) {
                const cleanJson = insightJsonString.replace(/```json|```/g, "").trim();
                const parsed = JSON.parse(cleanJson);

                const newNews = {
                    title: item.title.trim(),
                    category: parsed.category || feed.category,
                    summary: parsed.summary || [],
                    impact: parsed.impact || { short: "", long: "", risk: "" },
                    actions: parsed.actions || { investor: [], educator: [], founder: [] },
                    original_image_url: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1000",
                    ai_generated_image_url: "https://images.unsplash.com/photo-1620712943543-bcc462824100?w=1000",
                    created_at: new Date().toISOString(),
                };

                const { error: insertError } = await supabase.from('news').insert([newNews]);
                if (!insertError) successCount++;
                else console.error("DB 저장 에러:", insertError);
            }
        } catch (err: any) {
            console.error(`${feed.name} 처리 에러:`, err.message);
            // 개별 피드 에러는 무시하고 다음 피드로 진행
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

        if (error) throw error;

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
        console.error("뉴스 로딩 실패:", err);
        return [];
    }
}

export async function processNewsUrl(url: string) {
    // 수동 분석은 1개씩 처리되므로 타임아웃 위험이 적음
    try {
        const insightJsonString = await generateNewsInsight(`URL 분석 요청: ${url}`);
        if (!insightJsonString) throw new Error("AI 분석 실패");

        const parsedInsight = JSON.parse(insightJsonString.replace(/```json|```/g, "").trim());
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
        return { success: false, error: "뉴스 처리 실패" };
    }
}
