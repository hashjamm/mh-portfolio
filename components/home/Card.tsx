'use client';

import { useTransform, motion, MotionValue } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Github, Layers } from 'lucide-react';
import { Project } from '@/data/projects';

interface CardProps {
    i: number;
    project: Project;
    progress: MotionValue<number>;
    range: [number, number];
    targetScale: number;
}

export const Card = ({ i, project, progress, range, targetScale }: CardProps) => {
    const container = useRef(null);
    const { title, category, oneLiner, tags, image, id, links } = project;

    // Scale down as the user scrolls past this card
    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
            <motion.div
                style={{ scale, top: `calc(-5vh + ${i * 10}px)` }}
                className="relative flex flex-col w-[1000px] h-[500px] rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden origin-top"
            >
                <div className={`flex h-full ${i % 2 === 1 ? 'flex-row-reverse' : 'flex-row'}`}>
                    {/* Content Section (40%) */}
                    <div className="w-[40%] p-12 flex flex-col justify-between relative z-10">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-royal/10 text-royal dark:bg-neon/10 dark:text-neon border border-royal/20 dark:border-neon/20">
                                    {category}
                                </span>
                            </div>

                            <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white leading-tight">
                                {title}
                            </h2>

                            <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                                {oneLiner}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {tags.slice(0, 3).map((tag) => (
                                    <span key={tag} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs rounded-md font-medium">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <Link
                                href={`/projects/${id}`}
                                className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white hover:text-royal dark:hover:text-neon transition-colors group"
                            >
                                View Case Study
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            {links?.github && (
                                <a
                                    href={links.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                                >
                                    <Github className="w-4 h-4" />
                                    Code
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Image Section (60%) */}
                    <div className="relative w-[60%] h-full overflow-hidden bg-slate-100 dark:bg-slate-800 group">
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center z-0">
                            <Layers className="w-16 h-16 text-slate-400/50" />
                        </div>

                        {image && (
                            <motion.div
                                className="absolute inset-0 w-full h-full"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Image
                                    fill
                                    src={image}
                                    alt={title}
                                    className="object-cover"
                                />
                            </motion.div>
                        )}

                        {/* Overlay Gradient */}
                        <div className={`absolute inset-0 pointer-events-none bg-gradient-to-${i % 2 === 1 ? 'r' : 'l'} from-transparent to-black/5 dark:to-black/20`} />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
