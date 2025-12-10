'use client';

import React from 'react';

const SkillCategory = ({ title, skills }: { title: string; skills: string[] }) => {
    return (
        <div className="mb-8">
            <h4 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-4">
                {title}
            </h4>
            <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                    <span
                        key={skill}
                        className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 font-medium text-sm hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-default"
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );
};

const TechSkills = () => {
    return (
        <section className="w-full max-w-7xl mx-auto px-6 md:px-12 py-10">
            <div className="mb-12">
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                    Technical Skills
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <SkillCategory
                    title="Languages"
                    skills={['Python', 'R', 'SAS', 'SQL', 'Kotlin', 'TypeScript']}
                />

                <SkillCategory
                    title="Data Engineering & Backend"
                    skills={['Django', 'Docker', 'AWS', 'DuckDB', 'Dask', 'Linux']}
                />

                <SkillCategory
                    title="Data Science & AI"
                    skills={['Scikit-learn', 'XGBoost', 'NetworkX', 'Regex', 'LLM Integration']}
                />
            </div>
        </section>
    );
};

export default TechSkills;
