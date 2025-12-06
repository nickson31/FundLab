'use client';

import { motion } from 'framer-motion';
import { Search, Cpu, MessageSquare } from 'lucide-react';

const steps = [
    {
        icon: Search,
        title: "1. Search Like a Human",
        desc: "Type what you're looking for in plain language. 'Find fintech angels in Madrid who invest pre-seed'.",
        detail: "Our AI expands your query into 50+ related terms (e.g., 'payments', 'neobank', 'DeFi')."
    },
    {
        icon: Cpu,
        title: "2. Match Like a Machine",
        desc: "Our weighted algorithm scans 500+ profiles and scores them across 4 dimensions.",
        detail: "Category Fit (40%), Angel Score (30%), Stage Fit (20%), Location (10%)."
    },
    {
        icon: MessageSquare,
        title: "3. Personalized Outreach",
        desc: "We combine your company context with investor data to draft high-converting messages.",
        detail: "It references their 'gold nuggets' (exits, interests) automatically."
    }
];

export default function SolutionSection() {
    return (
        <section className="py-24 bg-white dark:bg-gray-900 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                        Meet FundLab: Your AI Co-Pilot
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        FundLab is what happens when you combine 500+ investor profiles with an AI matching algorithm trained on real investment patterns.
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 dark:from-indigo-900 dark:to-pink-900 z-0"></div>

                    <div className="grid md:grid-cols-3 gap-12 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.3, duration: 0.6 }}
                                viewport={{ once: true }}
                                className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-lg"
                            >
                                <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl text-white">
                                    <step.icon className="w-10 h-10" />
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">{step.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4 text-center">{step.desc}</p>
                                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg text-sm text-gray-500 dark:text-gray-400">
                                    <strong>Under the hood:</strong> {step.detail}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
