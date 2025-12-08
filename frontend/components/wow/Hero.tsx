'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Search, ArrowRight, Bot } from 'lucide-react';

export default function Hero() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
            <motion.div
                style={{ y: y1, opacity }}
                className="absolute top-0 inset-x-0 h-screen w-full -z-10 pointer-events-none"
            >
                <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[150px] mix-blend-screen" />
            </motion.div>

            <div className="max-w-5xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-[11px] uppercase tracking-wider font-bold text-indigo-300 mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
                        The AI Co-Pilot for Founders
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading text-white tracking-tight mb-8 leading-[1.1] drop-shadow-2xl">
                        Your First Round, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-white animate-gradient-x">Faster.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 font-medium leading-relaxed text-balance">
                        FundLab is the intelligence layer for your fundraise. We use LLMs to match you with the perfect investors, turning months of research into seconds.
                    </p>
                </motion.div>

                {/* Interactive Search Demo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
                    animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                    transition={{ duration: 1, delay: 0.3, type: "spring" }}
                    className="max-w-3xl mx-auto perspective-1000 group relative"
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

                    <div className="relative glass-premium rounded-2xl p-2 transition-all duration-500 ring-1 ring-white/10 shadow-2xl">

                        {/* Search Mockup */}
                        <div className="relative bg-[#0A0A0A] rounded-xl border border-white/5 px-6 py-5 flex items-center gap-4 shadow-inner">
                            <Search className="text-indigo-400 w-5 h-5" strokeWidth={2} />
                            <div className="flex-1 text-left">
                                <span className="text-lg text-gray-200 font-medium font-heading">Find Pre-Seed Fintech Angels in London...</span>
                            </div>
                            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                                <ArrowRight className="text-white w-4 h-4" />
                            </div>
                        </div>

                        {/* AI Logic Visual */}
                        <div className="mt-3 px-6 py-4 bg-white/[0.02] rounded-xl border border-white/5 text-left flex gap-4 overflow-hidden">
                            <div className="flex-1 space-y-3">
                                <div className="flex items-center gap-2 mb-2">
                                    <Bot className="text-indigo-400 w-4 h-4" />
                                    <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest">AI Reasoning</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {["Vertical: Fintech", "Stage: Pre-Seed", "Geo: London", "Cheque: £25k-£100k"].map((tag, i) => (
                                        <motion.span
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 1 + (i * 0.1) }}
                                            className="text-xs font-medium text-gray-300 bg-white/5 border border-white/5 px-3 py-1.5 rounded-lg"
                                        >
                                            {tag}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </motion.div>
            </div>
        </section>
    );
}
