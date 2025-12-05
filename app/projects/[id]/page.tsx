'use client';

import React from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Layers, CheckCircle2, AlertTriangle, ArrowRight, Github, ExternalLink } from 'lucide-react';
import { projects } from '@/data/projects';
import MermaidDiagram from '@/components/ui/MermaidDiagram';
import Footer from '@/components/layout/Footer';

export default function ProjectDetail() {
    const params = useParams();
    const id = params?.id as string;
    const project = projects.find((p) => p.id === id);

    if (!project) {
        return notFound();
    }

    // Find next project for navigation
    const currentIndex = projects.findIndex((p) => p.id === id);
    const nextProject = projects[(currentIndex + 1) % projects.length];

    const isResearch = project.type === 'research';
    const solutionTitle = isResearch ? "Hypothesis & Approach" : "The Solution";
    const architectureTitle = isResearch ? "Methodology & Analysis" : "System Architecture";
    const architectureDesc = isResearch ? "A detailed breakdown of the research design and statistical models." : "A high-level overview of the data flow and system components.";
    const logicTitle = isResearch ? "Analysis Logic" : "Architecture Logic";
    const featuresTitle = isResearch ? "Key Findings" : "Key Features";
    const challengesTitle = isResearch ? "Research Challenges" : "Technical Challenges";

    return (
        <main className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-200 selection:bg-royal/30 dark:selection:bg-neon/30">
            {/* 1. Hero Section */}
            <section className="relative pt-32 pb-20 px-6 md:px-12 overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10">
                    <Link href="/" className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-royal dark:hover:text-neon mb-8 transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Projects
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex flex-wrap gap-4 mb-6">
                            <span className="px-3 py-1 rounded-full text-sm font-bold tracking-wider uppercase bg-royal/10 text-royal dark:bg-neon/10 dark:text-neon border border-royal/20 dark:border-neon/20">
                                {project.category}
                            </span>
                            {project.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 rounded-full text-sm bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                            {project.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                            {project.oneLiner}
                        </p>
                    </motion.div>

                    {/* Meta Info Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 pt-12 border-t border-slate-200 dark:border-slate-800"
                    >
                        <div>
                            <div className="flex items-center gap-2 text-slate-400 mb-2 text-sm font-medium uppercase tracking-wider">
                                <Calendar className="w-4 h-4" /> Period
                            </div>
                            <div className="font-semibold text-lg">{project.period || 'N/A'}</div>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 text-slate-400 mb-2 text-sm font-medium uppercase tracking-wider">
                                <User className="w-4 h-4" /> Role
                            </div>
                            <div className="font-semibold text-lg">{project.role || 'Contributor'}</div>
                        </div>
                        {project.stats?.slice(0, 2).map((stat, idx) => (
                            <div key={idx}>
                                <div className="text-slate-400 mb-2 text-sm font-medium uppercase tracking-wider">
                                    {stat.label}
                                </div>
                                <div className="font-semibold text-lg text-royal dark:text-neon">{stat.value}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-slate-50 to-transparent dark:from-slate-900/50 dark:to-transparent -z-10 pointer-events-none" />
            </section>

            {/* 2. Overview Section (Problem, Solution, Impact) */}
            <section className="py-20 px-6 md:px-12 bg-slate-50 dark:bg-slate-900/50">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="space-y-4"
                    >
                        <h3 className="text-xl font-bold flex items-center gap-2 text-red-500 dark:text-red-400">
                            <AlertTriangle className="w-5 h-5" /> The Problem
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                            {project.detail.problem}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="space-y-4"
                    >
                        <h3 className="text-xl font-bold flex items-center gap-2 text-blue-500 dark:text-blue-400">
                            <Layers className="w-5 h-5" /> {solutionTitle}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                            {project.detail.solution}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-4"
                    >
                        <h3 className="text-xl font-bold flex items-center gap-2 text-green-500 dark:text-green-400">
                            <CheckCircle2 className="w-5 h-5" /> The Impact
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                            {project.detail.impact}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 3. Architecture Deep Dive */}
            <section className="py-24 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">{architectureTitle}</h2>
                        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                            {architectureDesc}
                        </p>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 md:p-12 shadow-2xl overflow-hidden">
                        {project.detail.architecture.diagram ? (
                            <div className="mb-12 overflow-x-auto">
                                <MermaidDiagram chart={project.detail.architecture.diagram} />
                            </div>
                        ) : (
                            <div className="h-64 flex items-center justify-center text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-xl mb-8">
                                No Diagram Available
                            </div>
                        )}

                        <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                            <h4 className="font-bold mb-2 flex items-center gap-2">
                                <Layers className="w-4 h-4 text-royal dark:text-neon" />
                                {logicTitle}
                            </h4>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                {project.detail.architecture.description}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Tech Stack & Features */}
            <section className="py-20 px-6 md:px-12 bg-slate-50 dark:bg-slate-900/30">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
                    {/* Tech Stack */}
                    <div>
                        <h3 className="text-2xl font-bold mb-8">Tech Stack</h3>
                        <div className="space-y-6">
                            {project.techStack?.map((stack, idx) => (
                                <div key={idx}>
                                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
                                        {stack.category}
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {stack.skills.map((skill) => (
                                            <span key={skill} className="px-4 py-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-medium shadow-sm">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Key Features */}
                    <div>
                        <h3 className="text-2xl font-bold mb-8">{featuresTitle}</h3>
                        <ul className="space-y-4">
                            {project.detail.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-royal dark:bg-neon flex-shrink-0" />
                                    <span className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                        {feature}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        {project.detail.challenges && (
                            <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
                                <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-200">
                                    {challengesTitle}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed italic">
                                    "{project.detail.challenges}"
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* 5. Next Project Navigation */}
            <section className="py-20 px-6 md:px-12 border-t border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto">
                    <Link href={`/projects/${nextProject.id}`} className="group block">
                        <div className="text-sm text-slate-400 uppercase tracking-wider mb-2">Next Project</div>
                        <div className="flex items-center justify-between">
                            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white group-hover:text-royal dark:group-hover:text-neon transition-colors">
                                {nextProject.title}
                            </h2>
                            <ArrowRight className="w-8 h-8 md:w-12 md:h-12 text-slate-300 dark:text-slate-700 group-hover:text-royal dark:group-hover:text-neon group-hover:translate-x-4 transition-all" />
                        </div>
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}