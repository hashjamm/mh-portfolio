'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

interface ProjectGalleryProps {
    images: string[];
    title: string;
}

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Derived State from URL
    const imageParam = searchParams.get('image');
    const index = imageParam ? parseInt(imageParam, 10) : null;

    const openLightbox = (i: number) => {
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.set('image', i.toString());
        router.push(`${pathname}?${currentParams.toString()}`, { scroll: false });
    };

    const closeLightbox = () => {
        if (index !== null) router.back();
    };

    // Slide direction state
    const [direction, setDirection] = useState(0);

    const nextImage = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (index === null) return;
        setDirection(1);
        const nextIndex = (index + 1) % images.length;
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.set('image', nextIndex.toString());
        router.replace(`${pathname}?${currentParams.toString()}`, { scroll: false });
    }, [index, images.length, pathname, router, searchParams]);

    const prevImage = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (index === null) return;
        setDirection(-1);
        const prevIndex = (index - 1 + images.length) % images.length;
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.set('image', prevIndex.toString());
        router.replace(`${pathname}?${currentParams.toString()}`, { scroll: false });
    }, [index, images.length, pathname, router, searchParams]);

    // Slide variants
    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.9
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.9
        })
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (index === null) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [index, nextImage, prevImage]);

    // Lock body scroll when lightbox is open
    useEffect(() => {
        if (index !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [index]);

    if (!images || images.length === 0) return null;

    return (
        <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3 text-slate-900 dark:text-white">
                <ImageIcon className="w-6 h-6 text-pink-500" />
                Project Gallery
            </h2>

            {/* Grid View */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {images.map((img, idx) => (
                    <motion.div
                        key={idx}
                        layoutId={`gallery-image-${idx}`}
                        onClick={() => {
                            setDirection(0);
                            openLightbox(idx);
                        }}
                        className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm group cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Image
                            src={img}
                            alt={`${title} screenshot ${idx + 1}`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <span className="bg-black/50 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                                View Fullscreen
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence initial={false} custom={direction}>
                {index !== null && (
                    <motion.div
                        key="lightbox-modal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, pointerEvents: 'none' }}
                        onClick={closeLightbox}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-0 md:p-8"
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeLightbox}
                            className="absolute top-4 right-4 md:top-8 md:right-8 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 p-2 rounded-full transition-colors z-50"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        {/* Navigation Buttons */}
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="hidden md:flex absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 p-3 rounded-full transition-colors z-50"
                                >
                                    <ChevronLeft className="w-8 h-8" />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="hidden md:flex absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 p-3 rounded-full transition-colors z-50"
                                >
                                    <ChevronRight className="w-8 h-8" />
                                </button>
                            </>
                        )}

                        {/* Main Image */}
                        <div
                            className="relative w-full h-full max-w-7xl max-h-[100vh] md:max-h-[90vh] flex items-center justify-center overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <AnimatePresence initial={false} custom={direction} mode="popLayout">
                                <motion.div
                                    key={index}
                                    custom={direction}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{
                                        x: { type: "tween", duration: 0.3, ease: "easeInOut" },
                                        opacity: { duration: 0.2 }
                                    }}
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={1}
                                    onDragEnd={(e, { offset, velocity }) => {
                                        const swipe = offset.x; // detected swipe content
                                        const swipeThreshold = 50; // offset necessary to trigger swipe

                                        if (swipe < -swipeThreshold) {
                                            nextImage();
                                        } else if (swipe > swipeThreshold) {
                                            prevImage();
                                        }
                                    }}
                                    className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
                                >
                                    <Image
                                        src={images[index]}
                                        alt={`${title} gallery image ${index + 1}`}
                                        fill
                                        className="object-contain pointer-events-none"
                                        quality={100}
                                        priority
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* Image Counter */}
                            <div className="absolute bottom-8 md:bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm z-50">
                                {index + 1} / {images.length}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
