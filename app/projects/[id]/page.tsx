import React from 'react';
import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import { ArrowLeft, Calendar, Tag, CheckCircle2, Terminal, Server, Database } from 'lucide-react';

export async function generateStaticParams() {
    return projects.map((project) => ({
        id: project.id,
    }));
}

export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const project = projects.find((p) => p.id === id);

    if (!project) {
        notFound();
    }

    const isCotdex = project.id === 'cotdex';

    return (
        <main className="min-h-screen pt-28 pb-20 px-6 md:px-12 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <div className="max-w-5xl mx-auto">
                <a
                    href="/"
                    className="inline-flex items-center text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors group font-medium"
                >
                    <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Projects
                </a>

                <header className="mb-12">
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border 
              ${project.category === 'Engineering' ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-800' :
                                project.category === 'Service' ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800' :
                                    'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800'}`}>
                            {project.category}
                        </span>
                        <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm font-medium">
                            <Calendar size={14} className="mr-2" />
                            {project.period}
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight">
                        {project.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                        {project.subtitle}
                    </p>
                </header>

                <div className="flex flex-wrap gap-2 mb-12">
                    {project.tags.map((tag) => (
                        <span key={tag} className="flex items-center px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300 font-medium shadow-sm">
                            <Tag size={12} className="mr-2 text-slate-400" />
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    <div className="lg:col-span-2 space-y-12">

                        <section className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Project Overview</h2>
                            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed whitespace-pre-wrap">
                                {project.description}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Key Achievements</h2>
                            <div className="grid gap-4">
                                {project.highlights.map((highlight, idx) => (
                                    <div key={idx} className="flex items-start p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm transition-shadow hover:shadow-md">
                                        <CheckCircle2 className="w-6 h-6 text-green-500 mr-4 flex-shrink-0 mt-0.5" />
                                        <span className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{highlight}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {isCotdex && (
                            <section className="mt-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center">
                                        <Terminal className="mr-3 text-slate-700 dark:text-slate-300" />
                                        Technical Deep Dive
                                    </h2>
                                    <span className="px-3 py-1 bg-slate-900 dark:bg-slate-800 text-white text-xs font-mono rounded-full">Core Logic</span>
                                </div>

                                {/* Code Viewer (Already Dark Mode Optimized) */}
                                <div className="bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl border border-slate-800">
                                    <div className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-slate-700">
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                                            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                                        </div>
                                        <div className="text-slate-400 text-xs font-mono flex items-center">
                                            <Database size={12} className="mr-2" />
                                            hr_calculator_engine_v3.R
                                        </div>
                                    </div>

                                    <div className="p-6 overflow-x-auto bg-[#1e1e1e]">
                                        <pre className="font-mono text-sm leading-relaxed">
                                            <code className="text-gray-300">
                                                <span className="text-green-400"># [Stability] Transaction Management Implementation</span>{'\n'}
                                                <span className="text-gray-500"># Prevents partial write issues during distributed processing</span>{'\n'}
                                                <span className="text-purple-400">tryCatch</span>({'{'}{'\n'}
                                                {'  '}<span className="text-blue-400">if</span> (!is.null(con_hr)) {'{'}{'\n'}
                                                {'    '}<span className="text-gray-500"># Start ACID Transaction</span>{'\n'}
                                                {'    '}dbExecute(con_hr, <span className="text-orange-300">"BEGIN TRANSACTION;"</span>){'\n'}
                                                {'    '}dbWriteTable(con_hr, <span className="text-orange-300">"hr_results"</span>, batch_hr_results){'\n'}
                                                {'    '}dbExecute(con_hr, <span className="text-orange-300">"COMMIT;"</span>){'\n'}
                                                {'  '}{'}'}{'\n'}
                                                {'},'} <span className="text-purple-400">error</span> = <span className="text-purple-400">function</span>(e) {'{'}{'\n'}
                                                {'  '}<span className="text-red-400"># Automatic Rollback Logic</span>{'\n'}
                                                {'  '}warning(<span className="text-orange-300">"Batch write failed, attempting rollback..."</span>){'\n'}
                                                {'  '}<span className="text-blue-400">if</span> (!is.null(con_hr)) {'{'}{'\n'}
                                                {'    '}dbExecute(con_hr, <span className="text-orange-300">"ROLLBACK;"</span>){'\n'}
                                                {'  '}{'}'}{'\n'}
                                                {'})'}
                                            </code>
                                        </pre>
                                    </div>

                                    <div className="px-6 py-4 bg-[#2d2d30] border-t border-slate-700">
                                        <p className="text-xs text-slate-400 leading-relaxed">
                                            <strong className="text-slate-200">💡 Insight:</strong> R 환경에서 <span className="text-blue-400">ACID 트랜잭션</span>을 직접 구현하여, 60개 코어가 동시에 쓰기를 수행하는 과정에서 발생할 수 있는 데이터 오염을 원천 차단했습니다.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8 p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
                                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full mb-4">
                                        <Server size={24} />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Distributed Architecture</h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                                        Master Node (Shell Manager) ↔ Worker Nodes (R Processes) ↔ DuckDB Chunks
                                    </p>
                                </div>
                            </section>
                        )}
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm sticky top-28">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-6">Tech Stack</h3>

                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag) => (
                                    <span key={tag} className="px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-md border border-slate-100 dark:border-slate-700">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Role</h3>
                                <p className="text-slate-600 dark:text-slate-300 text-sm mb-6">
                                    End-to-End Development<br />
                                    System Architecture Design<br />
                                    Data Analysis & Modeling
                                </p>

                                {isCotdex && (
                                    <>
                                        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Performance</h3>
                                        <div className="space-y-3">
                                            <div>
                                                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                                                    <span>Data Volume</span>
                                                    <span className="font-bold text-slate-900 dark:text-white">1M+ Patients</span>
                                                </div>
                                                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5">
                                                    <div className="bg-blue-600 h-1.5 rounded-full w-full"></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                                                    <span>Process Cores</span>
                                                    <span className="font-bold text-slate-900 dark:text-white">60 Cores</span>
                                                </div>
                                                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5">
                                                    <div className="bg-purple-600 h-1.5 rounded-full w-[80%]"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}