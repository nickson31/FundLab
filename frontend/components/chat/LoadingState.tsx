'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Sparkles, BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingStateProps {
    searchQuery: string;
}

export default function LoadingState({ searchQuery }: LoadingStateProps) {
    const [thoughts, setThoughts] = useState<string[]>([
        "Initializing neural handshake...",
        "Accessing global angel database...",
        "Analyzing 50,000+ investor profiles...",
        "Reading investment thesis columns...",
        "Identifying semantic matches...",
        "Drafting personalized summaries...",
        "Finalizing relevance scores..."
    ]);
    const [currentThoughtIndex, setCurrentThoughtIndex] = useState(0);

    // Fetch real-time thoughts (optional, but we stick to the local timed sequence for smoothness)
    useEffect(() => {
        // We could fetch additional thoughts here, but for "Steps", a fixed high-quality sequence is often better
    }, [searchQuery]);

    // Cycle through thoughts slowly
    useEffect(() => {
        if (currentThoughtIndex < thoughts.length - 1) {
            const timeout = setTimeout(() => {
                setCurrentThoughtIndex(prev => prev + 1);
            }, 2000); // 2 seconds per thought = ~14 seconds total
            return () => clearTimeout(timeout);
        }
    }, [currentThoughtIndex]);

    return (
        <div className="flex flex-col items-center justify-center py-20 w-full min-h-[400px]">

            {/* Multi-Step Intelligence Loader */}
            <div className="w-full max-w-md relative mb-12 flex flex-col items-center">

                {/* Status Text */}
                <div className="h-8 mb-4">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentThoughtIndex}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="text-sm font-medium text-indigo-900 dark:text-indigo-200 flex items-center gap-2"
                        >
                            <Sparkles className="w-3 h-3 text-indigo-500 animate-pulse" />
                            {thoughts[currentThoughtIndex]}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Bar Container */}
                <div className="h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden relative">
                    {/* Animated Gradient Bar */}
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-[length:200%_100%]"
                        initial={{ width: "0%" }}
                        animate={{
                            width: `${((currentThoughtIndex + 1) / thoughts.length) * 100}%`,
                            backgroundPosition: ["0% 0%", "100% 0%"]
                        }}
                        transition={{
                            width: { duration: 2, ease: "easeInOut" },
                            backgroundPosition: { duration: 2, repeat: Infinity, ease: "linear" }
                        }}
                    />
                </div>

                {/* Step Indicators */}
                <div className="flex justify-between w-full mt-3 px-1">
                    {['Data', 'Thesis', 'Match', 'Score'].map((step, i) => (
                        <div key={i} className="flex flex-col items-center gap-1">
                            <motion.div
                                className={cn(
                                    "w-1.5 h-1.5 rounded-full transition-colors duration-500",
                                    (i * 2) <= currentThoughtIndex ? "bg-indigo-500" : "bg-slate-200 dark:bg-white/10"
                                )}
                                animate={(i * 2) <= currentThoughtIndex ? { scale: [1, 1.5, 1] } : {}}
                            />
                            <span className={cn(
                                "text-[9px] uppercase font-bold transition-colors duration-500",
                                (i * 2) <= currentThoughtIndex ? "text-indigo-500" : "text-slate-300 dark:text-slate-600"
                            )}>{step}</span>
                        </div>
                    ))}
                </div>

            </div>

            <div className="relative">
                <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full" />
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="relative w-12 h-12 bg-white dark:bg-black rounded-xl border border-indigo-100 dark:border-white/10 flex items-center justify-center shadow-lg"
                >
                    <BrainCircuit className="w-6 h-6 text-indigo-500" />
                </motion.div>
            </div>

            <p className="mt-8 text-xs font-mono text-indigo-400/60 uppercase tracking-[0.2em] animate-pulse">
                FundLab Neural Engine Active
            </p>
        </div>
    );
}
