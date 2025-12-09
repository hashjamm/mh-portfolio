'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Layers, Grid } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/data/projects';

interface ProjectListModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentProjectId?: string;
}

export default function ProjectListModal({ isOpen, onClose, currentProjectId }: ProjectListModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl p-6"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-8 right-8 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors z-10"
                    >
                        <X className="w-8 h-8 text-slate-500 dark:text-slate-400" />
                    </button>

                    <div className="w-full max-w-4xl max-h-[80vh] overflow-y-auto no-scrollbar">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center justify-center p-3 bg-slate-100 dark:bg-slate-900 rounded-full mb-4">
                                <Grid className="w-6 h-6 text-slate-400" />
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">All Projects</h2>
                            <p className="text-slate-500 dark:text-slate-400">Explore the complete research & engineering archive</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pb-20">
                            {projects.map((p) => (
                                <Link
                                    key={p.id}
                                    href={`/projects/${p.id}`}
                                    onClick={onClose}
                                    className={`
                                        group flex items-start gap-4 p-4 rounded-2xl border transition-all duration-300
                                        ${p.id === currentProjectId
                                            ? 'border-royal/50 dark:border-neon/50 bg-royal/5 dark:bg-neon/5 ring-1 ring-royal dark:ring-neon'
                                            : 'border-slate-200 dark:border-slate-800 hover:border-royal/30 dark:hover:border-neon/30 hover:bg-white dark:hover:bg-slate-900 shadow-sm hover:shadow-md'
                                        }
                                    `}
                                >
                                    <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-slate-200 dark:bg-slate-800 relative">
                                        {p.image ? (
                                            <Image
                                                src={p.image}
                                                alt={p.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Layers className="w-6 h-6 text-slate-400" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0 py-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                                                {p.category}
                                            </span>
                                        </div>
                                        <h3 className={`font-bold text-lg mb-1 truncate ${p.id === currentProjectId ? 'text-royal dark:text-neon' : 'text-slate-900 dark:text-white group-hover:text-royal dark:group-hover:text-neon transition-colors'}`}>
                                            {p.title}
                                        </h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                                            {p.oneLiner}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
