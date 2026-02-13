"use client";

import { useParams, useRouter } from "next/navigation";
import { MOCK_NEWS } from "@/types/mockData";
import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp, AlertCircle, Lightbulb, Users, Briefcase, GraduationCap, Image as ImageIcon, Globe, Zap } from "lucide-react";
import Image from "next/image";

export default function NewsDetail() {
    const { id } = useParams();
    const router = useRouter();
    const item = MOCK_NEWS.find(n => n.id === id);

    if (!item) {
        return <div className="text-white">News not found</div>;
    }

    return (
        <div className="space-y-12 pb-24">
            {/* Back Button */}
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
            >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Back to Insights</span>
            </button>

            {/* Hero Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 uppercase tracking-widest">
                            {item.category}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-black text-white mt-4 leading-tight">
                            {item.title}
                        </h1>
                        <p className="text-slate-400 text-sm mt-4">
                            Published on {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                    </motion.div>

                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Lightbulb className="text-amber-400" size={24} />
                            Executive Summary
                        </h2>
                        <div className="space-y-3">
                            {item.summary.map((point, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex gap-4 p-4 rounded-2xl bg-slate-800/30 border border-slate-700/50"
                                >
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold">
                                        {i + 1}
                                    </span>
                                    <p className="text-slate-300 leading-relaxed font-medium">{point}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6"
                >
                    <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/5 shadow-2xl group">
                        <Image
                            src={item.originalImageUrl || "/placeholder.jpg"}
                            alt="Main Illustration"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60" />
                        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-[10px] text-white font-black uppercase tracking-widest border border-white/10">
                            Source Visual
                        </div>
                    </div>

                    <div className="relative aspect-video rounded-3xl overflow-hidden border border-indigo-500/20 shadow-2xl group">
                        <Image
                            src={item.aiImageUrl || "/placeholder.jpg"}
                            alt="AI Concept Illustration"
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-indigo-900/10 group-hover:bg-transparent transition-colors duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-indigo-950/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                            <div className="flex items-center gap-2 text-indigo-400 font-black text-[10px] uppercase tracking-[0.3em] mb-2">
                                <ImageIcon size={14} className="animate-pulse" />
                                <span>Gemini Structural Analysis</span>
                            </div>
                            <p className="text-white text-base font-bold leading-tight">AI Generated Conceptual Insight Illustration</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Impact & Action Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Short-term Impact */}
                <div className="glass-card p-8 rounded-[2.5rem] space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <TrendingUp size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white">Short-term Impact</h3>
                    <p className="text-slate-400 leading-relaxed">{item.impact.short}</p>
                </div>

                {/* Long-term Impact */}
                <div className="glass-card p-8 rounded-[2.5rem] space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                        <Globe size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white">Long-term Meaning</h3>
                    <p className="text-slate-400 leading-relaxed">{item.impact.long}</p>
                </div>

                {/* Risks */}
                <div className="glass-card p-8 rounded-[2.5rem] space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                        <AlertCircle size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white">Critical Risks</h3>
                    <p className="text-slate-400 leading-relaxed">{item.impact.risk}</p>
                </div>
            </div>

            {/* Actionable Insights */}
            <section className="space-y-8">
                <h2 className="text-3xl font-black text-white flex items-center gap-3">
                    <Zap className="text-indigo-500" size={32} />
                    Strategic Actions
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* For Investors */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-emerald-400 bg-emerald-500/5 p-4 rounded-2xl border border-emerald-500/10">
                            <Briefcase size={20} />
                            <span className="font-bold uppercase tracking-widest text-sm">For Investors</span>
                        </div>
                        <ul className="space-y-3">
                            {item.actions.investor.map((action, i) => (
                                <li key={i} className="flex gap-3 text-slate-300 text-sm bg-slate-800/20 p-4 rounded-xl border border-slate-700/30">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                                    {action}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* For Educators */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-amber-400 bg-amber-500/5 p-4 rounded-2xl border border-amber-500/10">
                            <GraduationCap size={20} />
                            <span className="font-bold uppercase tracking-widest text-sm">For Educators</span>
                        </div>
                        <ul className="space-y-3">
                            {item.actions.educator.map((action, i) => (
                                <li key={i} className="flex gap-3 text-slate-300 text-sm bg-slate-800/20 p-4 rounded-xl border border-slate-700/30">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                                    {action}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* For Founders */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-indigo-400 bg-indigo-500/5 p-4 rounded-2xl border border-indigo-500/10">
                            <Users size={20} />
                            <span className="font-bold uppercase tracking-widest text-sm">For Founders</span>
                        </div>
                        <ul className="space-y-3">
                            {item.actions.founder.map((action, i) => (
                                <li key={i} className="flex gap-3 text-slate-300 text-sm bg-slate-800/20 p-4 rounded-xl border border-slate-700/30">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                                    {action}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}
