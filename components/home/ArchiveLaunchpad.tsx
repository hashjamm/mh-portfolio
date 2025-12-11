'use client';

import React, { useState, useMemo, useEffect } from 'react'; // Added useEffect
import { motion } from 'framer-motion';
import { Database, ArrowUpRight, Activity, Code2, Layers, Cpu } from 'lucide-react';
import { projects } from '@/data/projects';
import ArchiveCommandCenter from '@/components/project/ArchiveCommandCenter';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export default function ArchiveLaunchpad() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // 1. URL-Based State Management
    const isListOpen = searchParams.get('archive') === 'true';

    const handleOpen = (group?: string) => {
        // Push state so back button works to close it
        const params = new URLSearchParams(searchParams.toString());
        params.set('archive', 'true');
        if (group) params.set('group', group);
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const handleClose = () => {
        // Go back in history if we added a state, or just replace if direct
        // For simplicity and "App-like" feel, we try to go back if strictly "closing" via UI
        // But checking history is hard. Safe bet: replace current entry or push clean ONE.
        // Actually, best "back button support" pattern is:
        // User clicks open -> pushState. User clicks back -> pops state -> component re-renders -> closed.
        // User clicks Close Btn -> router.back().
        router.back();
    };

    // 2. Calculate Stats
    const stats = useMemo(() => {
        const total = projects.length;
        const categories = projects.reduce((acc, p) => {
            acc[p.category] = (acc[p.category] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        // Sort categories by count
        const topCategories = Object.entries(categories)
            .sort(([, a], [, b]) => b - a)
            .map(([key, count]) => ({ name: key, count }));

        return { total, topCategories };
    }, []);

    // 3. Dummy Contribution Graph Data (Client-side only)
    const [contributionData, setContributionData] = useState<boolean[]>([]);

    useEffect(() => {
        setContributionData(Array.from({ length: 52 * 7 }).map(() => Math.random() > 0.7));
    }, []);

    return (
        <div className="w-full relative z-10">
            {/* Main Launchpad Card */}
            <motion.div
                onClick={() => handleOpen()}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="
                    relative overflow-hidden
                    w-full h-[300px] md:h-[350px]
                    rounded-3xl cursor-pointer
                    border border-slate-200 dark:border-slate-800
                    bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl
                    group
                "
            >
                {/* A. Background Visuals (Contribution Graph) */}
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] flex flex-wrap gap-1 p-6 content-start pointer-events-none mask-image-gradient">
                    {contributionData.map((active, i) => (
                        <div
                            key={i}
                            className={`w-3 h-3 rounded-sm ${active ? 'bg-slate-900 dark:bg-white' : 'bg-slate-300 dark:bg-slate-700'}`}
                        />
                    ))}
                </div>

                {/* B. Glowing Border Effect on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </div>

                {/* C. Content Container */}
                <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-between p-8 md:p-12 z-10">

                    {/* Left: Stats & Title */}
                    <div className="flex flex-col h-full justify-between w-full md:w-auto">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                                <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">System Online</span>
                            </div>
                            <h3 className="text-4xl md:text-5xl font-light text-slate-900 dark:text-white mb-2">
                                <span className="font-bold">{stats.total}</span> Projects
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400 font-medium">
                                Archived in the database
                            </p>
                        </div>

                        {/* Category Pills */}
                        <div className="relative w-full md:w-auto mt-6 md:mt-0">
                            <div className="flex gap-2 overflow-x-auto scrollbar-hide w-full md:w-auto md:flex-wrap pr-6 md:pr-0">
                                {stats.topCategories.map((cat, idx) => (
                                    <button
                                        key={cat.name}
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent parent card click
                                            handleOpen(cat.name);
                                        }}
                                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 flex-shrink-0 hover:border-blue-500 hover:text-blue-500 transition-all"
                                    >
                                        {idx === 0 && <Code2 className="w-3 h-3" />}
                                        {idx === 1 && <Cpu className="w-3 h-3" />}
                                        {idx === 2 && <Layers className="w-3 h-3" />}
                                        <span>{cat.name}</span>
                                        <span className="opacity-50">| {cat.count}</span>
                                    </button>
                                ))}
                            </div>
                            {/* Mobile Fade Mask */}
                            <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white/90 dark:from-slate-900/90 to-transparent pointer-events-none md:hidden rounded-r-lg" />
                        </div>
                    </div>

                    {/* Right: CTA Section */}
                    <div className="w-full md:w-auto mt-8 md:mt-0 flex flex-col items-center md:items-end gap-6 relative">
                        {/* Decorative Circle */}
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/20 transition-colors duration-500" />

                        <div className="text-right hidden md:block">
                            <h4 className="text-lg font-bold text-slate-900 dark:text-white">Research Archive</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Access full project documentation</p>
                        </div>

                        <button
                            className="
                                flex items-center gap-4 pl-6 pr-4 py-4 rounded-full
                                bg-slate-900 dark:bg-white text-white dark:text-slate-900
                                font-bold text-lg shadow-xl shadow-blue-500/20
                                group-hover:shadow-blue-500/40 group-hover:scale-105
                                transition-all duration-300
                            "
                        >
                            <span>Open Database</span>
                            <div className="w-10 h-10 rounded-full bg-white/20 dark:bg-slate-900/10 flex items-center justify-center">
                                <ArrowUpRight className="w-5 h-5" />
                            </div>
                        </button>
                    </div>

                </div>
            </motion.div>

            <ArchiveCommandCenter
                isOpen={isListOpen}
                onClose={handleClose}
            />
        </div>
    );
}
