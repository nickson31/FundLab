'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function UseCases() {
    return (
        <section className="py-24 md:py-40 px-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-indigo-950/5 to-black"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold font-heading text-white tracking-tight mb-6">
                        Built for Every Stage.
                    </h2>
                    <p className="text-xl text-blue-400 max-w-2xl mx-auto">
                        Whether you're raising your first check or closing a Series A, FundLab adapts to your needs.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            stage: "Pre-Seed",
                            amount: "€50k - €500k",
                            title: "Find Your First Angels",
                            description: "Access 50,000+ angel investors actively looking for early-stage deals. Perfect for first-time founders.",
                            features: ["Angel investor database", "Warm intro suggestions", "Pitch deck review AI"],
                            gradient: "from-emerald-500/20 to-teal-500/20",
                            border: "border-emerald-500/30",
                            accent: "text-emerald-400"
                        },
                        {
                            stage: "Seed",
                            amount: "€500k - €3M",
                            title: "Connect with Early VCs",
                            description: "Match with seed-stage VCs who've invested in your vertical. Get personalized outreach that converts.",
                            features: ["VC fund matching", "LP network access", "Due diligence prep"],
                            gradient: "from-indigo-500/20 to-purple-500/20",
                            border: "border-indigo-500/30",
                            accent: "text-indigo-400"
                        },
                        {
                            stage: "Series A+",
                            amount: "€3M+",
                            title: "Scale Your Round",
                            description: "Reach institutional investors and growth funds. Manage complex cap tables and syndicate deals.",
                            features: ["Institutional access", "Syndicate builder", "Term sheet analyzer"],
                            gradient: "from-orange-500/20 to-rose-500/20",
                            border: "border-orange-500/30",
                            accent: "text-orange-400"
                        }
                    ].map((useCase, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15, duration: 0.5 }}
                            className="group relative"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-b ${useCase.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                            <div className={`relative bg-black/60 backdrop-blur-sm border ${useCase.border} rounded-3xl p-8 hover:border-white/20 transition-all duration-500 h-full`}>

                                <div className="flex items-center justify-between mb-6">
                                    <span className={`text-xs font-bold uppercase tracking-wider ${useCase.accent}`}>{useCase.stage}</span>
                                    <span className="text-xs text-blue-500">{useCase.amount}</span>
                                </div>

                                <h3 className="text-2xl font-bold font-heading text-white mb-3">{useCase.title}</h3>
                                <p className="text-blue-400 text-sm mb-6 leading-relaxed">{useCase.description}</p>

                                <ul className="space-y-2">
                                    {useCase.features.map((feature, j) => (
                                        <li key={j} className="flex items-center gap-2 text-sm text-blue-500">
                                            <Check className="w-4 h-4 text-blue-600" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
