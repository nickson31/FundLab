'use client';

import { motion } from 'framer-motion';

export default function HowItWorks() {
    return (
        <section className="py-24 md:py-40 px-6 relative overflow-hidden border-t border-white/[0.05]">
            {/* Subtle Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-indigo-950/5 to-black"></div>

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-32"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold font-heading text-white tracking-tight mb-6 leading-[1.1]">
                        How It Works.
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed">
                        From AI-powered matching to hyper-personalized outreach—automate your entire fundraising pipeline.
                    </p>
                </motion.div>

                {/* Process Steps - Horizontal Timeline */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">

                    {/* Step 1: Match */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="relative group"
                    >
                        {/* Step Number */}
                        <div className="mb-6">
                            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-bold text-sm group-hover:bg-indigo-500/20 group-hover:border-indigo-400/50 transition-all duration-500">
                                01
                            </div>
                        </div>

                        {/* Content */}
                        <h3 className="text-xl font-bold font-heading text-white mb-3 tracking-tight">
                            AI Matching
                        </h3>
                        <p className="text-gray-400 leading-relaxed text-sm">
                            Describe your startup. Our AI analyzes 500k+ profiles to find investors with matching thesis and portfolio.
                        </p>

                        {/* Connection Line (hidden on mobile) */}
                        <div className="hidden md:block absolute top-5 left-full w-full h-[1px] bg-gradient-to-r from-indigo-500/30 to-transparent"></div>
                    </motion.div>

                    {/* Step 2: Draft */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="relative group"
                    >
                        {/* Step Number */}
                        <div className="mb-6">
                            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-bold text-sm group-hover:bg-indigo-500/20 group-hover:border-indigo-400/50 transition-all duration-500">
                                02
                            </div>
                        </div>

                        {/* Content */}
                        <h3 className="text-xl font-bold font-heading text-white mb-3 tracking-tight">
                            Draft Messages
                        </h3>
                        <p className="text-gray-400 leading-relaxed text-sm">
                            Generate hyper-personalized LinkedIn and email messages tailored to each investor's history and interests.
                        </p>

                        {/* Connection Line */}
                        <div className="hidden md:block absolute top-5 left-full w-full h-[1px] bg-gradient-to-r from-indigo-500/30 to-transparent"></div>
                    </motion.div>

                    {/* Step 3: Send */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="relative group"
                    >
                        {/* Step Number */}
                        <div className="mb-6">
                            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-bold text-sm group-hover:bg-indigo-500/20 group-hover:border-indigo-400/50 transition-all duration-500">
                                03
                            </div>
                        </div>

                        {/* Content */}
                        <h3 className="text-xl font-bold font-heading text-white mb-3 tracking-tight">
                            Automate Outreach
                        </h3>
                        <p className="text-gray-400 leading-relaxed text-sm">
                            Send 1,000+ messages per week. Track opens, responses, and schedule automated follow-ups.
                        </p>

                        {/* Connection Line */}
                        <div className="hidden md:block absolute top-5 left-full w-full h-[1px] bg-gradient-to-r from-indigo-500/30 to-transparent"></div>
                    </motion.div>

                    {/* Step 4: Close */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="relative group"
                    >
                        {/* Step Number */}
                        <div className="mb-6">
                            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-bold text-sm group-hover:bg-indigo-500/20 group-hover:border-indigo-400/50 transition-all duration-500">
                                04
                            </div>
                        </div>

                        {/* Content */}
                        <h3 className="text-xl font-bold font-heading text-white mb-3 tracking-tight">
                            Track & Close
                        </h3>
                        <p className="text-gray-400 leading-relaxed text-sm">
                            Monitor your pipeline in real-time. See response rates, schedule meetings, and close your round faster.
                        </p>
                    </motion.div>

                </div>

                {/* Stats Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
                >
                    <div className="text-center">
                        <div className="text-4xl md:text-5xl font-bold font-heading text-white mb-2">500k+</div>
                        <div className="text-sm text-gray-500 uppercase tracking-wider">Investor Profiles</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl md:text-5xl font-bold font-heading text-white mb-2">1,000+</div>
                        <div className="text-sm text-gray-500 uppercase tracking-wider">Messages/Week</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl md:text-5xl font-bold font-heading text-white mb-2">3x</div>
                        <div className="text-sm text-gray-500 uppercase tracking-wider">Faster Fundraising</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl md:text-5xl font-bold font-heading text-white mb-2">25%</div>
                        <div className="text-sm text-gray-500 uppercase tracking-wider">Response Rate</div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
