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
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500/20"
    },
    {
        icon: XCircle,
        title: "Low Response Rates",
        surface: "95% of your cold emails get ignored.",
        real: "Investors get 200-500 pitches per week. Your template looks exactly like the previous 50 they've seen today.",
        cost: "Damaged confidence & wasted warm intros",
        color: "text-red-500",
        bgColor: "bg-red-500/10",
        borderColor: "border-red-500/20"
    },
    {
        icon: Target,
        title: "Wrong-Fit Pitches",
        surface: "You pitch funds that aren't the right fit. They pass. You move on.",
        real: "Every wrong-fit pitch has a hidden cost. Reputation travels fast. Bad targeting lasts forever.",
        cost: "Burned bridges & referral death",
        color: "text-orange-500",
        bgColor: "bg-orange-500/10",
        borderColor: "border-orange-500/20"
    }
];

export default function ProblemSection() {
    return (
        <section className="py-24 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                        Fundraising Shouldn't Feel Like <br />
                        <span className="text-muted-foreground">Searching for a Needle in a Haystack</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        You've built something incredible. But finding the right investors feels like a full-time job you can't afford.
                        While your competitors are shipping features, you're drowning in spreadsheets.
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
                            className={`bg-card p-8 rounded-2xl border ${point.borderColor} shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
                        >
                            <div className={`w-14 h-14 ${point.bgColor} rounded-xl flex items-center justify-center mb-6`}>
                                <point.icon className={`w-8 h-8 ${point.color}`} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-4">{point.title}</h3>

                            <div className="space-y-6 text-left">
                                <div>
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">The Surface Problem</p>
                                    <p className="text-sm text-foreground/80 leading-relaxed">{point.surface}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">The Real Problem</p>
                                    <p className="text-sm text-foreground/80 leading-relaxed">{point.real}</p>
                                </div>
                                <div className="pt-4 border-t border-border">
                                    <p className="text-sm font-bold text-destructive">Cost: {point.cost}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 text-center max-w-3xl mx-auto">
                    <p className="text-xl font-medium text-foreground">
                        Here's the truth: Fundraising is broken because you're using generic tools in a game optimized for precision.
                    </p>
                    <p className="mt-4 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                        That's FundLab.
                    </p>
                </div>
            </div>
        </section>
    );
}
