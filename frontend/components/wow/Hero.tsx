'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-10 pb-20">
            {/* Ambient Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[4000ms]"></div>
                <div className="absolute bottom-[20%] right-[20%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[5000ms]"></div>
            </div>

            <div className="container relative z-10 px-4 mx-auto text-center flex flex-col items-center">

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-button mb-8 cursor-default group"
                >
                    <Sparkles className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
                    <span className="text-sm font-medium text-blue-200/90 tracking-wide">AI-Powered Fundraising Agent</span>
                </motion.div>

                {/* Main Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 text-balance max-w-5xl"
                >
                    Build your cap table <br />
                    <span className="text-gradient-purple relative">
                        in record time.
                        <svg className="absolute w-full h-3 -bottom-1 left-0 text-blue-500/30 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                        </svg>
                    </span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed text-balance"
                >
                    FundLab is the AI copilot that finds, vets, and connects you with the perfect investors for your startup.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
                >
                    <Button size="lg" className="rounded-full px-8 text-lg h-14 min-w-[200px] shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)] hover:shadow-[0_0_60px_-10px_rgba(79,70,229,0.7)] hover:scale-105 transition-all duration-300 bg-white text-black hover:bg-gray-100 border-0" asChild>
                        <Link href="/chat">
                            Start Building
                        </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="rounded-full px-8 text-lg h-14 min-w-[200px] glass-button border-white/10 hover:bg-white/5 hover:text-white hover:border-white/20 transition-all duration-300" asChild>
                        <Link href="/demo">
                            Watch Demo
                        </Link>
                    </Button>
                </motion.div>

                {/* Social Proof / Trust */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="mt-20 pt-10 border-t border-white/5 w-full max-w-4xl"
                >
                    <p className="text-sm font-medium text-muted-foreground mb-6 uppercase tracking-widest opacity-60">
                        Trusted by founders from
                    </p>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Mock Logos - Replace with SVGs or images */}
                        <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-600">Y Combinator</div>
                        <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-600">Techstars</div>
                        <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-600">Sequoia</div>
                        <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-600">A16Z</div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
