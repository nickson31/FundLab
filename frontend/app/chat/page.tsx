'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, MessageSquare, MoreHorizontal, Search, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import InvestorCard from '@/components/chat/InvestorCard';
import FundCard from '@/components/chat/FundCard';
import MessageModal from '@/components/chat/MessageModal';
import SearchToggle from '@/components/chat/SearchToggle';
import MacShell from '@/components/layout/MacShell';
import { ModeToggle } from '@/components/mode-toggle';
import { SystemMessage } from '@/components/chat/SystemMessage';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import { generateLoadingMessages, FALLBACK_MESSAGES } from '@/lib/loadingMessages';

interface LoadingStateProps {
    userQuery: string;
}

function LoadingState({ userQuery }: LoadingStateProps) {
    const [progress, setProgress] = useState(0);
    const [msgIndex, setMsgIndex] = useState(0);
    const [messages, setMessages] = useState<string[]>(FALLBACK_MESSAGES);

    useEffect(() => {
        // Generate personalized messages based on user query
        const { messages: personalizedMessages } = generateLoadingMessages(userQuery);
        setMessages(personalizedMessages);
    }, [userQuery]);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                const next = prev + 1;
                return next > 100 ? 100 : next;
            });
        }, 100); // 10s total for 100 steps

        const msgInterval = setInterval(() => {
            setMsgIndex(prev => (prev + 1) % messages.length);
        }, 2000); // 2s per message

        return () => {
            clearInterval(interval);
            clearInterval(msgInterval);
        };
    }, [messages]);

    return (
        <div className="w-full max-w-sm space-y-3">
            <AnimatePresence mode="wait">
                <motion.div
                    key={msgIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-3 text-sm text-blue-700 dark:text-blue-400"
                >
                    <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                    <span className="min-w-[200px] font-medium">
                        {messages[msgIndex]}
                    </span>
                </motion.div>
            </AnimatePresence>
            <div className="h-1 w-full bg-blue-100 dark:bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                    style={{ width: `${progress}%` }}
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "linear", duration: 0.1 }}
                />
            </div>
        </div>
    );
}

export default function ChatPage() {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [lastQuery, setLastQuery] = useState(''); // Store query for display after clear
    const [mode, setMode] = useState<'angels' | 'funds'>('angels');
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<any[]>([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [keywords, setKeywords] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedInvestor, setSelectedInvestor] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);
    const [aiSummary, setAiSummary] = useState<string | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push('/login');
            } else {
                setUser(session.user);
            }
        };
        checkAuth();
    }, [router]);

    // Clear results when switching modes
    useEffect(() => {
        setResults([]);
        setAiSummary(null);
        setHasSearched(false);
    }, [mode]);

    const openModal = (investor?: any) => {
        setSelectedInvestor(investor);
        setIsModalOpen(true);
    };

    const handleSearch = async (e?: React.FormEvent) => {
        e?.preventDefault();
        const currentQuery = query.trim();
        if (!currentQuery) return;

        // Ensure user is authenticated
        if (!user) {
            router.push('/login');
            return;
        }

        // 1. UI Update Immediately
        setLastQuery(currentQuery);
        setQuery(''); // Clear input
        setIsLoading(true);
        setHasSearched(true);
        setResults([]);
        setAiSummary(null);
        setError(null);

        // 2. Artificial Delay + Background Fetch
        const minDelay = 10000; // 10 seconds exactly
        const startTime = Date.now();

        try {
            const fetchPromise = fetch('/api/search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: currentQuery, mode, userId: user.id }),
            }).then(res => res.json());

            const delayPromise = new Promise(resolve => setTimeout(resolve, minDelay));

            // Wait for both
            const [data] = await Promise.all([fetchPromise, delayPromise]);

            if (data.results) {
                setResults(data.results);
                setKeywords(data.keywords);
                setAiSummary(data.summary || null);
            }
        } catch (error) {
            console.error('Search error:', error);
            setError("I couldn't connect to the investor database. Please try again.");
            setResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Right Panel Content (Investor Cards)
    const RightPanel = (
        <>
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-black/10 select-none">
                <span className="text-sm font-medium text-gray-900 dark:text-white tracking-tight">Matches</span>
                {!isLoading && (
                    <span className="text-xs bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full animate-in fade-in zoom-in">{results.length}</span>
                )}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-white/10 scrollbar-track-transparent">
                {results.length === 0 && !isLoading ? (
                    <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 space-y-3 opacity-50">
                        <Search className="w-8 h-8" />
                        <p className="text-sm px-8">Search results will appear here</p>
                    </div>
                ) : (
                    <AnimatePresence>
                        {results.map((result: any, index: number) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                {mode === 'angels' ? (
                                    <InvestorCard
                                        investor={result.investor}
                                        type="angel"
                                        score={result.score}
                                        breakdown={result.breakdown}
                                        onDraftMessage={openModal}
                                    />
                                ) : (
                                    <FundCard
                                        fund={result.investor}
                                        score={result.score}
                                        breakdown={result.breakdown}
                                        onDraftMessage={openModal}
                                    />
                                )}
                            </motion.div>
                        ))}
                        {isLoading && (
                            [1, 2, 3].map(i => (
                                <div key={i} className="h-40 rounded-xl bg-gray-100 dark:bg-white/5 animate-pulse border border-transparent dark:border-white/5" />
                            ))
                        )}
                    </AnimatePresence>
                )}
            </div>
        </>
    );



    // ... existing code ...

    return (
        <MacShell sidePanel={RightPanel}>
            {/* Channel Header */}
            <div className="flex items-center justify-between border-b border-border/40 px-6 py-4 bg-background/50 backdrop-blur-md sticky top-0 z-20 select-none">
                <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-muted-foreground" />
                    <h1 className="text-lg font-medium tracking-tight text-foreground">Fundraising Assistant</h1>
                    <span className="text-[10px] rounded-full border border-green-500/20 bg-green-500/10 px-2 py-0.5 text-green-600 dark:text-green-400 uppercase tracking-wide">Beta</span>
                </div>
                <div className="flex items-center gap-2">
                    <SearchToggle mode={mode} setMode={setMode} />
                    <ModeToggle />
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-0 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-white/10 scrollbar-track-transparent">
                {!hasSearched ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-6 opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]">
                        <div className="w-24 h-24 rounded-3xl bg-indigo-50/50 dark:bg-indigo-500/10 flex items-center justify-center border border-indigo-100 dark:border-white/5 shadow-xl backdrop-blur-xl">
                            <Sparkles className="w-10 h-10 text-indigo-500 dark:text-indigo-400 animate-pulse" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-3xl font-medium text-foreground tracking-tight">How can I help you fundraise?</h2>
                            <p className="text-muted-foreground max-w-md mx-auto">Use AI to search through 500k+ investor profiles and find your perfect match.</p>
                        </div>

                        {/* Suggestions */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="grid grid-cols-2 gap-3 w-full max-w-md"
                            >
                                {['Seed Investors in London', 'Fintech VCs', 'Impact Funds', 'Angel Networks'].map((suggestion) => (
                                    <button
                                        key={suggestion}
                                        onClick={() => {
                                            setQuery(suggestion);
                                        }}
                                        className="p-4 rounded-xl bg-white/50 dark:bg-white/10 border border-gray-200 dark:border-white/10 text-sm font-medium text-foreground hover:bg-white dark:hover:bg-white/20 hover:border-indigo-500/50 transition-all text-left group shadow-sm hover:shadow-md"
                                    >
                                        <span className="group-hover:translate-x-1 transition-transform inline-block">{suggestion}</span>
                                    </button>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                ) : (
                    <div className="p-6 space-y-8">
                        {/* User Query - Use lastQuery here */}
                        <motion.div
                            initial={{ opacity: 0, x: 50, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className="flex justify-end"
                        >
                            <div className="bg-indigo-600 text-white px-5 py-3 rounded-2xl rounded-tr-sm shadow-lg max-w-[80%] text-base leading-relaxed">
                                {lastQuery}
                            </div>
                        </motion.div>

                        {/* AI Response */}
                        {isLoading ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ type: "spring", stiffness: 150, damping: 15 }}
                                className="flex items-start gap-4"
                            >
                                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-lg bg-indigo-600 shadow-indigo-500/20">
                                    <Sparkles className="w-4 h-4 text-white animate-pulse" />
                                </div>
                                <div className="space-y-4 flex-1">
                                    <div className="bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-2xl rounded-tl-sm p-6 w-full max-w-md">
                                        <div className="w-full max-w-sm space-y-3">
                                            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                                                <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                                                <span className="animate-[fadeIn_0.5s_ease-out] min-w-[200px]">
                                                    Scanning matches...
                                                </span>
                                            </div>
                                            <div className="h-1 w-full bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    className="h-full bg-indigo-500"
                                                    initial={{ width: "0%" }}
                                                    animate={{ width: "100%" }}
                                                    transition={{ ease: "linear", duration: 2 }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ) : error ? (
                            <div className="flex items-start gap-4 animate-[fadeIn_0.5s_ease-out_forwards]">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-lg bg-red-500 shadow-red-500/20">
                                    <Sparkles className="w-4 h-4 text-white" />
                                </div>
                                <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-2xl rounded-tl-sm p-5 text-red-600 dark:text-red-200 text-base leading-relaxed">
                                    {error}
                                </div>
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                <SystemMessage
                                    content={aiSummary || `I found ${results.length} matches for "${lastQuery}".`}
                                    isLoading={isLoading}
                                />
                            </motion.div>
                        )}
                    </div>
                )}
            </div>

            {/* Footer Composer */}
            <div className="p-6 bg-gradient-to-t from-white/80 via-white/50 to-transparent dark:from-black/40 dark:via-black/20 dark:to-transparent">
                <form onSubmit={handleSearch} className="relative">
                    {/* Prompt Suggestions */}
                    {!query && (
                        <div className="absolute bottom-full left-0 mb-4 px-2 w-full flex gap-2 overflow-x-auto no-scrollbar mask-fade">
                            {[
                                "Find deeptech VCs in London",
                                "Seed funds for B2B SaaS",
                                "Angels in Fintech & AI"
                            ].map((suggestion, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => setQuery(suggestion)}
                                    className="whitespace-nowrap px-3 py-1.5 rounded-full bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-white/10 transition-colors backdrop-blur-sm shadow-sm"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="relative flex items-center bg-white dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-white/10 px-4 py-3 gap-3 shadow-lg dark:shadow-none">
                        <Button size="icon" variant="ghost" className="text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 rounded-xl" type="button">
                            <MoreHorizontal className="w-5 h-5" />
                        </Button>
                        <input
                            className="flex-1 bg-transparent border-none focus:ring-0 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-base py-2"
                            placeholder="Ask FundLab to find investors..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <Button
                            type="submit"
                            disabled={!query.trim() || isLoading}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl px-4 py-2 shadow-lg shadow-indigo-500/20 transition-all"
                        >
                            <Send className="w-4 h-4 mr-2" />
                            <span>Send</span>
                        </Button>
                    </div>
                </form>
                <p className="text-center text-[10px] text-gray-500 dark:text-gray-600 mt-3">FundLab AI can make mistakes. Verify important info.</p>
            </div>

            <MessageModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                preSelectedInvestor={selectedInvestor}
                currentUserId={user?.id}
            />
        </MacShell>
    );
}

