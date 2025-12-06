'use client';

import { motion } from 'framer-motion';

export default function SocialProof() {
    return (
        <section className="py-20 border-t border-white/5 relative z-10">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-12 text-balance pointer-events-none">
                    Join Ambitious Founders Raising Smarter
                </h2>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="glass-card p-8 rounded-2xl text-left"
                    >
                        <p className="text-lg text-muted-foreground italic mb-6">
                            "FundLab helped me find 12 relevant angels in one afternoon. I closed my pre-seed in 3 weeks."
                        </p>
                        <div className="font-bold text-foreground flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600"></div>
                            <div>
                                <div className="text-sm">María S.</div>
                                <div className="text-xs text-muted-foreground font-normal">SaaS Founder</div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -5 }}
                        className="glass-card p-8 rounded-2xl text-left"
                    >
                        <p className="text-lg text-muted-foreground italic mb-6">
                            "The AI-generated messages actually got responses. 40% reply rate vs. my usual 5%."
                        </p>
                        <div className="font-bold text-foreground flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-600"></div>
                            <div>
                                <div className="text-sm">David L.</div>
                                <div className="text-xs text-muted-foreground font-normal">Fintech Startup</div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto text-center divide-x divide-white/10">
                    <div>
                        <div className="text-4xl font-bold text-blue-400 mb-2">500+</div>
                        <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">Investors Indexed</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-purple-400 mb-2">3 Mins</div>
                        <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">Avg Search Time</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-pink-400 mb-2">85%</div>
                        <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">Match Relevance</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
