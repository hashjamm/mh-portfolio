'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Mail } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import Magnetic from '@/components/ui/Magnetic';

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [isScrolled, setIsScrolled] = useState(false);

    // Derived State from URL
    const showMobileMenu = searchParams.get('menu') === 'true';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (showMobileMenu) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showMobileMenu]);

    const toggleMenu = () => {
        if (showMobileMenu) {
            router.back();
        } else {
            const currentParams = new URLSearchParams(searchParams.toString());
            currentParams.set('menu', 'true');
            router.push(`${pathname}?${currentParams.toString()}`, { scroll: false });
        }
    };

    const closeMenu = () => {
        if (showMobileMenu) router.back();
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled && !showMobileMenu
                ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-4 shadow-sm'
                : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-xl font-bold text-slate-900 dark:text-white tracking-tight z-50">
                    MH.Lee
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden md:flex items-center gap-8">
                    <Magnetic>
                        <Link href="/#projects" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors block px-2 py-1">
                            Projects
                        </Link>
                    </Magnetic>
                    <div className="h-4 w-px bg-slate-300 dark:bg-slate-700 mx-2" />
                    <div className="flex items-center gap-4">
                        <Magnetic>
                            <a
                                href="https://github.com/hashjamm"
                                target="_blank"
                                rel="noreferrer"
                                className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors block p-1"
                                aria-label="GitHub Profile"
                            >
                                <Github size={20} />
                            </a>
                        </Magnetic>
                        <Magnetic>
                            <a
                                href="mailto:lmh164231@gmail.com"
                                className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors block p-1"
                                aria-label="Email Contact"
                            >
                                <Mail size={20} />
                            </a>
                        </Magnetic>
                        {/* 다크모드 토글 버튼 */}
                        <ThemeToggle />
                    </div>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden z-50 p-2 text-slate-600 dark:text-slate-300"
                    onClick={toggleMenu}
                >
                    {showMobileMenu ? <X /> : <Menu />}
                </button>

                {showMobileMenu && (
                    <div className="fixed inset-0 bg-white dark:bg-slate-950 z-40 flex flex-col items-center justify-start gap-8 md:hidden animate-in fade-in duration-200 pt-32 h-[100dvh]">
                        <Link
                            href="/#projects"
                            className="text-2xl font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                            onClick={closeMenu}
                        >
                            Projects
                        </Link>
                        <a
                            href="mailto:lmh164231@gmail.com"
                            className="text-xl font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        >
                            Contact Me
                        </a>

                        {/* Mobile Theme Toggle */}
                        <div className="flex items-center gap-2 mt-4">
                            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Appearance</span>
                            <ThemeToggle />
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}