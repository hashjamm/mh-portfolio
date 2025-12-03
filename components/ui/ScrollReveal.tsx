'use client';

import React, { useRef } from 'react';
import { motion, useInView, Variant } from 'framer-motion';

interface ScrollRevealProps {
    children: React.ReactNode;
    width?: 'fit-content' | '100%';
    variant?: 'fadeUp' | 'fadeIn' | 'scaleUp' | 'slideLeft' | 'slideRight';
    delay?: number;
    duration?: number;
    className?: string;
    once?: boolean; // 애니메이션을 한 번만 실행할지 여부
}

const variants: Record<string, { hidden: Variant; visible: Variant }> = {
    fadeUp: {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    },
    fadeIn: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    },
    scaleUp: {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
    },
    slideLeft: {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 },
    },
    slideRight: {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
    },
};

const ScrollReveal = ({
    children,
    width = '100%',
    variant = 'fadeUp',
    delay = 0,
    duration = 0.6,
    className = '',
    once = true,
}: ScrollRevealProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: '-10% 0px -10% 0px' }); // 화면의 10% 안쪽으로 들어오면 트리거

    return (
        <div ref={ref} style={{ width }} className={className}>
            <motion.div
                variants={variants[variant]}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }} // Apple-like ease curve
            >
                {children}
            </motion.div>
        </div>
    );
};

export default ScrollReveal;
