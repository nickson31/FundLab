'use client';

import { motion } from 'framer-motion';
import { Database, BrainCircuit, ShieldCheck } from 'lucide-react';

export default function IntelligenceSection() {
    return (
        <section id="features" className="py-24 md:py-40 px-6 relative overflow-hidden">
            {/* Ambient Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-black to-black"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-6xl mx-auto relative z-10">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-24"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold font-heading text-white tracking-tight mb-6 leading-[1.1]">
                        Intelligence at Scale.
                    </h2>
                    <p className="text-xl md:text-2xl text-blue-400 font-light max-w-3xl mx-auto leading-relaxed">
                        Stop manually searching LinkedIn. Our AI digests millions of data points to find the investors actually interested in your vertical.
                    </p>
                </motion.div>

                {/* Feature Cards - Minimalist Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Card 1: 500k+ Profiles */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="group relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.07] to-white/[0.02] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative bg-black/40 backdrop-blur-sm border border-white/[0.08] rounded-2xl p-8 hover:border-white/[0.15] transition-all duration-500">

                            {/* Icon Container */}
                            <div className="mb-8">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center group-hover:scale-110 group-hover:border-indigo-400/50 transition-all duration-500">
                                    <Database className="w-6 h-6 text-indigo-400" strokeWidth={1.5} />
                                </div>
                            </div>

                            {/* Content */}
                            <h3 className="text-2xl font-bold font-heading text-white mb-3 tracking-tight">
                                500k+ Profiles
                            </h3>
                            <p className="text-blue-400 leading-relaxed text-[15px]">
                                Access the world's most comprehensive database of Angels, VCs, and Family Offices.
                            </p>

                            {/* Subtle Hover Indicator */}
                            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                    </motion.div>

                    {/* Card 2: Semantic Matching */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="group relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.07] to-white/[0.02] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative bg-black/40 backdrop-blur-sm border border-white/[0.08] rounded-2xl p-8 hover:border-white/[0.15] transition-all duration-500">

                            {/* Icon Container */}
                            <div className="mb-8">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center group-hover:scale-110 group-hover:border-indigo-400/50 transition-all duration-500">
                                    <BrainCircuit className="w-6 h-6 text-indigo-400" strokeWidth={1.5} />
                                </div>
                            </div>

                            {/* Content */}
                            <h3 className="text-2xl font-bold font-heading text-white mb-3 tracking-tight">
                                Semantic Matching
                            </h3>
                            <p className="text-blue-400 leading-relaxed text-[15px]">
                                Don't rely on keywords. Describe your startup in plain English and let AI find the perfect thesis match.
                            </p>

                            {/* Subtle Hover Indicator */}
                            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                    </motion.div>

                    {/* Card 3: Privacy First */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="group relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.07] to-white/[0.02] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative bg-black/40 backdrop-blur-sm border border-white/[0.08] rounded-2xl p-8 hover:border-white/[0.15] transition-all duration-500">

                            {/* Icon Container */}
                            <div className="mb-8">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center group-hover:scale-110 group-hover:border-indigo-400/50 transition-all duration-500">
                                    <ShieldCheck className="w-6 h-6 text-indigo-400" strokeWidth={1.5} />
                                </div>
                            </div>

                            {/* Content */}
                            <h3 className="text-2xl font-bold font-heading text-white mb-3 tracking-tight">
                                Privacy First
                            </h3>
                            <p className="text-blue-400 leading-relaxed text-[15px]">
                                GDPR compliant. Your data is secure, and we never resell your contact info.
                            </p>

                            {/* Subtle Hover Indicator */}
                            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
