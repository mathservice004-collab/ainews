"use client";

import { useState } from "react";
import { MOCK_NEWS } from "@/types/mockData";
import { Category } from "@/types/news";
import NewsCard from "@/components/NewsCard";
import CategoryTabs from "@/components/CategoryTabs";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Globe, Zap, Plus, X, Link as LinkIcon, Loader2 } from "lucide-react";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newsUrl, setNewsUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const categories: Category[] = ['Economy', 'Edutech', 'Science', 'Society', 'Bio'];

  const filteredNews = activeCategory === 'All'
    ? MOCK_NEWS
    : MOCK_NEWS.filter(item => item.category === activeCategory);

  const handleProcessNews = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsProcessing(false);
    setIsModalOpen(false);
    setNewsUrl("");
    alert("In this demo, news processing is simulated. In production, this would call your AI pipeline.");
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
            <span>Next-Gen Intelligence</span>
          </motion.div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="group flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-lg shadow-indigo-500/20"
          >
            <Plus size={18} className="group-hover:rotate-90 transition-transform" />
            Add Global News
          </button>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-5xl font-black text-white tracking-tight">
              Insight<span className="text-gradient">Sphere</span> AI
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl">
              Global news structured into actionable insights using advanced AI models.
              Visualize complexity, understand impact, and act strategically.
            </p>
          </div>

          <div className="hidden lg:flex gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
              <Globe size={18} />
              <span className="text-sm font-semibold">Global Coverage</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
              <Zap size={18} />
              <span className="text-sm font-semibold">Real-time Analysis</span>
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

      {/* News Grid */}
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

      {/* Empty State */}
      {filteredNews.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-24 flex flex-col items-center justify-center text-slate-500"
        >
          <div className="w-16 h-16 rounded-3xl bg-slate-800/50 flex items-center justify-center mb-4 border border-slate-700">
            <Sparkles size={32} />
          </div>
          <p className="text-lg">No news found in this category yet.</p>
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
              >
                <X size={24} />
              </button>

              <div className="space-y-6">
                <div className="space-y-2 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mx-auto mb-4">
                    <LinkIcon size={32} />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Process Global Intelligence</h2>
                  <p className="text-slate-400">Enter a news URL to extract structured insights and generate AI visuals.</p>
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
                        AI Agent is Analyzing...
                      </>
                    ) : (
                      <>
                        <Zap size={20} />
                        Start Intelligent Analysis
                      </>
                    )}
                  </button>
                </form>

                <div className="pt-4 border-t border-slate-800 flex justify-center gap-6">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 uppercase font-black tracking-tighter">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    Gemini 1.5 Pro
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 uppercase font-black tracking-tighter">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    Structured JSON
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 uppercase font-black tracking-tighter">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    AI Concept Gen
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
            <h2 className="text-2xl font-bold text-white">Unlock Deep Intelligence</h2>
            <p className="text-slate-400">Subscribe for weekly strategic briefings based on global news.</p>
          </div>
          <div className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow md:w-80 bg-slate-900/50 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            />
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-4 rounded-2xl transition-all">
              Join Now
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
