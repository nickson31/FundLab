'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Sparkles, ChevronDown, ChevronUp, CheckCircle2, BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LoadingStateProps {
    searchQuery: string;
    mode?: 'angels' | 'funds';
}

export default function LoadingStateV2({ searchQuery, mode = 'angels' }: LoadingStateProps) {
    const [thoughts, setThoughts] = useState<string[]>([]);
    const [currentThought, setCurrentThought] = useState("Initializing Gemini Agent...");
    const [isExpanded, setIsExpanded] = useState(true); // Default expanded so user sees something happening

    // Real-time Logic Simulation
    const isFund = mode === 'funds';
    const entityName = isFund ? 'Venture Funds' : 'Angel Investors';

    const script = isFund ? [
        { text: "Connecting to FundLab Neural Index...", delay: 500 },
        { text: "Scanning 12,000+ VC Fund profiles...", delay: 1500 },
        { text: "Analyzing Investment Thesis & Check Sizes...", delay: 3500 },
        { text: `Filtering for '${searchQuery}' sector alignment...`, delay: 5500 },
        { text: "Verifying 'Active' investment status...", delay: 7500 },
        { text: "Synthesizing Portfolio synergies...", delay: 9000 },
        { text: "Structuring Rich Match Cards...", delay: 10500 },
    ] : [
        { text: "Connecting to FundLab Neural Index...", delay: 500 },
        { text: "Scanning 50,000+ Angel profiles...", delay: 1500 },
        { text: "Reading 'Investment Thesis' columns...", delay: 3500 },
        { text: `Analyzing semantic fit for '${searchQuery}'...`, delay: 5500 },
        { text: "Gemini is rewriting static data...", delay: 7500 },
        { text: "Synthesizing 'Golden Nuggets'...", delay: 9000 },
        { text: "Finalizing match scores...", delay: 10500 },
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

                {/* Brain Icon (Visual) moved to top */}
                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full" />
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="relative w-16 h-16 bg-white dark:bg-black rounded-2xl border border-indigo-100 dark:border-white/10 flex items-center justify-center shadow-lg hover:shadow-indigo-500/30 transition-shadow"
                    >
                        <BrainCircuit className="w-8 h-8 text-indigo-500" />
                    </motion.div>
                </div>

                {/* Collapsible Thought Log */}
                <div className="w-full bg-white dark:bg-white/5 border border-indigo-100 dark:border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-indigo-500/10 transition-all duration-500">

                    {/* Header / Minimized View */}
                    <div
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="p-4 flex items-center justify-between cursor-pointer hover:bg-indigo-50/50 dark:hover:bg-white/5 transition-colors group"
                    >
                        <div className="flex items-center gap-3 overflow-hidden flex-1">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center shrink-0 border border-indigo-200 dark:border-indigo-500/30">
                                <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400 animate-pulse" />
                            </div>

                            {/* Animated Ticker for Current Thought */}
                            <div className="h-6 overflow-hidden relative flex-1">
                                <AnimatePresence mode="popLayout" initial={false}>
                                    <motion.div
                                        key={currentThought}
                                        initial={{ y: 20, opacity: 0, filter: 'blur(5px)' }}
                                        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                                        exit={{ y: -20, opacity: 0, filter: 'blur(5px)' }}
                                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                        className="text-sm font-semibold text-indigo-900 dark:text-indigo-200 truncate absolute inset-0 flex items-center"
                                    >
                                        {currentThought}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full text-indigo-300 hover:text-indigo-600 dark:text-indigo-400/50 dark:hover:text-indigo-300">
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
                                className="bg-indigo-50/50 dark:bg-black/20 border-t border-indigo-100 dark:border-white/5"
                            >
                                <div className="p-4 space-y-3 max-h-48 overflow-y-auto custom-scrollbar">
                                    {thoughts.map((thought, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ x: -10, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            className="flex items-center gap-3 text-xs font-medium text-indigo-600/70 dark:text-indigo-300/70"
                                        >
                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                            <span>{thought}</span>
                                        </motion.div>
                                    ))}
                                    {/* Spinner for active line */}
                                    <motion.div
                                        layout
                                        className="flex items-center gap-3 text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-white dark:bg-white/5 p-2 rounded-lg border border-indigo-100 dark:border-white/5 shadow-sm"
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

            <p className="mt-4 text-xs font-mono text-indigo-400 dark:text-indigo-300/50 uppercase tracking-[0.2em] animate-pulse">
                Gemini 2.0 Thinking
            </p>
        </div>
    );
}
