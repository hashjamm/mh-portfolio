'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import {
    X, Search, LayoutGrid, Table as TableIcon,
    Filter, Database, Smartphone, Activity, Star,
    FolderGit2, Calendar, User, ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, Project } from '@/data/projects';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

interface ArchiveCommandCenterProps {
    isOpen: boolean;
    onClose: () => void;
}

// 카테고리 그룹 매핑
const CATEGORY_GROUPS: Record<string, string[]> = {
    'Engineering': ['Data Engineering', 'Backend API', 'App Dev', 'System Design', 'Automation'],
    'Data & AI': ['AI Model', 'Analytics', 'Causal Inference', 'IoT Data', 'Research & Eng']
};

// 아이콘 매핑 헬퍼
const getCategoryIcon = (category: string) => {
    switch (category) {
        case 'Engineering': return <Database className="w-3.5 h-3.5" />;
        case 'Data & AI': return <Activity className="w-3.5 h-3.5" />;
        // Fallback for individual items if needed
        case 'Data Engineering': return <Database className="w-3.5 h-3.5" />;
        case 'App Dev': return <Smartphone className="w-3.5 h-3.5" />;
        case 'AI Model': return <Star className="w-3.5 h-3.5" />;
        default: return <FolderGit2 className="w-3.5 h-3.5" />;
    }
};

export default function ArchiveCommandCenter({ isOpen, onClose }: ArchiveCommandCenterProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [mounted, setMounted] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Derived State from URL (Defaults to 'All' if not present)
    const selectedGroup = searchParams.get('group') || 'All';

    const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle Group Change (URL Sync)
    const handleGroupChange = (group: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (group === 'All') {
            params.delete('group');
        } else {
            params.set('group', group);
        }
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    // Mount Handling
    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Body Scroll Lock & ESC Key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleEsc);
        } else {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleEsc);
        }
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleEsc);
        };
    }, [isOpen, onClose]);

    // Data Filtering Logic
    const filteredProjects = useMemo(() => {
        return projects.filter(project => {
            // 1. Group Filter
            if (selectedGroup !== 'All') {
                const allowedCategories = CATEGORY_GROUPS[selectedGroup];
                if (!allowedCategories || !allowedCategories.includes(project.category)) {
                    return false;
                }
            }

            // 2. Search Query (Title, OneLiner, Tags, TechStack)
            if (searchQuery.trim() === '') return true;

            const query = searchQuery.toLowerCase();
            const searchableText = [
                project.title,
                project.oneLiner,
                ...project.tags,
                ...(project.techStack?.flatMap(t => t.skills) || [])
            ].join(' ').toLowerCase();

            return searchableText.includes(query);
        });
    }, [searchQuery, selectedGroup]);

    // Define Filter Groups
    const filterGroups = useMemo(() => ['All', ...Object.keys(CATEGORY_GROUPS)], []);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-xl flex flex-col"
                >
                    {/* --- 1. Top Command Bar --- */}
                    <div className={`
                        w-full flex-none transition-all duration-300 z-20 border-b border-slate-200 dark:border-slate-800
                        ${isScrolled ? 'bg-white/80 dark:bg-slate-900/80 shadow-sm' : 'bg-transparent'}
                    `}>
                        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
                            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                                {/* Title & Close (Mobile) */}
                                <div className="w-full md:w-auto flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-600 rounded-lg text-white shadow-lg shadow-blue-500/30">
                                            <Database className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-none">
                                                Research Archive
                                            </h2>
                                            <span className="text-xs text-slate-500 font-medium">Command Center</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 md:hidden">
                                        <ThemeToggle />
                                        <button
                                            onClick={onClose}
                                            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Search Input */}
                                <div className="flex-1 w-full md:max-w-xl relative group">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                    <input
                                        type="text"
                                        autoFocus
                                        placeholder="Search by keywords, tech stack, or problem..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900 border-none ring-1 ring-slate-200 dark:ring-slate-800 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all placeholder:text-slate-400 text-slate-900 dark:text-slate-100"
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1">
                                        <span className="text-[10px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-1.5 py-0.5 rounded text-slate-400">ESC</span>
                                    </div>
                                </div>

                                {/* Controls (View Toggle & Close) */}
                                <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto justify-end">
                                    {/* View Toggle */}
                                    <div className="hidden md:flex items-center p-1 bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                                        <button
                                            onClick={() => setViewMode('grid')}
                                            className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-slate-800 text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                            title="Gallery View"
                                        >
                                            <LayoutGrid className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => setViewMode('table')}
                                            className={`p-2 rounded-md transition-all ${viewMode === 'table' ? 'bg-white dark:bg-slate-800 text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                            title="Table View"
                                        >
                                            <TableIcon className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Theme Toggle (Desktop) */}
                                    <div className="hidden md:block">
                                        <ThemeToggle />
                                    </div>

                                    <div className="hidden md:block w-px h-6 bg-slate-200 dark:bg-slate-800 mx-1"></div>

                                    <button
                                        onClick={onClose}
                                        className="hidden md:flex flex-col items-center justify-center w-10 h-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-500"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>

                            {/* Filters - Mobile Scrollable, Desktop Wrap */}
                            <div className="relative mt-4">
                                <div className="flex items-center gap-2 pt-1 overflow-x-auto scrollbar-hide pb-2 md:pb-0 md:flex-wrap pr-6 md:pr-0">
                                    <Filter className="w-3.5 h-3.5 text-slate-400 mr-1 flex-shrink-0" />
                                    {filterGroups.map(group => {
                                        // Calculate count per group
                                        const count = group === 'All'
                                            ? projects.length
                                            : projects.filter(p => CATEGORY_GROUPS[group]?.includes(p.category)).length;

                                        return (
                                            <button
                                                key={group}
                                                onClick={() => handleGroupChange(group)}
                                                className={`
                                                    px-3 py-1.5 rounded-full text-xs font-medium transition-colors border flex items-center gap-1.5 flex-shrink-0
                                                    ${selectedGroup === group
                                                        ? 'bg-blue-600 border-blue-600 text-white'
                                                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-blue-400 hover:text-blue-500'}
                                                `}
                                            >
                                                {group}
                                                <span className={`text-[10px] opacity-60 ${selectedGroup === group ? 'text-white' : 'text-slate-400'}`}>
                                                    {count}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                                {/* Mobile Fade Mask */}
                                <div className="absolute top-0 bottom-2 right-0 w-8 bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent pointer-events-none md:hidden" />
                            </div>
                        </div>
                    </div>

                    {/* --- 2. Main Content Area --- */}
                    <div
                        className="flex-1 overflow-y-auto min-h-0 scrollbar-hide"
                        onScroll={(e) => setIsScrolled(e.currentTarget.scrollTop > 10)}
                    >
                        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 pb-24">
                            <AnimatePresence mode="wait">
                                {filteredProjects.length === 0 ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex flex-col items-center justify-center py-20 text-center"
                                    >
                                        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mb-4 text-slate-400">
                                            <Search className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">No projects found</h3>
                                        <p className="text-slate-500">Try adjusting your search or filters.</p>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key={viewMode} // Re-render when view changes
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {viewMode === 'grid' ? (
                                            /* GRID VIEW */
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                                                {filteredProjects.map((p) => (
                                                    <Link key={p.id} href={`/projects/${p.id}`}>
                                                        <motion.div
                                                            layoutId={`card-${p.id}`}
                                                            whileHover={{ y: -4 }}
                                                            className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-300 h-full flex flex-row md:flex-col items-stretch md:items-start"
                                                        >
                                                            {/* Image */}
                                                            <div className="w-24 min-w-[6rem] md:w-full md:h-40 relative flex-shrink-0 bg-slate-100 dark:bg-slate-800 self-stretch md:self-auto">
                                                                {p.image ? (
                                                                    <Image src={p.image} alt={p.title} fill className="object-cover md:group-hover:scale-105 transition-transform duration-500" />
                                                                ) : (
                                                                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                                        <FolderGit2 className="w-8 h-8" />
                                                                    </div>
                                                                )}
                                                                <div className="absolute top-2 left-2 md:top-3 md:left-3 hidden md:flex gap-2">
                                                                    <span className="px-2 py-1 bg-white/80 dark:bg-slate-950/80 backdrop-blur text-[10px] font-bold rounded-md flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                                                                        {getCategoryIcon(p.category)}
                                                                        {p.category}
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            {/* Content */}
                                                            <div className="p-4 md:p-5 flex-1 flex flex-col justify-center md:justify-start min-w-0">
                                                                {/* Mobile Category */}
                                                                <div className="md:hidden flex items-center gap-1.5 text-[10px] text-slate-500 font-medium mb-1">
                                                                    {getCategoryIcon(p.category)}
                                                                    {p.category}
                                                                </div>

                                                                <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white md:mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate w-full">
                                                                    {p.title}
                                                                </h3>
                                                                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-2 md:mb-4 hidden md:block">
                                                                    {p.oneLiner}
                                                                </p>
                                                                {/* Mobile OneLiner (1 line) */}
                                                                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mb-2 md:hidden">
                                                                    {p.oneLiner}
                                                                </p>

                                                                <div className="mt-auto flex flex-wrap gap-1.5">
                                                                    {p.tags.slice(0, 3).map(tag => (
                                                                        <span key={tag} className="text-[10px] px-1.5 py-0.5 md:px-2 bg-slate-50 dark:bg-slate-800 rounded text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-700">
                                                                            #{tag}
                                                                        </span>
                                                                    ))}
                                                                    {p.tags.length > 3 && (
                                                                        <span className="text-[10px] px-1.5 py-0.5 text-slate-400">+{p.tags.length - 3}</span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    </Link>
                                                ))}
                                            </div>
                                        ) : (
                                            /* TABLE VIEW (Hidden on mobile usually or keep as is) */
                                            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                                                <div className="overflow-x-auto">
                                                    <table className="w-full text-left text-sm">
                                                        <thead className="bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                                                            <tr>
                                                                <th className="py-3 px-6 font-semibold w-[40%]">Project</th>
                                                                <th className="py-3 px-4 font-semibold w-[15%]">Role</th>
                                                                <th className="py-3 px-4 font-semibold w-[15%]">Period</th>
                                                                <th className="py-3 px-4 font-semibold w-[20%]">Tech Stack</th>
                                                                <th className="py-3 px-4 font-semibold w-[10%] text-right">Link</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                                            {filteredProjects.map((p) => (
                                                                <tr key={p.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                                                                    <td className="py-4 px-6">
                                                                        <Link href={`/projects/${p.id}`} className="flex items-center gap-3">
                                                                            <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex-shrink-0 overflow-hidden relative border border-slate-200 dark:border-slate-700">
                                                                                {p.image ? (
                                                                                    <Image src={p.image} alt={p.title} fill className="object-cover" />
                                                                                ) : (
                                                                                    <Database className="w-5 h-5 text-slate-400 m-auto" />
                                                                                )}
                                                                            </div>
                                                                            <div>
                                                                                <div className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                                                    {p.title}
                                                                                </div>
                                                                                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                                                                                    <span className={`w-1.5 h-1.5 rounded-full ${p.highlight ? 'bg-orange-500' : 'bg-slate-400'}`}></span>
                                                                                    {p.category}
                                                                                </div>
                                                                            </div>
                                                                        </Link>
                                                                    </td>
                                                                    <td className="py-4 px-4 text-slate-600 dark:text-slate-300 font-medium">
                                                                        <div className="flex items-center gap-1.5">
                                                                            <User className="w-3.5 h-3.5 text-slate-400" />
                                                                            {p.role || 'Contributor'}
                                                                        </div>
                                                                    </td>
                                                                    <td className="py-4 px-4 text-slate-500">
                                                                        <div className="flex items-center gap-1.5">
                                                                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                                                            {p.period || '2023'}
                                                                        </div>
                                                                    </td>
                                                                    <td className="py-4 px-4">
                                                                        <div className="flex flex-wrap gap-1.5">
                                                                            {p.tags.slice(0, 2).map(tag => (
                                                                                <span key={tag} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded text-xs border border-slate-200 dark:border-slate-700">
                                                                                    {tag}
                                                                                </span>
                                                                            ))}
                                                                            {p.tags.length > 2 && (
                                                                                <span className="text-xs text-slate-400">+{p.tags.length - 2}</span>
                                                                            )}
                                                                        </div>
                                                                    </td>
                                                                    <td className="py-4 px-4 text-right">
                                                                        <Link
                                                                            href={`/projects/${p.id}`}
                                                                            onClick={onClose}
                                                                            className="inline-flex items-center justify-center p-2 rounded-full hover:bg-white dark:hover:bg-slate-900 hover:shadow-sm border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all text-slate-400 hover:text-blue-600"
                                                                        >
                                                                            <ArrowUpRight className="w-4 h-4" />
                                                                        </Link>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
