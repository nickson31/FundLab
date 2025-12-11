'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-[0_0_20px_rgba(99,102,241,0.5)] group-hover:shadow-[0_0_30px_rgba(99,102,241,0.8)] transition-all duration-500">
                        <Sparkles className="w-4 h-4" strokeWidth={2} />
                    </div>
                    <span className="text-white font-bold tracking-tight text-lg font-heading group-hover:text-blue-200 transition-colors">FundLab</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-blue-400">
                    <a href="#features" className="hover:text-white transition-colors">Features</a>
                    <a href="#data" className="hover:text-white transition-colors">Data & Privacy</a>
                    <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
                </div>

                {/* Desktop CTA */}
                <div className="hidden sm:flex items-center gap-4">
                    <Link href="/login" className="text-sm font-medium text-blue-400 hover:text-white transition-colors">Log in</Link>
                    <Button size="sm" className="bg-white text-black hover:bg-blue-100 font-bold rounded-full px-6 shadow-xl shadow-white/5" asChild>
                        <Link href="/chat">
                            Get Access <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden p-2 text-blue-400 hover:text-white transition-colors"
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-white/5 bg-black/95 backdrop-blur-xl"
                    >
                        <div className="px-4 py-4 space-y-3">
                            <a
                                href="#features"
                                className="block py-2 text-blue-400 hover:text-white transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Features
                            </a>
                            <a
                                href="#data"
                                className="block py-2 text-blue-400 hover:text-white transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Data & Privacy
                            </a>
                            <a
                                href="#pricing"
                                className="block py-2 text-blue-400 hover:text-white transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Pricing
                            </a>
                            <div className="pt-3 border-t border-white/10 space-y-2">
                                <Link
                                    href="/login"
                                    className="block py-2 text-blue-400 hover:text-white transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Log in
                                </Link>
                                <Button className="w-full bg-white text-black hover:bg-blue-100 font-bold rounded-full" asChild>
                                    <Link href="/chat" onClick={() => setMobileMenuOpen(false)}>
                                        Get Access <ArrowRight className="ml-2 w-4 h-4" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
