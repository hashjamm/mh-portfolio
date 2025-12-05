'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Calendar } from 'lucide-react';

const TimelineItem = ({
    date,
    title,
    role,
    description,
    subDescription,
    icon: Icon,
    isLast = false,
    index
}: {
    date: string;
    title: string;
    role: string;
    description: string;
    subDescription?: string[];
    icon: React.ElementType;
    isLast?: boolean;
    index: number;
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-8 md:pl-0"
        >
            {/* Mobile Vertical Line (Absolute Left) */}
            <div className="md:hidden absolute left-2 top-2 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800" />

            <div className="flex flex-col md:flex-row gap-4 md:gap-8 group">
                {/* 1. Date Column (Left) */}
                <div className="hidden md:block w-32 pt-2 text-right flex-shrink-0">
                    <span className="text-sm font-bold text-slate-500 dark:text-slate-400 font-mono">
                        {date}
                    </span>
                </div>

                {/* 2. Timeline Line (Center - Desktop) */}
                <div className="hidden md:flex flex-col items-center relative">
                    {/* Icon Circle */}
                    <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center z-10 group-hover:border-royal dark:group-hover:border-neon transition-colors shadow-sm group-hover:shadow-[0_0_15px_-3px_rgba(37,99,235,0.3)] dark:group-hover:shadow-[0_0_15px_-3px_rgba(0,240,255,0.3)]">
                        <Icon className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-royal dark:group-hover:text-neon transition-colors" />
                    </div>
                    {/* Vertical Line */}
                    {!isLast && (
                        <div className="w-0.5 h-full bg-slate-200 dark:bg-slate-800 absolute top-10 group-hover:bg-gradient-to-b from-royal/50 to-transparent dark:from-neon/50 transition-all duration-500" />
                    )}
                </div>

                {/* 3. Content Column (Right) */}
                <div className="pb-12 flex-1">
                    {/* Mobile Date & Icon */}
                    <div className="md:hidden flex items-center gap-3 mb-2 -ml-9">
                        <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center z-10">
                            <Icon className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                        </div>
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                            {date}
                        </span>
                    </div>

                    <div className="relative p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:border-royal/20 dark:hover:border-neon/20 transition-colors duration-300">
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-royal dark:group-hover:text-neon transition-colors">
                            {title}
                        </h4>
                        <div className="text-sm font-semibold text-royal dark:text-neon mb-3 flex items-center gap-2">
                            <Briefcase className="w-4 h-4" />
                            {role}
                        </div>

                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                            {description}
                        </p>

                        {subDescription && (
                            <ul className="space-y-2">
                                {subDescription.map((line, idx) => (
                                    <li key={idx} className="text-sm text-slate-500 dark:text-slate-400 flex items-start">
                                        <span className="mr-2 mt-1.5 w-1.5 h-1.5 rounded-full bg-royal/60 dark:bg-neon/60 flex-shrink-0" />
                                        {line}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Experience = () => {
    return (
        <section className="w-full max-w-5xl mx-auto px-6 md:px-12 py-20">
            <div className="text-center mb-16 space-y-4">
                <h2 className="text-sm font-bold text-royal dark:text-neon uppercase tracking-wider">
                    Experience & Education
                </h2>
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                    My Journey
                </h3>
            </div>

            <div className="space-y-0 relative">
                {/* Career */}
                <TimelineItem
                    index={0}
                    date="2023.08 - Present"
                    title="CHA University Medical Center"
                    role="Researcher / Data Scientist"
                    description="Leading the development of disease network analysis systems and large-scale cohort pipelines."
                    subDescription={[
                        "Developed 'CoTDeX', a dynamic disease network analysis platform.",
                        "Built automated ETL pipelines for 1M+ patient records.",
                        "Conducted multi-center research projects and published SCI papers."
                    ]}
                    icon={Briefcase}
                />

                {/* Education Master */}
                <TimelineItem
                    index={1}
                    date="2021.03 - 2023.08"
                    title="CHA University"
                    role="M.S. in Biomedical Informatics"
                    description="Specialized in Medical Data Analysis and AI Modeling."
                    subDescription={[
                        "Thesis: Dynamic Disease Network Analysis using National Health Insurance Data.",
                        "GPA: 4.5 / 4.5"
                    ]}
                    icon={GraduationCap}
                />

                {/* Education Bachelor */}
                <TimelineItem
                    index={2}
                    date="2016.03 - 2021.02"
                    title="CHA University"
                    role="B.S. in Biotechnology"
                    description="Foundation in Life Sciences and Data Analysis."
                    icon={GraduationCap}
                    isLast
                />
            </div>
        </section>
    );
};

export default Experience;
