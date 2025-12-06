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
        <section className="py-24 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                        Everything You Need to Close Your Round
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Powerful tools designed to simplify your fundraising workflow.
                    </p>
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
                            className="bg-card p-8 rounded-xl border border-border shadow-sm hover:shadow-xl transition-all group"
                        >
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
