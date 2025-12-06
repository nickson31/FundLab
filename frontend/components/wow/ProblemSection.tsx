'use client';

import { motion } from 'framer-motion';
import { Clock, XCircle, Target } from 'lucide-react';

const painPoints = [
    {
        icon: Clock,
        title: "Months of Manual Research",
        surface: "You spend 3-4 months researching investors, building lists, personalizing outreach.",
        real: "Even after all that work, you're shooting in the dark. That angel who 'invests in fintech'? They haven't written a check in 2 years.",
        cost: "200+ hours of founder time ($30k wasted)",
        color: "text-blue-400",
        bgColor: "bg-blue-400/10",
        borderColor: "border-blue-400/20"
    },
    {
        icon: XCircle,
        title: "Low Response Rates",
        surface: "95% of your cold emails get ignored.",
        real: "Investors get 200-500 pitches per week. Your template looks exactly like the previous 50 they've seen today.",
        cost: "Damaged confidence & wasted warm intros",
        color: "text-pink-400",
        bgColor: "bg-pink-400/10",
        borderColor: "border-pink-400/20"
    },
    {
        icon: Target,
        title: "Wrong-Fit Pitches",
        surface: "You pitch funds that aren't the right fit. They pass. You move on.",
        real: "Every wrong-fit pitch has a hidden cost. Reputation travels fast. Bad targeting lasts forever.",
        cost: "Burned bridges & referral death",
        color: "text-purple-400",
        bgColor: "bg-purple-400/10",
        borderColor: "border-purple-400/20"
    }
];

export default function ProblemSection() {
    return (
        <section className="py-24 relative">
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-white">
                        Fundraising Shouldn't Feel Like <br />
                        <span className="text-muted-foreground">Searching for a Needle in a Haystack</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        You've built something incredible. But finding the right investors feels like a full-time job you can't afford.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {painPoints.map((point, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                            viewport={{ once: true }}
                            className={`glass-card p-8 rounded-2xl group hover:-translate-y-2 transition-all duration-300`}
                        >
                            <div className={`w-14 h-14 ${point.bgColor} rounded-xl flex items-center justify-center mb-6 ring-1 ring-white/10`}>
                                <point.icon className={`w-8 h-8 ${point.color}`} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">{point.title}</h3>

                            <div className="space-y-6 text-left">
                                <div>
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">The Surface Problem</p>
                                    <p className="text-sm text-gray-300 leading-relaxed">{point.surface}</p>
                                </div>
                                <div className="pt-4 border-t border-white/5">
                                    <p className="text-sm font-bold text-white/90">Cost: {point.cost}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
