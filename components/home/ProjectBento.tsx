'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, FolderGit2, Star, Smartphone, Database, Activity } from 'lucide-react';
import { projects, Project } from '@/data/projects';

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

// 2. 카드 크기 결정 (Grid Span)
const getSpanClass = (id: string) => {
    if (id === 'cotdex') return 'md:col-span-2 md:row-span-2';
    if (id === 'hunomind') return 'md:col-span-1 md:row-span-2';
    if (id === 'genai-report') return 'md:col-span-2 md:row-span-1';
    return 'md:col-span-1 md:row-span-1';
};

// 3. 개별 카드 컴포넌트
const BentoCard = ({ project }: { project: Project }) => {
    const spanClass = getSpanClass(project.id);
    const isLarge = spanClass.includes('col-span-2') || spanClass.includes('row-span-2');

    return (
        <div className={`relative group w-full h-full ${spanClass}`}>
            <Link href={`/projects/${project.id}`} className="block h-full w-full">
                <div className="
          flex flex-col h-full w-full rounded-3xl overflow-hidden 
          border border-slate-200 dark:border-slate-800 
          bg-white dark:bg-slate-900 
          hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-400 dark:hover:border-blue-500
          transition-all duration-500 ease-out transform hover:-translate-y-1
        ">

                    {/* A. 이미지 영역 (높이 50% 강제 고정) */}
                    <div className="h-1/2 w-full relative overflow-hidden bg-slate-100 dark:bg-slate-800 border-b border-slate-100 dark:border-slate-800">
                        {/* 카테고리 뱃지 (Glassmorphism) */}
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

                        {project.thumbnail ? (
                            <>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                                <img
                                    src={project.thumbnail}
                                    alt={project.title}
                                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-in-out group-hover:scale-110"
                                />
                            </>
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 dark:text-slate-600 bg-slate-50 dark:bg-slate-800/50">
                                <FolderGit2 className="w-10 h-10 mb-2 opacity-50" />
                                <span className="text-xs font-medium">No Image</span>
                            </div>
                        )}
                    </div>

                    {/* B. 텍스트 영역 (높이 50% 강제 고정) */}
                    <div className="h-1/2 w-full p-6 flex flex-col justify-between bg-white dark:bg-slate-900 relative z-20">
                        <div>
                            <div className="flex justify-between items-start mb-3">
                                <h3 className={`font-bold text-slate-900 dark:text-white leading-tight ${isLarge ? 'text-2xl' : 'text-xl'} group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors`}>
                                    {project.title}
                                </h3>
                                <div className="p-2 rounded-full bg-slate-50 dark:bg-slate-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors">
                                    <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                </div>
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed font-medium">
                                {project.description}
                            </p>
                        </div>

                        {/* 태그 */}
                        <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-slate-800 mt-4">
                            {project.tags.slice(0, 3).map((tag) => (
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

// 4. 메인 컨테이너
export default function ProjectBento() {
    return (
        <div className="w-full relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[350px] gap-6">
                {projects.map((project) => (
                    <BentoCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
}