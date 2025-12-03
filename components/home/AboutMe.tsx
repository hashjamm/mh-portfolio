'use client';

import React from 'react';
import { motion } from 'framer-motion';

const TimelineItem = ({
    title,
    period,
    description,
    subDescription,
    isLast = false
}: {
    title: string;
    period: string;
    description: string;
    subDescription?: string | string[];
    isLast?: boolean;
}) => {
    return (
        <div className="relative pl-8 md:pl-10 py-2">
            {/* Vertical Line */}
            {!isLast && (
                <div className="absolute left-[11px] md:left-[13px] top-3 bottom-0 w-[2px] bg-slate-200 dark:bg-slate-800" />
            )}

            {/* Circle Indicator */}
            <div className="absolute left-0 top-2.5 w-6 h-6 md:w-7 md:h-7 rounded-full border-2 border-blue-500 bg-white dark:bg-slate-900 z-10" />

            {/* Content */}
            <div className="mb-8">
                <h4 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                    {title}
                </h4>
                <span className="text-sm text-slate-500 dark:text-slate-400 font-medium block mb-2">
                    {period}
                </span>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {description}
                </p>
                {subDescription && (
                    <div className="text-slate-600 dark:text-slate-300 leading-relaxed mt-1">
                        {Array.isArray(subDescription) ? (
                            subDescription.map((line, index) => (
                                <p key={index}>{line}</p>
                            ))
                        ) : (
                            <p>{subDescription}</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

const AboutMe = () => {
    return (
        <section className="w-full max-w-7xl mx-auto px-6 md:px-12 py-20">
            <div className="space-y-4 mb-12">
                <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    RESUME
                </h2>
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                    About Me
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
                {/* Education Column */}
                <div>
                    <div className="flex items-center gap-3 mb-8">
                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Education
                        </h3>
                    </div>

                    <div className="space-y-2">
                        <TimelineItem
                            title="차의과학대학교 생명과학 의료정보학 (석사)"
                            period="2021.03 ~ 2023.08 (졸업)"
                            description="전공 및 주요 활동"
                            subDescription={[
                                "- 의료 데이터 분석 및 인공지능 모델링 전공",
                                "- 다수의 국책 과제 및 SCI 논문 수행"
                            ]}
                        />
                        <TimelineItem
                            title="차의과학대학교 바이오공학과 (학사)"
                            period="2016.03 ~ 2021.02 (졸업)"
                            description="생명과학 기초 및 데이터 분석 입문."
                            isLast
                        />
                    </div>
                </div>

                {/* Career Column */}
                <div>
                    <div className="flex items-center gap-3 mb-8">
                        <span className="w-2 h-2 rounded-full bg-purple-500" />
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Career
                        </h3>
                    </div>

                    <div className="space-y-2">
                        <TimelineItem
                            title="차의과학대학교 정보의학연구소"
                            period="2023.08 ~ 현재 (재직 중)"
                            description="연구원 / 데이터 사이언티스트"
                            subDescription={[
                                "- 대규모 의료 코호트 분석 및 파이프라인 구축",
                                "- 질병 네트워크 분석 시스템(CoTDeX) 개발 리딩"
                            ]}
                            isLast
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
