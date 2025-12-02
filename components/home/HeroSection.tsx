import React from 'react';
import { ArrowDown, Database, Code2, Network, ChevronRight } from 'lucide-react';

const HeroSection = () => {
    return (
        <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto pt-20 overflow-hidden">
            {/* Background Elements (Dark mode adjustments) */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-100/40 to-indigo-100/40 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/4" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-purple-100/40 to-pink-100/40 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full blur-3xl -z-10 -translate-x-1/3 translate-y-1/4" />

            <div className="space-y-8 max-w-4xl z-10">
                {/* Status Badge */}
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium animate-fade-in-up">
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                    Data Scientist & Engineer Portfolio
                </div>

                {/* Main Title */}
                <div className="space-y-2">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] break-keep">
                        Bridging the Gap <br />
                        Between <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Data</span> & <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">Service</span>
                    </h1>
                </div>

                {/* Description */}
                <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed break-keep text-balance">
                    안녕하세요, <strong>이명훈</strong>입니다. <br />
                    복잡한 데이터를 분석하는 것을 넘어, <br className="hidden md:block" />
                    <strong>견고한 시스템과 가치 있는 서비스</strong>로 구현하는 <strong>End-to-End 전문가</strong>입니다.
                </p>

                {/* Key Competencies Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                    <div className="p-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-xl hover:border-blue-300 dark:hover:border-blue-500 transition-colors">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 mb-3">
                            <Network size={20} />
                        </div>
                        <h3 className="font-bold text-slate-900 dark:text-white">Engineering</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">HPC, ETL, Pipeline</p>
                    </div>
                    <div className="p-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-xl hover:border-purple-300 dark:hover:border-purple-500 transition-colors">
                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400 mb-3">
                            <Database size={20} />
                        </div>
                        <h3 className="font-bold text-slate-900 dark:text-white">Data Science</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">ML/DL, Statistics</p>
                    </div>
                    <div className="p-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-xl hover:border-green-300 dark:hover:border-green-500 transition-colors">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center text-green-600 dark:text-green-400 mb-3">
                            <Code2 size={20} />
                        </div>
                        <h3 className="font-bold text-slate-900 dark:text-white">Development</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Full-Stack, API</p>
                    </div>
                </div>

                {/* CTA Button */}
                <div className="pt-4">
                    <a href="#projects" className="inline-flex items-center text-lg font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group">
                        View My Projects
                        <ChevronRight className="ml-1 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-400 dark:text-slate-500">
                <ArrowDown size={24} />
            </div>
        </section>
    );
};

export default HeroSection;