'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full z-50 border-b border-border/40 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-500">
                        <Sparkles className="w-4 h-4" strokeWidth={2} />
                    </div>
                    <span className="text-foreground font-bold tracking-tight text-lg font-heading">FundLab</span>
                </Link>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
                    <a href="#features" className="hover:text-foreground transition-colors">Features</a>
                    <a href="#data" className="hover:text-foreground transition-colors">Data & Privacy</a>
                    <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
                </div>

                {/* Desktop CTA */}
                <div className="hidden sm:flex items-center gap-4">
                    <ModeToggle />
                    <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Log in</Link>
                    <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90 font-bold rounded-full px-6 shadow-xl shadow-foreground/5 dark:shadow-white/5" asChild>
                        <Link href="/chat">
                            Get Access <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
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
                        className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl"
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
                                    className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Log in
                                </Link>
                                <Button className="w-full bg-foreground text-background hover:bg-foreground/90 font-bold rounded-full" asChild>
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
