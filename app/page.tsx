'use client';

import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import Experience from '@/components/home/Experience';
import TechSkills from '@/components/home/TechSkills';
import ProjectBento from '@/components/home/ProjectBento';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import Footer from '@/components/layout/Footer';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-x-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-200 transition-colors duration-300">

      {/* 1. Hero Section (Intro) */}
      <ScrollReveal width="100%" variant="fadeIn" duration={0.8}>
        <HeroSection />
      </ScrollReveal>

      {/* 2. Experience (Education & Career) */}
      <ScrollReveal width="100%" variant="fadeUp" delay={0.2}>
        <Experience />
      </ScrollReveal>

      {/* 3. Technical Skills */}
      <ScrollReveal width="100%" variant="fadeUp">
        <TechSkills />
      </ScrollReveal>

      {/* 4. Featured Projects (Section A) */}
      <section id="featured" className="w-full max-w-7xl mx-auto px-6 md:px-12 py-20">
        <FeaturedProjects />
      </section>

      {/* 5. Research Archive (Section B) */}
      {/* 5. Research Archive (Section B) */}
      <section id="archive" className="w-full py-20 border-t border-slate-200 dark:border-slate-900">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 mb-12">
          <ScrollReveal variant="fadeUp">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-200 mb-4">
                Research Archive
              </h2>
              <p className="text-slate-600 dark:text-slate-500 max-w-2xl">
                A collection of data analysis, research, and prototype projects.
              </p>
            </div>
          </ScrollReveal>
        </div>

        <ProjectBento />
      </section>

      {/* 6. Footer (CTA included) */}
      <ScrollReveal width="100%" variant="fadeIn">
        <Footer />
      </ScrollReveal>

    </main>
  );
}