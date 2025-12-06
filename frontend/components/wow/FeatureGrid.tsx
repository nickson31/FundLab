'use client';

import { motion } from 'framer-motion';
import { Search, Brain, Mail, User, ShieldCheck, Save } from 'lucide-react';

const features = [
    { icon: Search, title: "Smart Search", desc: "Find angels and funds with natural language search—no complex filters." },
    { icon: Brain, title: "AI Matching Algorithm", desc: "Weighted scoring across category, stage, and location ensures relevance." },
    { icon: Mail, title: "Personalized Messages", desc: "AI-drafted outreach that references investor's background and interests." },
    { icon: User, title: "Investor Profiles", desc: "See everything: LinkedIn, scores, past investments, contact info." },
    { icon: ShieldCheck, title: "No Duplicates", desc: "Never see the same investor twice—our anti-duplication logic saves you time." },
    { icon: Save, title: "Auto-Save Results", desc: "Every search result is saved automatically. Build your pipeline effortlessly." },
];

export default function FeatureGrid() {
    return (
        <section className="py-24 bg-gray-50 dark:bg-gray-800">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Everything You Need to Close Your Round
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.3 }}
                            viewport={{ once: true }}
                            className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm hover:shadow-md transition-all"
                        >
                            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mb-6 text-indigo-600 dark:text-indigo-400">
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
