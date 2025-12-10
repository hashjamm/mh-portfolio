'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowUpRight, FolderGit2, Star, Smartphone, Database, Activity, Grid, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects, Project } from '@/data/projects';
import { motion } from 'framer-motion';
import ArchiveCommandCenter from '@/components/project/ArchiveCommandCenter';

// 1. 카테고리별 아이콘
const getIcon = (category: string) => {
    switch (category) {
        case 'Engineering': return <Database className="w-4 h-4" />;
        case 'Service': return <Smartphone className="w-4 h-4" />;
        case 'Research': return <Activity className="w-4 h-4" />;
        case 'GenAI': return <Star className="w-4 h-4" />;
        default: return <FolderGit2 className="w-4 h-4" />;
    }
};

// 2. 개별 카드 컴포넌트
const BentoCard = ({ project, isSmall = false }: { project: Project, isSmall?: boolean }) => {
    return (
        <div className="relative group w-full h-full select-none">
            <Link href={`/projects/${project.id}`} className="block h-full w-full draggable-cancel">
                <div className="
          flex flex-col h-full w-full rounded-3xl overflow-hidden 
          border border-slate-200 dark:border-slate-800 
          bg-white dark:bg-slate-900 
          hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-400 dark:hover:border-blue-500
          transition-all duration-500 ease-out
        ">

                    {/* A. 이미지 영역 */}
                    <div className={`${isSmall ? 'h-[45%]' : 'h-[55%]'} w-full relative overflow-hidden bg-slate-100 dark:bg-slate-800 border-b border-slate-100 dark:border-slate-800`}>
                        {/* 카테고리 뱃지 */}
                        <div className="absolute top-4 left-4 z-20">
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-white/20 shadow-sm transition-transform duration-300 group-hover:scale-105">
                                <span className="text-slate-600 dark:text-slate-300">
                                    {getIcon(project.category)}
                                </span>
                                <span className="text-[10px] font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
                                    {project.category}
                                </span>
                            </div>
                        </div>

                        {project.image ? (
                            <>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-in-out group-hover:scale-110 pointer-events-none"
                                />
                            </>
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 dark:text-slate-600 bg-slate-50 dark:bg-slate-800/50">
                                <FolderGit2 className="w-10 h-10 mb-2 opacity-50" />
                                <span className="text-xs font-medium">No Image</span>
                            </div>
                        )}
                    </div>

                    {/* B. 텍스트 영역 */}
                    <div className={`${isSmall ? 'h-[55%]' : 'h-[45%]'} w-full p-6 flex flex-col justify-between bg-white dark:bg-slate-900 relative z-20`}>
                        <div>
                            <div className="flex justify-between items-start mb-3">
                                <h3 className={`font-bold text-slate-900 dark:text-white leading-tight ${isSmall ? 'text-lg' : 'text-xl'} group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2`}>
                                    {project.title}
                                </h3>
                                <div className="p-2 rounded-full bg-slate-50 dark:bg-slate-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors flex-shrink-0 ml-2">
                                    <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                </div>
                            </div>
                            <p className={`text-sm text-slate-500 dark:text-slate-400 ${isSmall ? 'line-clamp-2' : 'line-clamp-3'} leading-relaxed font-medium break-keep`}>
                                {project.oneLiner}
                            </p>
                        </div>

                        {/* 태그 */}
                        <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-slate-800 mt-auto">
                            {project.tags.slice(0, isSmall ? 2 : 3).map((tag) => (
                                <span key={tag} className="text-[11px] px-2.5 py-1 bg-slate-50 dark:bg-slate-800 rounded-md text-slate-500 dark:text-slate-400 font-medium border border-slate-200 dark:border-slate-700 group-hover:border-blue-200 dark:group-hover:border-blue-800 transition-colors">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>

                </div>
            </Link>
        </div>
    );
};

// Column Types Definition
type ColumnType = 'hero' | 'standard-stack' | 'portrait';

interface ColumnData {
    id: string; // Unique ID for the column (e.g., 'col-0')
    type: ColumnType;
    items: Project[];
    originalIndices: number[];
}

// 3. 메인 컨테이너 (Dynamic Mosaic Layout)
export default function ProjectBento() {
    const containerRef = useRef<HTMLDivElement>(null);

    const [activeColIndex, setActiveColIndex] = useState(0);
    const [isListOpen, setIsListOpen] = useState(false);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    // Drag State
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    // Group projects into diverse columns (Memoized)
    const groupedProjects = useMemo(() => {
        const filteredProjects = projects.filter(p => !p.highlight);
        const groups: ColumnData[] = [];
        let i = 0;
        let colIndex = 0;

        // Pattern Sequence for variety (Simplified for Regularity)
        const patternSequence: ColumnType[] = [
            'hero',             // 1 item (Full Height)
            'standard-stack',   // 2 items (50:50)
            'standard-stack',   // 2 items (50:50)
            'hero',             // 1 item (Full Height)
            'standard-stack',   // 2 items (50:50)
        ];
        let patternIndex = 0;

        while (i < filteredProjects.length) {
            const currentType = patternSequence[patternIndex % patternSequence.length];

            if (currentType === 'hero' || currentType === 'portrait') {
                // Single Item Column
                groups.push({
                    id: `col-${colIndex}`,
                    type: currentType,
                    items: [filteredProjects[i]],
                    originalIndices: [i]
                });
                i += 1;
            } else {
                // Stacked Column (Needs 2 items)
                if (i + 1 < filteredProjects.length) {
                    groups.push({
                        id: `col-${colIndex}`,
                        type: currentType,
                        items: [filteredProjects[i], filteredProjects[i + 1]],
                        originalIndices: [i, i + 1]
                    });
                    i += 2;
                } else {
                    // Fallback if only 1 item left: make it a Portrait
                    groups.push({
                        id: `col-${colIndex}`,
                        type: 'portrait',
                        items: [filteredProjects[i]],
                        originalIndices: [i]
                    });
                    i += 1;
                }
            }
            patternIndex++;
            colIndex++;
        }
        return groups;
    }, []);

    // Intersection Observer for Active Column Index
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Intersection Observer logic...
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number(entry.target.getAttribute('data-col-index'));
                        if (!isNaN(index)) {
                            setActiveColIndex(index);
                        }
                    }
                });
            },
            { root: container, threshold: 0.6 }
        );

        const columns = container.querySelectorAll('.column-observer');
        columns.forEach((col) => observer.observe(col));

        // Wheel Event Logic (Vertical -> Horizontal)
        const handleWheel = (e: WheelEvent) => {
            if (e.deltaY === 0) return;
            // Prevent default only if we can scroll
            if (
                (e.deltaY > 0 && container.scrollLeft + container.clientWidth < container.scrollWidth) ||
                (e.deltaY < 0 && container.scrollLeft > 0)
            ) {
                e.preventDefault();
                container.scrollLeft += e.deltaY;
            }
        };

        // Scroll Event for Buttons
        const handleScroll = () => {
            setCanScrollLeft(container.scrollLeft > 10);
            setCanScrollRight(
                container.scrollLeft + container.clientWidth < container.scrollWidth - 10
            );
        };

        container.addEventListener('wheel', handleWheel, { passive: false });
        container.addEventListener('scroll', handleScroll);

        // Initial check
        handleScroll();

        return () => {
            observer.disconnect();
            container.removeEventListener('wheel', handleWheel);
            container.removeEventListener('scroll', handleScroll);
        };
    }, [groupedProjects]);

    // Drag Event Handlers
    const isMouseDown = useRef(false);

    const onMouseDown = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        isMouseDown.current = true;
        setStartX(e.pageX - containerRef.current.offsetLeft);
        setScrollLeft(containerRef.current.scrollLeft);
    };

    const onMouseLeave = () => {
        isMouseDown.current = false;
        setIsDragging(false);
    };

    const onMouseUp = () => {
        isMouseDown.current = false;
        // Small timeout to prevent click trigger after a long drag? 
        // No, if isDragging was true, we want to stop it now.
        // If it was false, it stays false, allowing click.
        setTimeout(() => setIsDragging(false), 0);
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isMouseDown.current || !containerRef.current) return;
        e.preventDefault();
        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = (x - startX) * 1.5; // Scroll-fast

        // Threshold check
        if (!isDragging && Math.abs(x - startX) > 5) {
            setIsDragging(true);
        }

        if (isDragging) {
            containerRef.current.scrollLeft = scrollLeft - walk;
        }
    };

    const scrollToColumn = (index: number) => {
        const container = containerRef.current;
        if (!container) return;

        const targets = container.querySelectorAll(`[data-col-index="${index}"]`);

        if (targets.length > 0) {
            const target = targets[0] as HTMLElement;
            container.scrollTo({
                left: target.offsetLeft - (container.clientWidth / 2) + (target.clientWidth / 2),
                behavior: 'smooth'
            });
            setActiveColIndex(index);
        }
    };

    // Helper to get column styles
    const getColumnStyles = (type: ColumnType) => {
        switch (type) {
            case 'hero': return 'w-[350px] md:w-[500px]';
            case 'standard-stack': return 'w-[320px] md:w-[400px]';
            case 'portrait': return 'w-[280px] md:w-[300px]';
            default: return 'w-[400px]';
        }
    };

    const scrollContainerBy = (amount: number) => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
        }
    };

    return (
        <div className="w-full relative z-10 group/container">
            {/* --- Mobile View (Vertical List + View All) --- */}
            <div className="flex md:hidden flex-col gap-6 px-4 pb-12">
                {projects.slice(0, 4).map((project) => (
                    <div key={project.id} className="h-[280px] w-full">
                        <BentoCard project={project} isSmall={false} />
                    </div>
                ))}

                <button
                    onClick={() => setIsListOpen(true)}
                    className="w-full py-5 mt-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-lg flex items-center justify-center gap-3 shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                    <Database className="w-5 h-5" />
                    <span>Explore Full Archive</span>
                </button>
            </div>

            {/* --- Desktop View (Horizontal Scroll) --- */}
            <div
                ref={containerRef}
                className={`
                    hidden md:flex gap-6 overflow-x-auto pb-12 pt-10 px-4 
                    scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] 
                    h-[700px] items-stretch
                    ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
                `}
                style={{
                    maskImage: 'linear-gradient(to right, transparent, black 1%, black 99%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 1%, black 99%, transparent)'
                }}
                onMouseDown={onMouseDown}
                onMouseLeave={onMouseLeave}
                onMouseUp={onMouseUp}
                onMouseMove={onMouseMove}
            >
                {groupedProjects.map((group, index) => (
                    <div
                        key={`${group.id}-${index}`}
                        className={`flex flex-col gap-6 flex-shrink-0 column-observer ${getColumnStyles(group.type)}`}
                        data-col-index={index}
                    >
                        {/* Render based on Column Type */}
                        {(group.type === 'hero' || group.type === 'portrait') ? (
                            // Single Item
                            <motion.div
                                className="h-full w-full"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className={isDragging ? 'pointer-events-none' : ''}>
                                    <BentoCard project={group.items[0]} />
                                </div>
                            </motion.div>
                        ) : (
                            // Stacked Items (Always Standard 50:50)
                            <>
                                <motion.div
                                    className="w-full"
                                    style={{ height: 'calc(50% - 12px)' }}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                >
                                    <div className={`h-full ${isDragging ? 'pointer-events-none' : ''}`}>
                                        <BentoCard project={group.items[0]} isSmall />
                                    </div>
                                </motion.div>
                                <motion.div
                                    className="w-full"
                                    style={{ height: 'calc(50% - 12px)' }}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    <div className={`h-full ${isDragging ? 'pointer-events-none' : ''}`}>
                                        <BentoCard project={group.items[1]} isSmall />
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </div>
                ))}
            </div>

            {/* Navigation Buttons (Desktop overlay) */}
            <div className="hidden md:block pointer-events-none absolute inset-0 z-20">
                <div className="w-full h-full max-w-[1400px] mx-auto relative">
                    {canScrollLeft && (
                        <button
                            onClick={() => scrollContainerBy(-400)}
                            className="pointer-events-auto absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 hover:scale-110 group-hover/container:opacity-100 opacity-0"
                            aria-label="Scroll Left"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                    )}
                    {canScrollRight && (
                        <button
                            onClick={() => scrollContainerBy(400)}
                            className="pointer-events-auto absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 hover:scale-110 group-hover/container:opacity-100 opacity-0"
                            aria-label="Scroll Right"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    )}
                </div>
            </div>

            {/* Controls (Dots & View All) - Desktop Only */}
            <div className="hidden md:flex flex-col items-center justify-center gap-8 mt-8">
                {/* Dots (Mapped to Columns) */}
                <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-slate-100/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-800/50">
                    {groupedProjects.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => scrollToColumn(idx)}
                            className={`
                                h-2 rounded-full transition-all duration-300
                                ${idx === activeColIndex
                                    ? 'w-10 bg-blue-600 dark:bg-blue-400 shadow-sm'
                                    : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-blue-300 dark:hover:bg-blue-600'
                                }
                            `}
                            aria-label={`Scroll to column ${idx + 1}`}
                        />
                    ))}
                </div>

                {/* View All Button - Prominent CTA */}
                <button
                    onClick={() => setIsListOpen(true)}
                    className="group relative px-8 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-2xl hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 hover:-translate-y-1"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                            <Database className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Database Access</span>
                            <span className="block text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                Open Research Archive
                            </span>
                        </div>
                        <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 ml-2 transition-colors" />
                    </div>
                </button>
            </div>

            <ArchiveCommandCenter
                isOpen={isListOpen}
                onClose={() => setIsListOpen(false)}
            />
        </div>
    );
}