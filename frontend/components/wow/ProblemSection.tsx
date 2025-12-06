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
        color: "text-blue-600",
        bgColor: "bg-blue-100"
    },
    {
        icon: XCircle,
        title: "Low Response Rates",
        surface: "95% of your cold emails get ignored.",
        real: "Investors get 200-500 pitches per week. Your template looks exactly like the previous 50 they've seen today.",
        cost: "Damaged confidence & wasted warm intros",
        color: "text-red-600",
        bgColor: "bg-red-100"
    },
    {
        icon: Target,
        title: "Wrong-Fit Pitches",
        surface: "You pitch funds that aren't the right fit. They pass. You move on.",
        real: "Every wrong-fit pitch has a hidden cost. Reputation travels fast. Bad targeting lasts forever.",
        cost: "Burned bridges & referral death",
        color: "text-orange-600",
        bgColor: "bg-orange-100"
    }
];

export default function ProblemSection() {
    return (
        <section className="py-24 bg-gray-50 dark:bg-gray-800">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                        Fundraising Shouldn't Feel Like Searching for a Needle in a Haystack
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
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
                            className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className={`w-14 h-14 ${point.bgColor} rounded-xl flex items-center justify-center mb-6`}>
                                <point.icon className={`w-8 h-8 ${point.color}`} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{point.title}</h3>

                            <div className="space-y-4 text-left">
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">The Surface Problem</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{point.surface}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">The Real Problem</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{point.real}</p>
                                </div>
                                <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                                    <p className="text-sm font-bold text-red-500">Cost: {point.cost}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center max-w-3xl mx-auto">
                    <p className="text-xl font-medium text-gray-900 dark:text-white">
                        Here's the truth: Fundraising is broken because you're using generic tools in a game optimized for precision.
                    </p>
                    <p className="mt-4 text-2xl font-bold text-indigo-600">
                        That's FundLab.
                    </p>
                </div>
            </div>
        </section>
    );
}
