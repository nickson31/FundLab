'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CTA() {
    return (
        <section className="py-32 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
            </div>

            <div className="container mx-auto px-4 text-center relative z-10 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="glass-card p-12 md:p-20 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden"
                >
                    {/* Inner texture/grid */}
                    <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-10 mix-blend-overlay"></div>

                    <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white">
                        Ready to Find Your Investors?
                    </h2>

                    <p className="text-xl text-blue-100/80 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Start searching for free in under 60 seconds. No commitment, no credit card.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button size="lg" className="rounded-full px-10 text-lg h-16 shadow-2xl shadow-blue-500/20 hover:shadow-blue-500/40 bg-white text-blue-900 hover:bg-blue-50 transition-all duration-300" asChild>
                            <Link href="/chat">
                                Start Building Free
                            </Link>
                        </Button>
                    </div>

                    <p className="mt-8 text-sm text-blue-200/40 flex items-center justify-center gap-4">
                        <span>🔒 Secure Data</span>
                        <span>•</span>
                        <span>✅ GDPR Compliant</span>
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
