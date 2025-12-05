'use client';

import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
    chart: string;
    className?: string;
}

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart, className }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [svg, setSvg] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        mermaid.initialize({
            startOnLoad: false,
            theme: 'dark', // or 'default', 'forest', 'neutral'
            securityLevel: 'loose',
            fontFamily: 'Inter, sans-serif',
        });
    }, []);

    useEffect(() => {
        const renderChart = async () => {
            if (!containerRef.current) return;

            try {
                const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
                const { svg } = await mermaid.render(id, chart);
                setSvg(svg);
                setError(null);
            } catch (err) {
                console.error("Mermaid rendering failed:", err);
                setError("Failed to render diagram.");
            }
        };

        renderChart();
    }, [chart]);

    if (error) {
        return <div className="text-red-500 text-sm p-4 border border-red-500/20 rounded bg-red-500/10">{error}</div>;
    }

    return (
        <div
            ref={containerRef}
            className={`mermaid-container flex justify-center items-center w-full overflow-x-auto ${className}`}
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
};

export default MermaidDiagram;
