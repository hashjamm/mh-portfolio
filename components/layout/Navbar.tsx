'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Mail } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle'; // 토글 버튼 임포트

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-slate-200 py-4 shadow-sm' : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
                {/* Logo */}
                <a href="/" className="text-xl font-bold text-slate-900 tracking-tight z-50">
                    MH.Lee
                </a>

                {/* Desktop Menu */}
                <nav className="hidden md:flex items-center gap-8">
                    <a href="/#projects" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                        Projects
                    </a>
                    <div className="h-4 w-px bg-slate-300 mx-2" />
                    <div className="flex items-center gap-4">
                        <a
                            href="https://github.com/hashjamm"
                            target="_blank"
                            rel="noreferrer"
                            className="text-slate-500 hover:text-slate-900 transition-colors"
                            aria-label="GitHub Profile"
                        >
                            <Github size={20} />
                        </a>
                        <a
                            href="mailto:lmh164231@gmail.com"
                            className="text-slate-500 hover:text-slate-900 transition-colors"
                            aria-label="Email Contact"
                        >
                            <Mail size={20} />
                        </a>
                        {/* 다크모드 토글 버튼 추가 */}
                        <ThemeToggle />
                    </div>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden z-50 p-2 text-slate-600"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>

                {/* Mobile Overlay Menu */}
                {isMobileMenuOpen && (
                    <div className="fixed inset-0 bg-white/95 backdrop-blur-sm z-40 flex flex-col items-center justify-center gap-8 md:hidden animate-in fade-in duration-200">
                        <a
                            href="/#projects"
                            className="text-2xl font-bold text-slate-900 hover:text-blue-600"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Projects
                        </a>
                        <a
                            href="mailto:lmh164231@gmail.com"
                            className="text-xl font-medium text-slate-500 hover:text-slate-900"
                        >
                            Contact Me
                        </a>
                    </div>
                )}
            </div>
        </header>
    );
}