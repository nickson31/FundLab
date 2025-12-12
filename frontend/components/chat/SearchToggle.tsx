'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SearchToggleProps {
    mode: 'angels' | 'funds';
    setMode: (mode: 'angels' | 'funds') => void;
}

export default function SearchToggle({ mode, setMode }: SearchToggleProps) {
    return (
        <div className="flex items-center justify-center mb-8">
            <div className="bg-slate-100 dark:bg-white/5 p-1 rounded-xl inline-flex relative shadow-inner">
                <button
                    onClick={() => setMode('angels')}
                    className={cn(
                        "relative z-10 px-8 py-2.5 text-sm font-semibold transition-colors rounded-lg",
                        mode === 'angels' ? "text-indigo-600 dark:text-white" : "text-slate-500 dark:text-muted-foreground hover:text-indigo-600 dark:hover:text-white"
                    )}
                >
                    Angels
                </button>
                <button
                    onClick={() => setMode('funds')}
                    className={cn(
                        "relative z-10 px-8 py-2.5 text-sm font-semibold transition-colors rounded-lg",
                        mode === 'funds' ? "text-indigo-600 dark:text-white" : "text-slate-500 dark:text-muted-foreground hover:text-indigo-600 dark:hover:text-white"
                    )}
                >
                    Funds
                </button>

                <motion.div
                    className="absolute top-1 bottom-1 bg-white dark:bg-white/10 rounded-lg shadow-sm border border-slate-200 dark:border-white/5"
                    initial={false}
                    animate={{
                        left: mode === 'angels' ? '4px' : '50%',
                        width: 'calc(50% - 4px)',
                        x: mode === 'angels' ? 0 : 0
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            </div>
        </div>
    );
}
