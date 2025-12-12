'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Sparkles, ChevronDown, ChevronUp, CheckCircle2, BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LoadingStateProps {
    searchQuery: string;
    mode?: 'angels' | 'funds';
}

export default function LoadingState({ searchQuery, mode = 'angels' }: LoadingStateProps) {
    const [thoughts, setThoughts] = useState<string[]>([]);
    const [currentThought, setCurrentThought] = useState("Initializing Gemini Agent...");
    const [isExpanded, setIsExpanded] = useState(false);

    // 8-12s Real-time Logic Simulation
    const entityName = mode === 'funds' ? 'Funds' : 'Angels';

    const script = [
        { text: "Connecting to FundLab Neural Index...", delay: 500 },
        { text: `Scanning 50,000+ ${entityName.toLowerCase()} profiles...`, delay: 2000 },
        { text: "Reading 'Investment Thesis' columns...", delay: 4000 },
        { text: "Analyzing semantic fit for '" + searchQuery + "'...", delay: 6000 },
        { text: "Gemini is rewriting static data...", delay: 8000 },
        { text: "Synthesizing 'Golden Nuggets'...", delay: 9500 },
        { text: "Finalizing match scores...", delay: 11000 },
    ];

    useEffect(() => {
        let timeouts: NodeJS.Timeout[] = [];
        setThoughts([]);
        setCurrentThought("Initializing Gemini Agent...");

        script.forEach(({ text, delay }) => {
            const t = setTimeout(() => {
                setThoughts(prev => [...prev, text]);
                setCurrentThought(text);
            }, delay);
            timeouts.push(t);
        });

        return () => timeouts.forEach(clearTimeout);
    }, [searchQuery, mode]);

    return (
        <div className="flex flex-col items-center justify-center py-10 w-full min-h-[300px]">

            {/* Main Centerpiece */}
            <div className="w-full max-w-md relative mb-8 flex flex-col items-center">

                {/* 1. Progress Bar (12s Strict) */}
                <div className="h-1.5 w-full bg-indigo-50 dark:bg-white/5 rounded-full overflow-hidden relative mb-6">
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-[length:200%_100%]"
                        initial={{ width: "0%" }}
                        animate={{
                            width: "98%",
                            backgroundPosition: ["0% 0%", "100% 0%"]
                        }}
                        transition={{
                            width: { duration: 12, ease: "easeInOut" },
                            backgroundPosition: { duration: 2, repeat: Infinity, ease: "linear" }
                        }}
                    />
                </div>

                {/* 2. Collapsible Thought Log */}
                <div className="w-full bg-white dark:bg-white/5 border border-indigo-100 dark:border-white/10 rounded-2xl overflow-hidden shadow-lg shadow-indigo-500/5 transition-all duration-500">

                    {/* Header / Minimized View */}
                    <div
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="p-3 flex items-center justify-between cursor-pointer hover:bg-indigo-50/50 dark:hover:bg-white/5 transition-colors"
                    >
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center shrink-0 border border-indigo-200 dark:border-indigo-500/30">
                                <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 animate-pulse" />
                            </div>

                            {/* Animated Ticker for Current Thought */}
                            <div className="h-5 overflow-hidden relative w-64">
                                <AnimatePresence mode="popLayout" initial={false}>
                                    <motion.div
                                        key={currentThought}
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -20, opacity: 0 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        className="text-sm font-medium text-indigo-900 dark:text-indigo-200 truncate absolute inset-0"
                                    >
                                        {currentThought}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-full text-indigo-300 hover:text-indigo-600 dark:text-indigo-400/50 dark:hover:text-indigo-300">
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </Button>
                    </div>

                    {/* Expanded History */}
                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="bg-indigo-50/30 dark:bg-black/20 border-t border-indigo-100 dark:border-white/5"
                            >
                                <div className="p-3 space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                                    {thoughts.map((thought, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ x: -10, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            className="flex items-center gap-3 text-xs text-indigo-600/70 dark:text-indigo-300/70"
                                        >
                                            <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                                            <span>{thought}</span>
                                        </motion.div>
                                    ))}
                                    {/* Spinner for active line */}
                                    <motion.div
                                        layout
                                        className="flex items-center gap-3 text-xs font-bold text-indigo-600 dark:text-indigo-400"
                                    >
                                        <div className="w-3 h-3 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin shrink-0" />
                                        <span>Reasoning...</span>
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>

            {/* Brain Icon (Visual) */}
            <div className="relative mt-8">
                <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full" />
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="relative w-12 h-12 bg-white dark:bg-black rounded-xl border border-indigo-100 dark:border-white/10 flex items-center justify-center shadow-lg hover:shadow-indigo-500/30 transition-shadow"
                >
                    <BrainCircuit className="w-6 h-6 text-indigo-500" />
                </motion.div>
            </div>

            <p className="mt-4 text-xs font-mono text-indigo-400 dark:text-indigo-300/50 uppercase tracking-[0.2em] animate-pulse">
                Gemini Intelligence Active
            </p>
        </div>
    );
}
