"use client";

import { Category } from "@/types/news";
import { motion } from "framer-motion";

interface CategoryTabsProps {
    categories: Category[];
    activeCategory: Category | 'All';
    onCategoryChange: (category: Category | 'All') => void;
}

export default function CategoryTabs({ categories, activeCategory, onCategoryChange }: CategoryTabsProps) {
    const allCategories = ['All', ...categories] as const;

    const categoryMap: Record<string, string> = {
        'All': '전체 보기',
        'Economy': '경제·금융',
        'Edutech': '에듀테크',
        'Science': '과학·기술',
        'Society': '사회·문화',
        'Bio': '바이오·헬스'
    };

    return (
        <div className="flex flex-wrap gap-2 mb-8">
            {allCategories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => onCategoryChange(cat)}
                    className="relative px-6 py-2.5 rounded-full text-sm font-medium transition-colors"
                >
                    {activeCategory === cat && (
                        <motion.div
                            layoutId="active-tab"
                            className="absolute inset-0 bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/20"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    <span className={`relative z-10 ${activeCategory === cat ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                        }`}>
                        {categoryMap[cat] || cat}
                    </span>
                </button>
            ))}
        </div>
    );
}
