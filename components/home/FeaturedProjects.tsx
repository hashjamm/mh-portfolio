'use client';

import React, { useRef } from 'react';
import { useScroll } from 'framer-motion';
import { projects } from '@/data/projects';
import { Card } from './Card';

const FeaturedProjects = () => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    // Only show highlighted projects
    const featured = projects.filter((p) => p.highlight);

    return (
        <div ref={container} className="relative mt-[10vh]">
            <div className="sticky top-0 h-[20vh] flex flex-col items-center justify-center mb-10 text-center z-0">
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
                    Featured Projects
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
                    Selected works showcasing data engineering, automation, and AI solutions.
                </p>
            </div>

            {featured.map((project, i) => {
                const targetScale = 1 - ((featured.length - i) * 0.12);
                return (
                    <Card
                        key={project.id}
                        i={i}
                        project={project}
                        progress={scrollYProgress}
                        range={[i * 0.25, 1]}
                        targetScale={targetScale}
                    />
                );
            })}
        </div>
    );
};

export default FeaturedProjects;
