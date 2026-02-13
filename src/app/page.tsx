"use client";

import { useState, useEffect } from "react";
import { MOCK_NEWS } from "@/types/mockData";
import { Category, NewsItem } from "@/types/news";
import NewsCard from "@/components/NewsCard";
import CategoryTabs from "@/components/CategoryTabs";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Globe, Zap, Plus, X, Link as LinkIcon, Loader2, RefreshCcw, Rss } from "lucide-react";
import { processNewsUrl, fetchAllNews, syncGlobalNews } from "@/app/actions/processNews";

export default function Home() {
  const [news, setNews] = useState<NewsItem[]>(MOCK_NEWS);
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newsUrl, setNewsUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  const categories: Category[] = ['Economy', 'Edutech', 'Science', 'Society', 'Bio'];

  useEffect(() => {
    async function loadNews() {
      setIsLoading(true);
      const dbNews = await fetchAllNews();
      if (dbNews && dbNews.length > 0) {
        setNews([...dbNews, ...MOCK_NEWS]); // DB 데이터와 Mock 데이터를 합침
      }
      setIsLoading(false);
    }
    loadNews();
  }, []);

  const filteredNews = activeCategory === 'All'
    ? news
    : news.filter(item => item.category === activeCategory);

  const handleSyncNews = async () => {
    setIsSyncing(true);
    const result = await syncGlobalNews();
    if (result.success) {
      const updatedNews = await fetchAllNews();
      setNews([...updatedNews, ...MOCK_NEWS]);
      alert(`${result.count}개의 새로운 글로벌 뉴스가 동기화되었습니다.`);
    }
    setIsSyncing(false);
  };

  const handleProcessNews = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const result = await processNewsUrl(newsUrl);

    if (result.success) {
      // 성공 시 목록 갱신을 위해 다시 불러오기
      const updatedNews = await fetchAllNews();
      setNews([...updatedNews, ...MOCK_NEWS]);
      setIsModalOpen(false);
      setNewsUrl("");
    } else {
      alert(result.error || "처리 중 오류가 발생했습니다.");
    }

    setIsProcessing(false);
  };

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <header className="space-y-4">
        <div className="flex justify-between items-start">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-indigo-400 font-semibold tracking-widest text-sm uppercase"
          >
            <Sparkles size={16} />
            <span>차세대 인텔리전스</span>
          </motion.div>

          <div className="flex gap-3">
            <button
              onClick={handleSyncNews}
              disabled={isSyncing}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 hover:bg-indigo-500/20 transition-all disabled:opacity-50"
              title="글로벌 뉴스 동기화"
            >
              {isSyncing ? <Loader2 size={18} className="animate-spin" /> : <Rss size={18} />}
              <span className="text-sm font-bold truncate hidden sm:inline">글로벌 동기화</span>
            </button>
            <button
              onClick={() => window.location.reload()}
              className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all"
              title="새로고침"
            >
              <RefreshCcw size={20} className={isLoading ? "animate-spin" : ""} />
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="group flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-lg shadow-indigo-500/20"
            >
              <Plus size={18} className="group-hover:rotate-90 transition-transform" />
              <span className="hidden sm:inline">글로벌 뉴스 분석 추가</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-5xl font-black text-white tracking-tight">
              Insight<span className="text-gradient">Sphere</span> AI
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl">
              매일의 글로벌 뉴스를 AI로 구조화하여 실시간 전략적 인사이트를 제공합니다.
              시장을 선도하는 지능형 웹앱, InsightSphere와 함께하세요.
            </p>
          </div>

          <div className="hidden lg:flex gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
              <Globe size={18} />
              <span className="text-sm font-semibold">글로벌 커버리지</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
              <Zap size={18} />
              <span className="text-sm font-semibold">실시간 분석 중</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <Loader2 className="animate-spin text-indigo-500" size={48} />
          <p className="text-slate-400 font-medium font-mono">가장 최신의 인사이트를 불러오는 중...</p>
        </div>
      )}

      {/* News Grid */}
      {!isLoading && (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredNews.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Empty State */}
      {!isLoading && filteredNews.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-24 flex flex-col items-center justify-center text-slate-500"
        >
          <div className="w-16 h-16 rounded-3xl bg-slate-800/50 flex items-center justify-center mb-4 border border-slate-700">
            <Sparkles size={32} />
          </div>
          <p className="text-lg">해당 카테고리에 아직 뉴스가 없습니다.</p>
        </motion.div>
      )}

      {/* Add News Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg glass-card rounded-[2.5rem] p-8 shadow-2xl border-indigo-500/30"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors"
                disabled={isProcessing}
              >
                <X size={24} />
              </button>

              <div className="space-y-6">
                <div className="space-y-2 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mx-auto mb-4">
                    <LinkIcon size={32} />
                  </div>
                  <h2 className="text-2xl font-bold text-white">글로벌 인텔리전스 분석</h2>
                  <p className="text-slate-400">분석할 뉴스 URL을 입력하면 Gemini AI가 구조화된 인사이트를 즉시 추출합니다.</p>
                </div>

                <form onSubmit={handleProcessNews} className="space-y-4">
                  <div className="relative">
                    <input
                      type="url"
                      required
                      placeholder="https://example.com/world-news..."
                      value={newsUrl}
                      onChange={(e) => setNewsUrl(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600"
                    />
                  </div>
                  <button
                    disabled={isProcessing}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-3"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Gemini AI가 기사를 읽고 분석 중...
                      </>
                    ) : (
                      <>
                        <Zap size={20} />
                        딥 분석 시작 및 결과 저장
                      </>
                    )}
                  </button>
                </form>

                <div className="pt-4 border-t border-slate-800 flex justify-center gap-6">
                  <div className="flex items-center gap-1.5 text-[10px] text-indigo-400 uppercase font-black tracking-tighter">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                    Gemini 1.5 Pro
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-indigo-400 uppercase font-black tracking-tighter">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                    실시간 정형화
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer / CTA */}
      <footer className="pt-24 border-t border-slate-800/50">
        <div className="glass-card rounded-[2.5rem] p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">심층 인텔리전스 구독</h2>
            <p className="text-slate-400">매일 아침 세계의 흐름을 요약한 전략 브리핑을 받아보세요.</p>
          </div>
          <div className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              placeholder="이메일을 입력하세요"
              className="flex-grow md:w-80 bg-slate-900/50 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            />
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-4 rounded-2xl transition-all">
              지금 구독하기
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
