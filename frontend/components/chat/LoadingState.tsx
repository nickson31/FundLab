import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function LoadingState() {
    return (
        <div className="flex flex-col items-center justify-center py-20 space-y-12 animate-in fade-in duration-500">
            {/* Radar Loader */}
            <div className="relative w-32 h-32 flex items-center justify-center">
                {/* Core */}
                <div className="w-4 h-4 bg-indigo-600 rounded-full shadow-[0_0_20px_rgba(79,70,229,0.6)] z-10 animate-pulse" />

                {/* Radar Waves */}
                <motion.div
                    className="absolute inset-0 rounded-full border border-indigo-500/30 dark:border-indigo-400/20 bg-indigo-500/5"
                    animate={{ scale: [0.5, 1.5], opacity: [0.8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                />
                <motion.div
                    className="absolute inset-0 rounded-full border border-indigo-500/30 dark:border-indigo-400/20"
                    animate={{ scale: [0.5, 1.5], opacity: [0.8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
                />
                <motion.div
                    className="absolute inset-0 rounded-full border border-indigo-500/30 dark:border-indigo-400/20"
                    animate={{ scale: [0.5, 1.5], opacity: [0.8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1.2 }}
                />

                {/* Satellite Pings */}
                <motion.div
                    className="absolute w-2 h-2 bg-pink-500 rounded-full top-2 right-8 shadow-lg shadow-pink-500/50"
                    animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                />
                <motion.div
                    className="absolute w-2 h-2 bg-emerald-500 rounded-full bottom-4 left-6 shadow-lg shadow-emerald-500/50"
                    animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
                />
            </div>

            {/* Status Text Carousel */}
            <div className="h-8 overflow-hidden relative w-full text-center max-w-xs">
                <div className="animate-[slideUp_8s_infinite] space-y-8">
                    <p className="text-base font-semibold text-indigo-900 dark:text-indigo-200 tracking-wide">Initializing search radar...</p>
                    <p className="text-base font-semibold text-indigo-900 dark:text-indigo-200 tracking-wide">Scanning global network...</p>
                    <p className="text-base font-semibold text-indigo-900 dark:text-indigo-200 tracking-wide">Pinged 500+ investors...</p>
                    <p className="text-base font-semibold text-indigo-900 dark:text-indigo-200 tracking-wide">Triangulating matches...</p>
                </div>
            </div>

            <style jsx>{`
                @keyframes slideUp {
                    0%, 20% { transform: translateY(0); }
                    25%, 45% { transform: translateY(-56px); } /* height + space */
                    50%, 70% { transform: translateY(-112px); }
                    75%, 95% { transform: translateY(-168px); }
                    100% { transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
