'use client';

import { motion } from 'framer-motion';

export default function SocialProof() {
    return (
        <section className="py-24 px-6 relative overflow-hidden border-y border-white/[0.05]">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/10 via-transparent to-transparent"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Trust Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-[0.25em] mb-2">
                        Trusted by 500+ Founders Worldwide
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-20">
                    {[
                        { value: "€50M+", label: "Capital Raised", sublabel: "by our users" },
                        { value: "500+", label: "Active Founders", sublabel: "on the platform" },
                        { value: "25%", label: "Response Rate", sublabel: "avg. from investors" },
                        { value: "3x", label: "Faster", sublabel: "than manual outreach" }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="text-center group"
                        >
                            <div className="text-4xl md:text-5xl font-bold font-heading text-white mb-2 group-hover:text-indigo-400 transition-colors duration-500">
                                {stat.value}
                            </div>
                            <div className="text-sm font-medium text-gray-400">{stat.label}</div>
                            <div className="text-xs text-gray-600">{stat.sublabel}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Company Logos */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6"
                >
                    <p className="text-xs text-gray-600 uppercase tracking-widest mr-4">Alumni from</p>
                    {["Y Combinator", "Techstars", "500 Startups", "Seedcamp", "Antler"].map((company, i) => (
                        <span
                            key={i}
                            className="text-lg font-bold font-heading text-gray-500 hover:text-white transition-colors duration-300 cursor-default"
                        >
                            {company}
                        </span>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
