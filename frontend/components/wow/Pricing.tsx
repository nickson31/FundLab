'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Pricing() {
    return (
        <section id="pricing" className="py-24 md:py-40 px-6 relative overflow-hidden border-t border-white/[0.05]">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/10 via-transparent to-transparent"></div>

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold font-heading text-white tracking-tight mb-6">
                        Simple Pricing.
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Start free. Upgrade when you're ready to scale your fundraise.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            name: "Free",
                            price: "€0",
                            period: "forever",
                            description: "Perfect for exploring the platform",
                            features: ["10 investor matches/month", "Basic AI search", "5 message drafts", "Email support"],
                            cta: "Get Started",
                            popular: false
                        },
                        {
                            name: "Pro",
                            price: "€49",
                            period: "/month",
                            description: "For serious fundraisers",
                            features: ["Unlimited matches", "Advanced AI matching", "Unlimited messages", "CRM export", "Response tracking", "Priority support"],
                            cta: "Start Pro Trial",
                            popular: true
                        },
                        {
                            name: "Enterprise",
                            price: "Custom",
                            period: "",
                            description: "For teams and accelerators",
                            features: ["Everything in Pro", "Team collaboration", "Custom integrations", "Dedicated success manager", "SLA guarantee", "White-label options"],
                            cta: "Contact Sales",
                            popular: false
                        }
                    ].map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`relative ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider rounded-full">
                                    Most Popular
                                </div>
                            )}
                            <div className={`h-full bg-black/60 backdrop-blur-sm border rounded-3xl p-8 ${plan.popular ? 'border-indigo-500/50 ring-1 ring-indigo-500/20' : 'border-white/[0.08]'}`}>
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-bold font-heading text-white">{plan.price}</span>
                                        <span className="text-gray-500">{plan.period}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2">{plan.description}</p>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, j) => (
                                        <li key={j} className="flex items-center gap-3 text-sm text-gray-400">
                                            <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    className={`w-full rounded-full font-bold h-12 ${plan.popular ? 'bg-white text-black hover:bg-gray-100' : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'}`}
                                    asChild
                                >
                                    <Link href="/chat">{plan.cta}</Link>
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
