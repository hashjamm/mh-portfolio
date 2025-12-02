'use client';

import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import AboutMe from '@/components/home/AboutMe';
import TechSkills from '@/components/home/TechSkills';
import ProjectBento from '@/components/home/ProjectBento';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-slate-50 dark:bg-slate-950">

      {/* 1. Hero Section (Intro) */}
      <HeroSection />

      {/* 2. About Me (Education & Career) */}
      <AboutMe />

      {/* 3. Technical Skills */}
      <TechSkills />

      {/* 4. Projects Section (Bento Grid) */}
      <section id="projects" className="w-full max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
            데이터 사이언스와 엔지니어링 역량을 결합하여 해결한 문제들입니다.
          </p>
        </div>

        <ProjectBento />
      </section>

      {/* 5. Footer (CTA included) */}
      <Footer />

    </main>
  );
}