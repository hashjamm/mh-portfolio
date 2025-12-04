import React from 'react';
import { ArrowDown, ChevronRight, Layers } from 'lucide-react';

const HeroSection = () => {
    return (
        <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto pt-20 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10">
                {/* Light Mode Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] dark:opacity-0 transition-opacity duration-500" />
                {/* Dark Mode Particles (Handled by global layout blobs, but we can add more specific ones here if needed) */}
            </div>

            <div className="space-y-10 max-w-4xl z-10">
                {/* Status Badge */}
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium animate-fade-in-up">
                    <span className="w-2 h-2 rounded-full bg-neon mr-2 animate-pulse" />
                    Data Scientist & Engineer Portfolio
                </div>

                {/* Main Title */}
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] break-keep">
                        Bridging the Gap <br />
                        Between <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal to-indigo-600 dark:from-neon dark:to-blue-500">Data</span> & <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-blue-500 dark:to-purple-500">Service</span>
                    </h1>
                </div>

                {/* Description */}
                <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed break-keep text-balance">
                    안녕하세요, <strong>이명훈</strong>입니다. <br />
                    복잡한 데이터를 분석하는 것을 넘어, <br className="hidden md:block" />
                    <strong>견고한 시스템과 가치 있는 서비스</strong>로 구현하는 <strong>End-to-End 전문가</strong>입니다.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                    <a
                        href="#featured"
                        className="px-8 py-4 rounded-full bg-royal dark:bg-neon text-white dark:text-slate-900 font-bold text-lg hover:opacity-90 transition-all hover:scale-105 flex items-center gap-2 shadow-lg shadow-blue-500/20"
                    >
                        View My Projects
                        <ChevronRight className="w-5 h-5" />
                    </a>

                    <a
                        href="#archive"
                        className="px-8 py-4 rounded-full border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all hover:scale-105 flex items-center gap-2"
                    >
                        <Layers className="w-5 h-5" />
                        View System Architecture
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