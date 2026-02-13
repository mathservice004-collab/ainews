"use client";

import { NewsItem } from "@/types/news";
import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp, AlertCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface NewsCardProps {
    item: NewsItem;
}

export default function NewsCard({ item }: NewsCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="glass-card rounded-3xl overflow-hidden flex flex-col h-full"
        >
            <Link href={`/news/${item.id}`} className="contents">
                {/* Image Section */}
                <div className="relative h-56 w-full group overflow-hidden">
                    <Image
                        src={item.originalImageUrl || "/placeholder.jpg"}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105 group-hover:rotate-1"
                    />
                    <div className="absolute inset-0 bg-indigo-950/20 group-hover:bg-transparent transition-colors duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/20 to-transparent" />
                    <div className="absolute top-4 left-4">
                        <div className="px-3 py-1 rounded-full text-[10px] font-black bg-indigo-600 text-white uppercase tracking-[0.2em] shadow-lg shadow-indigo-600/40">
                            {item.category}
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-slate-100 mb-4 line-clamp-2 leading-tight group-hover:text-indigo-400 transition-colors">
                        {item.title}
                    </h3>

                    <div className="space-y-3 mb-6">
                        {item.summary.slice(0, 2).map((point, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm text-slate-400">
                                <div className="mt-1.5 w-1 h-1 rounded-full bg-indigo-500 shrink-0" />
                                <p className="line-clamp-2">{point}</p>
                            </div>
                        ))}
                    </div>

                    {/* Quick Insights */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] uppercase font-bold tracking-tight">
                                <TrendingUp size={12} />
                                <span>Short Impact</span>
                            </div>
                            <p className="text-xs text-slate-400 line-clamp-2">{item.impact.short}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1.5 text-amber-400 text-[10px] uppercase font-bold tracking-tight">
                                <AlertCircle size={12} />
                                <span>Key Risk</span>
                            </div>
                            <p className="text-xs text-slate-400 line-clamp-2">{item.impact.risk}</p>
                        </div>
                    </div>

                    <div className="mt-auto w-full py-3 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 transition-all flex items-center justify-center gap-2 text-sm font-semibold text-slate-300 group">
                        View Detailed Insight
                        <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
