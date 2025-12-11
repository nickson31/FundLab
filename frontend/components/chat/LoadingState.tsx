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
            {/* Neural Radar Visual */}
            <div className="relative w-64 h-64 mb-12 flex items-center justify-center">
                {/* Expanding Radar Rings */}
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="absolute inset-0 rounded-full border border-indigo-500/20 dark:border-indigo-400/20"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 2, opacity: 0 }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.8,
                            ease: "linear"
                        }}
                    />
                ))}

                {/* Core Brain/Node */}
                <div className="relative z-10 w-24 h-24 bg-white/50 dark:bg-black/40 backdrop-blur-xl rounded-full border border-indigo-100 dark:border-indigo-500/30 flex items-center justify-center shadow-2xl shadow-indigo-500/20">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-2 border-t-2 border-r-2 border-indigo-500/50 rounded-full"
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-4 border-b-2 border-l-2 border-purple-500/50 rounded-full"
                    />
                    <BrainCircuit className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
                </div>

                {/* Orbiting Satellites */}
                {[0, 120, 240].map((deg, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-full h-full"
                        initial={{ rotate: deg }}
                        animate={{ rotate: deg + 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                        <motion.div
                            className="absolute -top-3 left-1/2 w-8 h-8 -ml-4 bg-white dark:bg-slate-900 rounded-full border border-indigo-200 dark:border-indigo-500/50 flex items-center justify-center shadow-lg"
                            animate={{ rotate: -(deg + 360) }} // Keep icon upright
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        >
                            {i === 0 ? <Globe className="w-4 h-4 text-emerald-500" /> :
                                i === 1 ? <Radio className="w-4 h-4 text-blue-500" /> :
                                    <Zap className="w-4 h-4 text-amber-500" />}
                        </motion.div>
                    </motion.div>
                ))}
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
