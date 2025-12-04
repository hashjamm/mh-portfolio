'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowUpRight, FolderGit2, Star, Smartphone, Database, Activity } from 'lucide-react';
import { projects, Project } from '@/data/projects';
import { motion } from 'framer-motion';

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
                            <p className={`text-sm text-slate-500 dark:text-slate-400 ${isSmall ? 'line-clamp-2' : 'line-clamp-3'} leading-relaxed font-medium`}>
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
type ColumnType = 'hero' | 'standard-stack' | 'uneven-stack-a' | 'portrait' | 'uneven-stack-b';

interface ColumnData {
    id: string; // Unique ID for the column (e.g., 'col-0')
    type: ColumnType;
    items: Project[];
    originalIndices: number[];
}

// 3. 메인 컨테이너 (Dynamic Mosaic Layout)
export default function ProjectBento() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [activeColIndex, setActiveColIndex] = useState(0); // Track Column Index instead of Project Index
    const [isPlaying, setIsPlaying] = useState(true);

    // Group projects into diverse columns (Memoized)
    const groupedProjects = useMemo(() => {
        const filteredProjects = projects.filter(p => !p.highlight);
        const groups: ColumnData[] = [];
        let i = 0;
        let colIndex = 0;

        // Pattern Sequence for variety
        const patternSequence: ColumnType[] = [
            'hero',             // 1 item
            'uneven-stack-a',   // 2 items (65:35)
            'standard-stack',   // 2 items (50:50)
            'portrait',         // 1 item
            'uneven-stack-b',   // 2 items (40:60)
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

    // Duplicate groups for infinite scroll (x4)
    const displayGroups = useMemo(() => {
        return [...groupedProjects, ...groupedProjects, ...groupedProjects, ...groupedProjects];
    }, [groupedProjects]);

    // 1. Auto Scroll Logic
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let animationFrameId: number;
        const speed = 0.8;

        const scroll = () => {
            if (isPlaying && !isHovered) {
                container.scrollLeft += speed;

                // Infinite Loop Logic
                // Reset when we reach the end of the 2nd set (halfway)
                if (container.scrollLeft >= container.scrollWidth / 2) {
                    container.scrollLeft = 0;
                }
            }
            animationFrameId = requestAnimationFrame(scroll);
        };

        animationFrameId = requestAnimationFrame(scroll);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isHovered, isPlaying]);

    // 2. Intersection Observer for Active Column Index
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number(entry.target.getAttribute('data-col-index'));
                        if (!isNaN(index)) {
                            // Map the display index (0 to 4*N) back to original index (0 to N)
                            setActiveColIndex(index % groupedProjects.length);
                        }
                    }
                });
            },
            {
                root: container,
                threshold: 0.6, // Trigger when 60% of the column is visible
            }
        );

        // Observe Column Wrappers
        const columns = container.querySelectorAll('.column-observer');
        columns.forEach((col) => observer.observe(col));

        return () => observer.disconnect();
    }, [displayGroups, groupedProjects.length]);

    // 3. Wheel Event Logic
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            if (e.deltaY !== 0) {
                container.scrollLeft += e.deltaY;
                e.preventDefault();
            }
        };

        container.addEventListener('wheel', handleWheel, { passive: false });
        return () => container.removeEventListener('wheel', handleWheel);
    }, []);

    const scrollToColumn = (index: number) => {
        const container = containerRef.current;
        if (!container) return;

        setIsPlaying(false);

        // Find the first instance of the column in the DOM
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
            case 'uneven-stack-a': return 'w-[300px] md:w-[320px]';
            case 'portrait': return 'w-[280px] md:w-[300px]';
            case 'uneven-stack-b': return 'w-[320px] md:w-[380px]';
            default: return 'w-[400px]';
        }
    };

    return (
        <div className="w-full relative z-10 group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Horizontal Scroll Container (Flexbox) */}
            <div
                ref={containerRef}
                className="flex gap-6 overflow-x-auto pb-12 pt-10 px-4 scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] h-[700px] items-stretch"
                style={{
                    maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)'
                }}
            >
                {displayGroups.map((group, index) => (
                    <div
                        key={`${group.id}-${index}`}
                        className={`flex flex-col gap-6 flex-shrink-0 column-observer ${getColumnStyles(group.type)}`}
                        data-col-index={index} // This index goes up to 4*N
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
                                <BentoCard project={group.items[0]} />
                            </motion.div>
                        ) : (
                            // Stacked Items
                            <>
                                <motion.div
                                    className="w-full"
                                    style={{
                                        height: group.type === 'uneven-stack-a' ? 'calc(65% - 12px)' :
                                            group.type === 'uneven-stack-b' ? 'calc(40% - 12px)' : 'calc(50% - 12px)'
                                    }}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                >
                                    <BentoCard project={group.items[0]} isSmall />
                                </motion.div>
                                <motion.div
                                    className="w-full"
                                    style={{
                                        height: group.type === 'uneven-stack-a' ? 'calc(35% - 12px)' :
                                            group.type === 'uneven-stack-b' ? 'calc(60% - 12px)' : 'calc(50% - 12px)'
                                    }}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    <BentoCard project={group.items[1]} isSmall />
                                </motion.div>
                            </>
                        )}
                    </div>
                ))}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6 mt-4">
                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-500 transition-colors"
                >
                    {isPlaying ? (
                        <div className="w-4 h-4 flex gap-1 justify-center items-center">
                            <div className="w-1 h-3 bg-current rounded-full" />
                            <div className="w-1 h-3 bg-current rounded-full" />
                        </div>
                    ) : (
                        <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-current border-b-[6px] border-b-transparent ml-0.5" />
                    )}
                </button>

                {/* Dots (Mapped to Columns) */}
                <div className="flex items-center gap-2">
                    {groupedProjects.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => scrollToColumn(idx)}
                            className={`
                                h-1.5 rounded-full transition-all duration-300
                                ${idx === activeColIndex
                                    ? 'w-8 bg-blue-500 dark:bg-blue-400'
                                    : 'w-1.5 bg-slate-300 dark:bg-slate-700 hover:bg-blue-300 dark:hover:bg-blue-600'
                                }
                            `}
                            aria-label={`Scroll to column ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}