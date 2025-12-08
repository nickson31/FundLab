'use client';

import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

export default function FAQ() {
    return (
        <section id="faq" className="py-24 md:py-40 px-6 relative overflow-hidden border-t border-white/[0.05]">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold font-heading text-white tracking-tight mb-6">
                        Questions?
                    </h2>
                    <p className="text-xl text-gray-400">
                        Everything you need to know about FundLab.
                    </p>
                </motion.div>

                <div className="space-y-4">
                    {[
                        {
                            q: "How does the AI matching work?",
                            a: "Our AI analyzes your startup description, industry, stage, and location against 500,000+ investor profiles. We use semantic matching to find investors whose thesis and portfolio align with your company—not just keyword matching."
                        },
                        {
                            q: "Is my data secure?",
                            a: "Absolutely. We're GDPR compliant and SOC 2 certified. Your data is encrypted at rest and in transit. We never sell your information or share it with third parties."
                        },
                        {
                            q: "How much does FundLab cost?",
                            a: "We offer a free tier with 10 investor matches per month. Pro plans start at €49/month for unlimited matches, personalized outreach, and analytics. Enterprise plans are custom-priced."
                        },
                        {
                            q: "Can I export my investor list?",
                            a: "Yes! Export your matched investors, messages, and analytics to CSV, Excel, or directly to your CRM. Pro and Enterprise users get unlimited exports."
                        },
                        {
                            q: "What types of investors are in your database?",
                            a: "We have 300,000+ angel investors, 150,000+ VC professionals, and 50,000+ family office contacts. Our data is refreshed weekly from LinkedIn, Crunchbase, and proprietary sources."
                        }
                    ].map((faq, i) => (
                        <motion.details
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="group bg-white/[0.02] border border-white/[0.08] rounded-2xl overflow-hidden hover:border-white/[0.12] transition-colors"
                        >
                            <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                                <span className="font-bold text-white pr-8">{faq.q}</span>
                                <Plus className="w-5 h-5 text-gray-500 group-open:rotate-45 transition-transform duration-300" />
                            </summary>
                            <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                                {faq.a}
                            </div>
                        </motion.details>
                    ))}
                </div>
            </div>
        </section>
    );
}
