'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Database } from 'lucide-react';
import { projects } from '@/data/projects';

const FeaturedProjects = () => {
    const featured = projects.filter((p) => p.highlight);

    return (
        <div className="flex flex-col gap-20 md:gap-32">
            {featured.map((project, index) => {
                // User Request:
                // 홀수(0, 2): flex-row (텍스트 - 이미지) -> DOM is [Image, Text], so we need reverse to get [Text, Image]
                // 짝수(1, 3): flex-row-reverse (이미지 - 텍스트) -> DOM is [Image, Text], so we need normal row to get [Image, Text]
                // Wait, "flex-row" usually means Left-to-Right.
                // If DOM is <Image> <Text>:
                // flex-row: Image Left, Text Right.
                // flex-row-reverse: Text Left, Image Right.
                // User wants:
                // Index 0 (Odd pos): Text - Image -> flex-row-reverse
                // Index 1 (Even pos): Image - Text -> flex-row

                const isOddPosition = index % 2 === 0; // 0, 2, 4... (1st, 3rd...)

                return (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${isOddPosition ? 'md:flex-row-reverse' : ''}`}
                    >
                        {/* Image / Visual Section (50%) */}
                        <div className="w-full md:w-1/2">
                            <Link href={`/projects/${project.id}`} className="block group">
                                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 shadow-md dark:shadow-neon/20 hover:shadow-xl hover:scale-[1.02] transition-all duration-500">
                                    {/* Abstract Visual or Thumbnail */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-900 dark:to-slate-950 flex items-center justify-center">
                                        {/* Placeholder Visual if no image, or overlay */}
                                        <div className="text-center opacity-30 group-hover:opacity-100 transition-opacity duration-500">
                                            <div className="w-20 h-20 mx-auto bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-lg mb-4">
                                                <Database className="w-10 h-10 text-royal dark:text-neon" />
                                            </div>
                                            <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                                                {project.detail.architecture.slice(0, 30)}...
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actual Image Overlay if available */}
                                    {project.image && (
                                        <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" />
                                    )}

                                    {/* Badge */}
                                    <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 dark:bg-slate-950/80 backdrop-blur-md rounded-full text-xs font-bold text-slate-800 dark:text-white border border-slate-200 dark:border-slate-800 shadow-sm">
                                        {project.category}
                                    </div>
                                </div>
                            </Link>
                        </div>

                        {/* Text Content Section (50%) */}
                        <div className="w-full md:w-1/2 space-y-6">
                            <div className="space-y-2">
                                <h3 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
                                    {project.title}
                                </h3>
                                <div className="h-1 w-20 bg-royal dark:bg-neon rounded-full" />
                            </div>

                            <p className="text-lg text-slate-600 dark:text-gray-400 leading-relaxed">
                                {project.oneLiner}
                            </p>

                            {/* Tech Stack Tags */}
                            <div className="flex flex-wrap gap-3">
                                {project.tags.slice(0, 4).map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 text-sm font-medium rounded-md border border-slate-200 dark:border-slate-700"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="pt-4">
                                <Link
                                    href={`/projects/${project.id}`}
                                    className="inline-flex items-center gap-2 text-royal dark:text-neon font-bold text-lg group"
                                >
                                    View Case Study
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default FeaturedProjects;
