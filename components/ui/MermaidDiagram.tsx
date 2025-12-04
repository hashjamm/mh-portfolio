'use client';

import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { useTheme } from 'next-themes';

interface MermaidDiagramProps {
    chart: string;
}

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(false);
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted && ref.current) {
            // Re-initialize or just render with theme config if possible. 
            // Mermaid initialize is usually global. 
            // We can try to re-initialize but it might warn.
            // Better to just render.
            mermaid.initialize({
                startOnLoad: true,
                theme: resolvedTheme === 'dark' ? 'dark' : 'default',
                securityLevel: 'loose',
                fontFamily: 'JetBrains Mono',
            });

            const renderChart = async () => {
                try {
                    const { svg } = await mermaid.render(`mermaid-${Date.now()}`, chart);
                    if (ref.current) {
                        ref.current.innerHTML = svg;
                    }
                } catch (error) {
                    console.error("Mermaid rendering failed:", error);
                    if (ref.current) {
                        ref.current.innerHTML = "<p class='text-red-500'>Failed to render diagram</p>";
                    }
                }
            };
            renderChart();
        }
    }, [chart, isMounted, resolvedTheme]);

    return <div ref={ref} className="mermaid w-full flex justify-center" />;
};

export default MermaidDiagram;
