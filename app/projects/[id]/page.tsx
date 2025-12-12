'use client';

import React, { useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Calendar, User, ExternalLink, Github, Layers, Code, Globe, AlertTriangle, CheckCircle2, BookOpen, Wrench, Link as LinkIcon, X, Grid } from 'lucide-react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Footer from '@/components/layout/Footer';
import { projects } from '@/data/projects';
import ProjectGallery from '@/components/project/ProjectGallery';


const MermaidDiagram = dynamic(() => import('@/components/ui/MermaidDiagram'), {
    ssr: false,
    loading: () => <div className="h-64 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-xl" />
});

export default function ProjectDetail() {
    const params = useParams();

    // Find current project
    const project = projects.find(p => p.id === params.id);

    if (!project) {
        notFound();
    }

    const currentIndex = projects.findIndex(p => p.id === project.id);
    const nextProject = projects[(currentIndex + 1) % projects.length];
    const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];

    return (
        <main className="min-h-screen bg-white dark:bg-slate-950 selection:bg-royal/20 dark:selection:bg-neon/20">
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
                        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed break-keep">
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
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-slate-50 to-transparent dark:from-slate-900/50 dark:to-transparent -z-10 pointer-events-none" />
            </section>

            <div className="max-w-4xl mx-auto px-6 md:px-12 space-y-24 pb-24">

                {/* 2. Project Background */}
                {project.detail.background && (
                    <section>
                        <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3 text-slate-900 dark:text-white">
                            <BookOpen className="w-6 h-6 text-royal dark:text-neon" />
                            Project Background
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                            {project.detail.background}
                        </p>
                    </section>
                )}

                {/* 3. Problem Definition */}
                <section>
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3 text-slate-900 dark:text-white">
                        <AlertTriangle className="w-6 h-6 text-red-500" />
                        Problem Definition
                    </h2>
                    <div className="bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500 p-6 rounded-r-xl">
                        <p className="text-lg text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                            {project.detail.problem}
                        </p>
                    </div>
                </section>

                {/* 4. Solution Approach */}
                <section>
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3 text-slate-900 dark:text-white">
                        <Layers className="w-6 h-6 text-blue-500" />
                        Solution Approach
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-12">
                        {project.detail.solution}
                    </p>

                    {/* Architecture Diagram */}
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-4 md:p-8 shadow-lg overflow-hidden mb-12">
                        <h3 className="text-xl font-bold mb-6 text-center">System Architecture</h3>
                        {project.detail.architecture.diagram ? (
                            <div className="mb-8 overflow-x-auto">
                                <MermaidDiagram chart={project.detail.architecture.diagram} />
                            </div>
                        ) : (
                            <div className="h-48 flex items-center justify-center text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-xl mb-8">
                                No Diagram Available
                            </div>
                        )}
                        <p className="text-slate-500 dark:text-slate-400 text-center text-sm max-w-2xl mx-auto">
                            {project.detail.architecture.description}
                        </p>
                    </div>

                    {/* Engineering Deep Dives */}
                    {project.detail.deepDives && project.detail.deepDives.length > 0 && (
                        <div className="space-y-8">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <Code className="w-5 h-5 text-purple-500" />
                                Engineering Deep Dives
                            </h3>
                            {project.detail.deepDives.map((dive, idx) => (
                                <div key={idx} className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800">
                                    <h4 className="text-lg font-bold mb-4 text-slate-800 dark:text-slate-200">
                                        {dive.title}
                                    </h4>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                                        {dive.content}
                                    </p>
                                    {dive.codeSnippet && (
                                        <div className="bg-slate-950 rounded-xl p-6 overflow-x-auto border border-slate-800">
                                            <pre className="text-sm font-mono text-slate-300 whitespace-pre-wrap break-words">
                                                <code>{dive.codeSnippet}</code>
                                            </pre>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Gallery Section */}
                {project.gallery && project.gallery.length > 0 && (
                    <ProjectGallery images={project.gallery} title={project.title} />
                )}

                {/* 5. Results */}
                <section>
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3 text-slate-900 dark:text-white">
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                        Results & Impact
                    </h2>
                    <div className="bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20 p-8 rounded-2xl">
                        <p className="text-lg text-slate-700 dark:text-slate-200 leading-relaxed font-medium mb-6">
                            {project.detail.impact}
                        </p>
                        {project.detail.features && (
                            <div className="grid md:grid-cols-2 gap-4">
                                {project.detail.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-3 bg-white dark:bg-slate-950 p-4 rounded-lg shadow-sm">
                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                                        <span className="text-sm text-slate-600 dark:text-slate-300">
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* 6. Applied Skills & Tools */}
                <section>
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3 text-slate-900 dark:text-white">
                        <Wrench className="w-6 h-6 text-orange-500" />
                        Applied Skills & Tools
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {project.techStack?.map((stack, idx) => (
                            <div key={idx} className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
                                    {stack.category}
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {stack.skills.map((skill) => (
                                        <span key={skill} className="px-3 py-1.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-medium shadow-sm text-slate-700 dark:text-slate-300">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 7. Review & Learnings */}
                {(project.detail.review || project.detail.challenges) && (
                    <section>
                        <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3 text-slate-900 dark:text-white">
                            <Globe className="w-6 h-6 text-indigo-500" />
                            Review & Learnings
                        </h2>
                        <div className="space-y-6">
                            {project.detail.review && (
                                <div className="bg-indigo-50 dark:bg-indigo-900/10 p-8 rounded-2xl border border-indigo-100 dark:border-indigo-900/20">
                                    <h3 className="font-bold text-indigo-900 dark:text-indigo-300 mb-3">Retrospective</h3>
                                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                                        {project.detail.review}
                                    </p>
                                </div>
                            )}
                            {project.detail.challenges && (
                                <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
                                    <h3 className="font-bold text-slate-900 dark:text-white mb-3">Technical Challenges</h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed italic">
                                        &quot;{project.detail.challenges}&quot;
                                    </p>
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {/* 8. Related Links */}
                {project.links && (
                    <section>
                        <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3 text-slate-900 dark:text-white">
                            <LinkIcon className="w-6 h-6 text-slate-500" />
                            Related Links
                        </h2>
                        <div className="flex flex-col md:flex-row flex-wrap gap-4">
                            {project.links.github && (
                                <a
                                    href={project.links.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold hover:opacity-90 transition-opacity w-full md:w-auto"
                                >
                                    <Github className="w-5 h-5" />
                                    GitHub Repository
                                </a>
                            )}
                            {project.links.demo && (
                                <a
                                    href={project.links.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 px-6 py-3 bg-royal dark:bg-neon text-white dark:text-slate-900 rounded-xl font-bold hover:opacity-90 transition-opacity w-full md:w-auto"
                                >
                                    <ExternalLink className="w-5 h-5" />
                                    Live Demo
                                </a>
                            )}
                            {project.links.paper && (
                                <a
                                    href={project.links.paper}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors w-full md:w-auto"
                                >
                                    <BookOpen className="w-5 h-5" />
                                    Read Paper
                                </a>
                            )}
                        </div>
                    </section>
                )}

            </div>

            {/* Enhanced Footer Navigation */}
            <section className="py-20 px-6 md:px-12 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

                        {/* Previous Project */}
                        <Link href={`/projects/${prevProject.id}`} className="group flex flex-col items-start text-left order-2 md:order-1 p-4 md:p-0 rounded-2xl hover:bg-white dark:hover:bg-slate-800 md:hover:bg-transparent md:dark:hover:bg-transparent transition-colors">
                            <div className="flex items-center gap-2 text-sm text-slate-400 uppercase tracking-wider mb-2 group-hover:text-royal dark:group-hover:text-neon transition-colors">
                                <ArrowLeft className="w-4 h-4" /> Previous
                            </div>
                            <div className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-royal dark:group-hover:text-neon transition-colors line-clamp-2">
                                {prevProject.title}
                            </div>
                        </Link>

                        {/* View All (Bottom on Mobile? Hidden? Let's hide on very small screens or make it an icon) */}
                        <div className="flex justify-center order-1 md:order-2">
                            <Link
                                href="/?archive=true"
                                className="flex md:flex-col items-center justify-center p-4 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors group gap-2 md:gap-0 w-full md:w-auto bg-white md:bg-transparent dark:bg-slate-800 md:dark:bg-transparent shadow-sm md:shadow-none border md:border-none border-slate-200 dark:border-slate-700"
                            >
                                <Grid className="w-5 h-5 md:w-6 md:h-6 text-slate-400 group-hover:text-royal dark:group-hover:text-neon transition-colors mb-0 md:mb-1" />
                                <span className="text-sm md:text-xs font-semibold text-slate-500 dark:text-slate-400">View All Projects</span>
                            </Link>
                        </div>

                        {/* Next Project */}
                        <Link href={`/projects/${nextProject.id}`} className="group flex flex-col items-end text-right order-3 p-4 md:p-0 rounded-2xl hover:bg-white dark:hover:bg-slate-800 md:hover:bg-transparent md:dark:hover:bg-transparent transition-colors">
                            <div className="flex items-center gap-2 text-sm text-slate-400 uppercase tracking-wider mb-2 group-hover:text-royal dark:group-hover:text-neon transition-colors">
                                Next <ArrowRight className="w-4 h-4" />
                            </div>
                            <div className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-royal dark:group-hover:text-neon transition-colors line-clamp-2">
                                {nextProject.title}
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}


            <Footer />
        </main>
    );
}