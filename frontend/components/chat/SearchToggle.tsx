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
            <div className="bg-white/5 p-1.5 rounded-xl inline-flex relative shadow-inner ring-1 ring-white/10">
                <button
                    onClick={() => setMode('angels')}
                    className={cn(
                        "relative z-10 px-8 py-2.5 text-sm font-semibold transition-colors rounded-lg",
                        mode === 'angels' ? "text-white" : "text-muted-foreground hover:text-white"
                    )}
                >
                    Angels
                </button>
                <button
                    onClick={() => setMode('funds')}
                    className={cn(
                        "relative z-10 px-8 py-2.5 text-sm font-semibold transition-colors rounded-lg",
                        mode === 'funds' ? "text-white" : "text-muted-foreground hover:text-white"
                    )}
                >
                    Funds
                </button>

                <motion.div
                    className="absolute top-1.5 bottom-1.5 bg-white/10 rounded-lg shadow-sm border border-white/5"
                    initial={false}
                    animate={{
                        left: mode === 'angels' ? '6px' : '50%',
                        width: 'calc(50% - 6px)',
                        x: mode === 'angels' ? 0 : 0
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            </div>
        </div>
    );
}
