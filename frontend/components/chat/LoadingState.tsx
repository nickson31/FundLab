import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function LoadingState() {
    return (
        <div className="flex flex-col items-center justify-center py-12 space-y-8 animate-in fade-in duration-500">
            {/* Central Loader */}
            <div className="relative w-24 h-24">
                {/* Rings */}
                <motion.div
                    className="absolute inset-0 rounded-full border-2 border-purple-500/20"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute inset-0 rounded-full border-2 border-purple-500/20"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                />

                {/* Spinner */}
                <motion.div
                    className="absolute inset-0 rounded-full border-t-2 border-purple-500"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />

                {/* Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-purple-500 animate-pulse" />
                </div>
            </div>

            {/* Status Text Carousel */}
            <div className="h-6 overflow-hidden relative w-full text-center">
                <div className="animate-[slideUp_8s_infinite] space-y-6">
                    <p className="text-sm font-medium text-blue-700 dark:text-slate-400">Analyzing your request...</p>
                    <p className="text-sm font-medium text-blue-700 dark:text-slate-400">Scanning investor database...</p>
                    <p className="text-sm font-medium text-blue-700 dark:text-slate-400">Matching investment thesis...</p>
                    <p className="text-sm font-medium text-blue-700 dark:text-slate-400">Finding the perfect fit...</p>
                </div>
            </div>

            <style jsx>{`
                @keyframes slideUp {
                    0%, 20% { transform: translateY(0); }
                    25%, 45% { transform: translateY(-38px); } /* Approx height of line + space */
                    50%, 70% { transform: translateY(-76px); }
                    75%, 95% { transform: translateY(-114px); }
                    100% { transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
