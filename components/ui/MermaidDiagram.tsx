'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, RotateCcw } from 'lucide-react';
import mermaid from 'mermaid';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

interface MermaidDiagramProps {
    chart: string;
    className?: string;
}

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart, className }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const containerRef = useRef<HTMLDivElement>(null);
    const [svg, setSvg] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    // Derived State
    const isOpen = searchParams.get('diagram') === 'true';

    // Zoom & Pan state
    const [scale, setScale] = useState(1);

    // Reset function
    const handleReset = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setScale(1);
    };

    // Wheel Zoom function
    const handleWheel = (e: React.WheelEvent) => {
        // Prevent default page scroll behavior if it propagates
        // Note: setting overflow-hidden on body handles most page scroll issues

        const delta = -e.deltaY * 0.001; // Sensitivity factor
        const newScale = Math.min(Math.max(0.1, scale + delta), 10); // Wider range for "fit" starting point

        setScale(newScale);
    };

    useEffect(() => {
        const renderChart = async () => {
            try {
                mermaid.initialize({
                    startOnLoad: false,
                    theme: 'base',
                    themeVariables: {
                        darkMode: true,
                        background: '#ffffff',
                        primaryColor: '#6366f1',
                        secondaryColor: '#ec4899',
                        tertiaryColor: '#f8fafc',
                        primaryBorderColor: '#4338ca',
                        lineColor: '#94a3b8',
                        textColor: '#334155',
                        fontSize: '16px',
                    },
                    securityLevel: 'loose',
                    fontFamily: 'Inter, sans-serif',
                });

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

    // Handle body scroll locking and ESC key
    useEffect(() => {
        if (isOpen) {
            // Lock scroll and reset scale
            document.body.style.overflow = 'hidden';
            setScale(1);

            // ESC key handler
            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === 'Escape') {
                    router.back();
                }
            };
            window.addEventListener('keydown', handleKeyDown);

            // Cleanup
            return () => {
                document.body.style.overflow = 'unset';
                window.removeEventListener('keydown', handleKeyDown);
                setScale(1);
            };
        }
    }, [isOpen]);

    if (error) {
        return <div className="text-red-500 text-sm p-4 border border-red-500/20 rounded bg-red-500/10">{error}</div>;
    }

    return (
        <>
            {/* Thumbnail / In-Page View */}
            <div
                className={`relative group cursor-pointer rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 transition-all hover:shadow-md ${className}`}
                onClick={() => {
                    const currentParams = new URLSearchParams(searchParams.toString());
                    currentParams.set('diagram', 'true');
                    router.push(`${pathname}?${currentParams.toString()}`, { scroll: false });
                }}
            >
                <div
                    ref={containerRef}
                    className="mermaid-container flex justify-center items-center w-full overflow-x-auto min-h-[200px]"
                    dangerouslySetInnerHTML={{ __html: svg }}
                />

                {/* Persistent Expand Button (Top Right) - Always Visible */}
                <button
                    className="absolute top-3 right-3 p-2 bg-white dark:bg-slate-800 text-slate-500 hover:text-royal dark:hover:text-neon rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 transition-colors z-10"
                    title="Expand Diagram"
                    onClick={(e) => {
                        e.stopPropagation();
                        // Open Diagram
                        const currentParams = new URLSearchParams(searchParams.toString());
                        currentParams.set('diagram', 'true');
                        router.push(`${pathname}?${currentParams.toString()}`, { scroll: false });
                    }}
                >
                    <ZoomIn className="w-5 h-5" />
                </button>

                {/* Hover Overlay Text */}
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors flex items-center justify-center pointer-events-none">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 duration-200">
                        Click to Expand
                    </span>
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 dark:bg-slate-950/95 backdrop-blur-md p-4 md:p-8 overflow-hidden" // overflow-hidden to prevent body scroll
                        onClick={() => router.back()}
                    >
                        {/* Controls Container */}
                        <div
                            className="absolute top-4 right-4 md:top-8 md:right-8 flex items-center gap-2 z-50"
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking controls
                        >
                            {/* Reset Button */}
                            <button
                                onClick={handleReset}
                                className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shadow-sm font-medium text-sm"
                            >
                                <RotateCcw className="w-4 h-4" />
                                Reset {Math.round(scale * 100)}%
                            </button>

                            {/* Close Button */}
                            <button
                                onClick={() => router.back()}
                                className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700 shadow-sm"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Interactive Canvas */}
                        <div
                            className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 cursor-move"
                            onClick={(e) => e.stopPropagation()}
                            onWheel={handleWheel}
                        >
                            {/* Global style override for the SVG inside the modal to force full fit */}
                            <style jsx global>{`
                                .mermaid-modal-content svg {
                                    width: 100% !important;
                                    height: 100% !important;
                                    max-width: none !important;
                                    max-height: none !important;
                                }
                            `}</style>

                            <motion.div
                                drag
                                dragConstraints={{ left: -1000, right: 1000, top: -1000, bottom: 1000 }} // Allow free panning
                                dragElastic={0.1}
                                animate={{ scale: scale }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="mermaid-modal-content min-w-full min-h-full flex items-center justify-center p-8 md:p-12"
                                style={{ transformOrigin: 'center' }}
                            >
                                <div
                                    dangerouslySetInnerHTML={{ __html: svg }}
                                    className="w-full h-full pointer-events-none select-none flex items-center justify-center" // added flex/center
                                />
                            </motion.div>

                            {/* Helper Text */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-100/90 dark:bg-slate-800/90 px-4 py-2 rounded-full text-xs text-slate-500 font-medium backdrop-blur-sm pointer-events-none select-none border border-slate-200 dark:border-slate-700 z-10">
                                Scroll to Zoom • Drag to Pan
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default MermaidDiagram;
