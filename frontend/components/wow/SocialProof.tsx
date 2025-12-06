'use client';

import { motion } from 'framer-motion';

export default function SocialProof() {
    return (
        <section className="py-20 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-12">
                    Join Ambitious Founders Raising Smarter
                </h2>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl"
                    >
                        <p className="text-lg text-gray-700 dark:text-gray-300 italic mb-6">
                            "FundLab helped me find 12 relevant angels in one afternoon. I closed my pre-seed in 3 weeks."
                        </p>
                        <div className="font-bold text-gray-900 dark:text-white">— María S., SaaS Founder</div>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl"
                    >
                        <p className="text-lg text-gray-700 dark:text-gray-300 italic mb-6">
                            "The AI-generated messages actually got responses. 40% reply rate vs. my usual 5%."
                        </p>
                        <div className="font-bold text-gray-900 dark:text-white">— David L., Fintech Startup</div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto text-center">
                    <div>
                        <div className="text-4xl font-bold text-indigo-600 mb-2">500+</div>
                        <div className="text-sm text-gray-500 uppercase tracking-wide">Investors Indexed</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-purple-600 mb-2">3 Mins</div>
                        <div className="text-sm text-gray-500 uppercase tracking-wide">Avg Search Time</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-pink-600 mb-2">85%</div>
                        <div className="text-sm text-gray-500 uppercase tracking-wide">Match Relevance</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
