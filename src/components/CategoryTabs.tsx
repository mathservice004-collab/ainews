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
                            className="absolute inset-0 bg-indigo-500 rounded-full"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    <span className={`relative z-10 ${activeCategory === cat ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                        }`}>
                        {cat}
                    </span>
                </button>
            ))}
        </div>
    );
}
