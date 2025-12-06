'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
            {/* Background Gradient Mesh */}
            <div className="absolute inset-0 z-0 opacity-40">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/30 rounded-full mix-blend-screen filter blur-3xl animate-blob"></div>
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-blue-500/30 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-4000"></div>
            </div>

            <div className="container mx-auto px-4 z-10 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-6xl md:text-8xl font-bold tracking-tight mb-6 leading-tight"
                >
                    Find Your Perfect Investors <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-blue-400 animate-shimmer bg-[size:200%]">
                        in Minutes, Not Months
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
                >
                    FundLab uses AI to match your startup with angels and funds who actually invest in companies like yours.
                </motion.p>

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Button size="lg" className="rounded-full px-8 text-lg h-14" variant="glow" asChild>
                        <Link href="/chat">
                            Start Fundraising Free →
                        </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="rounded-full px-8 text-lg h-14 border-primary/20 hover:bg-primary/5">
                        View Demo
                    </Button>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-8 text-sm text-muted-foreground"
                >
                    No credit card required • 500+ investors indexed • AI-powered matching
                </motion.p>
            </div>
        </section>
    );
}
