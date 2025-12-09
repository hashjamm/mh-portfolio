'use client';

import React, { useEffect, useRef } from 'react';
import { ArrowDown, ChevronRight, Layers } from 'lucide-react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';

const HeroSection = () => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 700], [0, 250]);
    const opacity = useTransform(scrollY, [0, 600], [1, 0]);

    // Mouse Spotlight Effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            mouseX.set(clientX);
            mouseY.set(clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    const background = useMotionTemplate`radial-gradient(
        600px circle at ${mouseX}px ${mouseY}px,
        rgba(29, 78, 216, 0.15),
        transparent 80%
    )`;

    return (
        <section ref={ref} className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto pt-20 pb-40 md:pb-0 overflow-hidden">
            {/* Dynamic Background */}
            <motion.div
                className="absolute inset-0 -z-10 opacity-0 dark:opacity-100 transition-opacity duration-500"
                style={{ background }}
            />
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 dark:opacity-10" />

            <motion.div style={{ y, opacity }} className="space-y-10 max-w-4xl z-10">
                {/* Status Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium"
                >
                    <span className="w-2 h-2 rounded-full bg-neon mr-2 animate-pulse" />
                    Data Scientist & Engineer Portfolio
                </motion.div>

                {/* Main Title with Staggered Reveal */}
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] break-keep">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="block"
                        >
                            Bridging the Gap
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="block"
                        >
                            Between <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal to-indigo-600 dark:from-neon dark:to-blue-500">Data</span> & <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-blue-500 dark:to-purple-500">Service</span>
                        </motion.span>
                    </h1>
                </div>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed break-keep text-balance"
                >
                    안녕하세요, <strong>이명훈</strong>입니다. <br />
                    복잡한 데이터를 분석하는 것을 넘어, <br className="hidden md:block" />
                    <strong>견고한 시스템과 가치 있는 서비스</strong>로 구현하는 <strong>End-to-End 전문가</strong>입니다.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-wrap gap-4 pt-4"
                >
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
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 1, duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-400 dark:text-slate-500"
            >
                <ArrowDown size={24} />
            </motion.div>
        </section>
    );
};

export default HeroSection;