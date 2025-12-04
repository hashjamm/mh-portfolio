'use client';

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import MermaidDiagram from '@/components/ui/MermaidDiagram';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Calendar, Tag } from 'lucide-react';
import Link from 'next/link';

export default function ProjectDetail() {
    const params = useParams();
    const id = params?.id as string;
    const project = projects.find((p) => p.id === id);

    if (!project) {
        return notFound();
    }

    return (
        <main className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-royal/30 dark:selection:bg-cyan-500/30 transition-colors duration-300">
            {/* Hero Section */}
            <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
                {/* Blurred Background */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-30 blur-xl scale-110"
                    style={{ backgroundImage: `url(${project.image})` }}
                />
                {/* Gradient Overlay: Light (White) / Dark (Slate-950) */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/80 to-white dark:from-slate-950/50 dark:via-slate-950/80 dark:to-slate-950" />

                <div className="relative z-10 max-w-5xl w-full px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link
                            href="/"
                            className="inline-flex items-center text-sm font-medium text-royal hover:text-blue-700 dark:text-cyan-400 dark:hover:text-cyan-300 mb-6 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Projects
                        </Link>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight text-slate-900 dark:text-white">
                            {project.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-light mb-8 max-w-3xl mx-auto">
                            {project.oneLiner}
                        </p>

                        {/* Stats */}
                        {project.stats && (
                            <div className="flex flex-wrap justify-center gap-8 mt-8">
                                {project.stats.map((stat, idx) => (
                                    <div key={idx} className="text-center">
                                        <div className="text-3xl font-bold text-royal dark:text-cyan-400">{stat.value}</div>
                                        <div className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Content Grid */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Left Column: Main Content */}
                    <div className="lg:col-span-2 space-y-16">

                        {/* Architecture Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm"
                        >
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                                <span className="w-2 h-8 bg-royal dark:bg-cyan-500 mr-4 rounded-full" />
                                System Architecture
                            </h2>
                            <div className="bg-white dark:bg-slate-950 rounded-xl p-4 overflow-x-auto border border-slate-200 dark:border-slate-800/50 shadow-inner">
                                {project.detail.architecture.includes('->') || project.detail.architecture.includes('graph') ? (
                                    <MermaidDiagram chart={
                                        project.detail.architecture.startsWith('graph') || project.detail.architecture.startsWith('sequenceDiagram')
                                            ? project.detail.architecture
                                            : `graph LR\n${project.detail.architecture.split('->').map((s, i, arr) => i < arr.length - 1 ? `${s.trim().replace(/ /g, '_')} --> ${arr[i + 1].trim().replace(/ /g, '_')}` : '').join('\n')}`
                                    } />
                                ) : (
                                    <div className="font-mono text-royal dark:text-cyan-300">
                                        {project.detail.architecture}
                                    </div>
                                )}
                                {/* Fallback for simple arrow notation to Mermaid */}
                                <MermaidDiagram chart={`graph LR\n    ${project.detail.architecture.split('->').map((node, i) => {
                                    const cleanNode = node.trim();
                                    const id = `node${i}`;
                                    const label = `"${cleanNode}"`;
                                    return `${id}[${label}]`;
                                }).join(' --> ')}`} />
                            </div>
                        </motion.div>

                        {/* Problem & Solution */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="space-y-4"
                            >
                                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-200">The Problem</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {project.detail.problem}
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="space-y-4"
                            >
                                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-200">The Solution</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {project.detail.solution}
                                </p>
                            </motion.div>
                        </div>

                        {/* Key Results */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-slate-50 dark:bg-slate-900/30 border-l-4 border-royal dark:border-cyan-500 p-6 rounded-r-xl"
                        >
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Key Results</h3>
                            <p className="text-slate-600 dark:text-slate-300">{project.detail.result}</p>
                        </motion.div>

                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-8">

                            {/* Tech Stack */}
                            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
                                <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
                                    Tech Stack
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 bg-blue-50 dark:bg-cyan-950/30 text-royal dark:text-cyan-400 border border-blue-100 dark:border-cyan-900/50 rounded-full text-sm font-medium"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Links & Info */}
                            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-4 shadow-sm">
                                <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                    Project Info
                                </h3>
                                <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                                    <span className="flex items-center gap-2"><Tag size={16} /> Category</span>
                                    <span className="font-medium">{project.category}</span>
                                </div>

                                <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                                    <button className="w-full py-3 bg-royal hover:bg-blue-700 dark:bg-cyan-600 dark:hover:bg-cyan-500 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
                                        <Github size={18} />
                                        View Source
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </section>
        </main>
    );
}