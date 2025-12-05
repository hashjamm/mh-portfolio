'use client';

import { ReactLenis } from '@studio-freight/react-lenis';

interface SmoothScrollProps {
    children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
    return (
        <ReactLenis root options={{ duration: 0.4, wheelMultiplier: 1.8, smoothWheel: true }}>
            {children}
        </ReactLenis>
    );
}
