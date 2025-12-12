'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Sparkles, Zap, BrainCircuit, Globe, Radio } from 'lucide-react';

interface LoadingStateProps {
    searchQuery: string;
}

export default function LoadingState({ searchQuery }: LoadingStateProps) {
    const [thoughts, setThoughts] = useState<string[]>([
        "Initializing neural handshake...",
        "Connecting to global fund matrix..."
    ]);
    const [currentThoughtIndex, setCurrentThoughtIndex] = useState(0);

    // Fetch real-time thoughts from Gemini
    useEffect(() => {
        const fetchThoughts = async () => {
            try {
                const res = await fetch('/api/ui/loading-thoughts', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query: searchQuery })
                });
                const data = await res.json();
                if (data.thoughts && Array.isArray(data.thoughts)) {
                    setThoughts(prev => [...prev.slice(0, 1), ...data.thoughts]);
                }
            } catch (e) {
                console.error("Failed to fetch loading thoughts", e);
            }
        };

        if (searchQuery) fetchThoughts();
    }, [searchQuery]);

    // Cycle through thoughts
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentThoughtIndex(prev => (prev + 1) % thoughts.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [thoughts.length]);

    return (
        <div className="flex flex-col items-center justify-center py-20 w-full min-h-[400px]">
            {/* Modern Progress Bar */}
            <div className="w-full max-w-md relative mb-12">
                {/* Bar Container */}
                <div className="h-1 w-full bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-indigo-600 dark:bg-indigo-400 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                        initial={{ width: "0%" }}
                        animate={{ width: "95%" }}
                        transition={{ duration: 8, ease: "circOut" }}
                    />
                </div>

                {/* Floating Node Animation */}
                <div className="absolute top-0 left-0 w-full flex justify-center -mt-16">
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
                </div>
            </div>

            {/* Neural Stream Text */}
            <div className="relative h-12 w-full max-w-md text-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentThoughtIndex}
                        initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 flex flex-col items-center justify-center"
                    >
                        <p className="text-lg font-medium text-indigo-950 dark:text-indigo-100 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                            {thoughts[currentThoughtIndex]}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>

            <p className="mt-4 text-xs font-mono text-indigo-400/60 uppercase tracking-[0.2em] animate-pulse">
                System Active // Level 5 Intelligence
            </p>
        </div>
    );
}
