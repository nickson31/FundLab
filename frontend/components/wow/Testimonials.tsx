'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function Testimonials() {
    return (
        <section className="py-24 md:py-40 px-6 relative overflow-hidden border-t border-white/[0.05]">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold font-heading text-white tracking-tight mb-6">
                        Founders Love Us.
                    </h2>
                    <p className="text-xl text-blue-400">
                        Join hundreds of founders who've closed their rounds with FundLab.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            quote: "FundLab helped us find 47 perfectly matched angels in under an hour. We closed our pre-seed in 3 weeks instead of 3 months.",
                            name: "Sarah Chen",
                            role: "CEO, Finova",
                            raised: "€650k Pre-Seed"
                        },
                        {
                            quote: "The AI-generated messages had a 35% response rate. That's unheard of for cold outreach. Game changer for our seed round.",
                            name: "Marcus Rodriguez",
                            role: "Founder, DataStack",
                            raised: "€2.1M Seed"
                        },
                        {
                            quote: "I was spending 20 hours a week on investor research. Now it's 2 hours. FundLab is like having a full-time fundraising associate.",
                            name: "Elena Kowalski",
                            role: "Co-founder, HealthTech AI",
                            raised: "€1.5M Seed"
                        }
                    ].map((testimonial, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="group"
                        >
                            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 hover:border-white/[0.15] transition-all duration-500 h-full flex flex-col">
                                <div className="flex gap-1 mb-6">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Sparkles key={star} className="w-4 h-4 text-yellow-500" />
                                    ))}
                                </div>

                                <p className="text-white/80 leading-relaxed mb-8 flex-grow italic">
                                    "{testimonial.quote}"
                                </p>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <div className="font-bold text-white">{testimonial.name}</div>
                                        <div className="text-sm text-blue-500">{testimonial.role}</div>
                                        <div className="text-xs text-indigo-400 font-medium">{testimonial.raised}</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
