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
            <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg inline-flex relative">
                <button
                    onClick={() => setMode('angels')}
                    className={cn(
                        "relative z-10 px-6 py-2 text-sm font-medium transition-colors rounded-md",
                        mode === 'angels' ? "text-gray-900 dark:text-white" : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
                    )}
                >
                    Angels
                </button>
                <button
                    onClick={() => setMode('funds')}
                    className={cn(
                        "relative z-10 px-6 py-2 text-sm font-medium transition-colors rounded-md",
                        mode === 'funds' ? "text-gray-900 dark:text-white" : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
                    )}
                >
                    Funds
                </button>

                <motion.div
                    className="absolute top-1 bottom-1 bg-white dark:bg-gray-700 rounded-md shadow-sm"
                    initial={false}
                    animate={{
                        left: mode === 'angels' ? '4px' : '50%',
                        width: 'calc(50% - 4px)',
                        x: mode === 'angels' ? 0 : 0 // Adjust if needed
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            </div>
        </div>
    );
}
