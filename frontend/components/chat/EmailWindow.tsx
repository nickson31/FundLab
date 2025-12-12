'use client';

import { useState, useEffect } from 'react';
import { X, Minus, Maximize2, Copy, Check, Mail, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface EmailWindowProps {
    isOpen: boolean;
    isMinimized: boolean;
    onClose: () => void;
    onMinimize: () => void;
    onMaximize: () => void;
    email: string | null;
    name: string;
}

export default function EmailWindow({
    isOpen,
    isMinimized,
    onClose,
    onMinimize,
    onMaximize,
    email,
    name
}: EmailWindowProps) {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!isOpen) setCopied(false);
    }, [isOpen]);

    const handleCopy = () => {
        if (email) {
            navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        height: isMinimized ? 'auto' : 'auto',
                        width: isMinimized ? 'auto' : '320px'
                    }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className={cn(
                        "fixed z-[100] shadow-2xl border border-indigo-100 dark:border-white/10 bg-white dark:bg-zinc-900 overflow-hidden transition-all duration-300",
                        isMinimized
                            ? "bottom-4 right-4 rounded-full"
                            : "bottom-4 right-4 rounded-2xl"
                    )}
                >
                    {/* Header */}
                    <div className={cn(
                        "flex items-center justify-between bg-indigo-600 px-4 py-3 text-white transition-all",
                        isMinimized ? "gap-4 pl-4 pr-2" : ""
                    )}>
                        <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            <span className="font-bold text-sm truncate max-w-[150px]">
                                {isMinimized ? "Email" : `Reach out to ${name}`}
                            </span>
                        </div>

                        <div className="flex items-center gap-1">
                            {isMinimized ? (
                                <button onClick={onMaximize} className="p-1 hover:bg-white/20 rounded-md transition-colors">
                                    <Maximize2 className="w-3.5 h-3.5" />
                                </button>
                            ) : (
                                <button onClick={onMinimize} className="p-1 hover:bg-white/20 rounded-md transition-colors">
                                    <Minus className="w-4 h-4" />
                                </button>
                            )}
                            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-md transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Body (Hidden if minimized) */}
                    {!isMinimized && (
                        <div className="p-5 space-y-4 bg-white dark:bg-zinc-900">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                                <div className="flex items-center gap-2 bg-slate-50 dark:bg-white/5 p-2 rounded-lg border border-slate-100 dark:border-white/10">
                                    <code className="text-sm font-mono text-indigo-900 dark:text-indigo-200 truncate flex-1 block">
                                        {email || "No email available"}
                                    </code>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-8 w-8 hover:bg-indigo-50 dark:hover:bg-indigo-500/20"
                                        onClick={handleCopy}
                                    >
                                        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-slate-400" />}
                                    </Button>
                                </div>
                            </div>

                            <div className="pt-4 grid grid-cols-3 gap-2">
                                <Button variant="outline" className="w-full border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 text-indigo-900 dark:text-indigo-200 file:font-medium">
                                    Gmail
                                </Button>
                                <Button variant="outline" className="w-full border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 text-indigo-900 dark:text-indigo-200 font-medium">
                                    Yahoo
                                </Button>
                                <Button variant="outline" className="w-full border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 text-indigo-900 dark:text-indigo-200 font-medium">
                                    Outlook
                                </Button>
                            </div>
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
