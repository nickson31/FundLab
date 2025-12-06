'use client';

import { motion } from 'framer-motion';
import { Search, Cpu, MessageSquare } from 'lucide-react';

const steps = [
    {
        icon: Search,
        title: "1. Search Like a Human",
        desc: "Type what you're looking for in plain language. 'Find fintech angels in Madrid who invest pre-seed'.",
        detail: "AI expands query into 50+ related terms"
    },
    {
        icon: Cpu,
        title: "2. Match Like a Machine",
        desc: "Our weighted algorithm scans 500+ profiles and scores them across 4 dimensions.",
        detail: "Category, Angel Score, Stage, Location"
    },
    {
        icon: MessageSquare,
        title: "3. Personalized Outreach",
        desc: "We combine your company context with investor data to draft high-converting messages.",
        detail: "Automatic references to portfolio & interests"
    }
];

export default function SolutionSection() {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen -translate-y-1/2" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 text-balance">
                        Meet FundLab: <span className="text-gradient hover:text-white transition-colors">Your AI Co-Pilot</span>
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        FundLab is what happens when you combine 500+ investor profiles with an AI matching algorithm trained on real investment patterns.
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-[60px] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent z-0"></div>

                    <div className="grid md:grid-cols-3 gap-8 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="glass-card p-8 rounded-2xl text-center group hover:bg-white/5 transition-all duration-300"
                            >
                                <div className="w-20 h-20 glass bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg ring-1 ring-white/10 group-hover:scale-110 transition-transform duration-300 backdrop-blur-md">
                                    <step.icon className="w-8 h-8 text-blue-300" />
                                </div>

                                <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                                <p className="text-muted-foreground mb-6 leading-relaxed text-sm">{step.desc}</p>
                                <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-200">
                                    {step.detail}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
