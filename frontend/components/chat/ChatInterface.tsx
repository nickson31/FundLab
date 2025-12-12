'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, PenSquare, Search, AlertCircle, Zap, TrendingUp, Users, Building2 } from 'lucide-react';
import SearchToggle from './SearchToggle';
import InvestorCard from './InvestorCard';
import MessageModal from './MessageModal';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import LoadingState from './LoadingStateV2';

export default function ChatInterface() {
    const [query, setQuery] = useState('');
    const [mode, setMode] = useState<'angels' | 'funds'>('angels');
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<any[]>([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [keywords, setKeywords] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedInvestor, setSelectedInvestor] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [isTyping, setIsTyping] = useState(false);

    const openModal = (investor?: any) => {
        setSelectedInvestor(investor);
        setIsModalOpen(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        setIsTyping(e.target.value.length > 0);
    };

    const handleSearch = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!query.trim()) return;

        setIsLoading(true);
        setHasSearched(true);
        setResults([]);
        setError(null);

        // Enforce a minimum "Thinking" time of 6 seconds
        const minTimePromise = new Promise(resolve => setTimeout(resolve, 6000));

        try {
            const userId = '00000000-0000-0000-0000-000000000000';
            const [res] = await Promise.all([
                fetch('/api/search', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query, mode, userId }),
                }),
                minTimePromise
            ]);

            if (!res.ok) throw new Error('Search failed');

            const data = await res.json();
            if (data.results && data.results.length > 0) {
                setResults(data.results);
                setKeywords(data.keywords);
            } else {
                setError('No investors found matching your criteria. Try broadening your search.');
            }
        } catch (err) {
            console.error('Search error:', err);
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const searchSuggestions = [
        { icon: TrendingUp, text: "Fintech investors in Europe", category: "Fintech" },
        { icon: Zap, text: "Pre-seed angels for SaaS startups", category: "SaaS" },
        { icon: Users, text: "VCs who invested in AI last year", category: "AI" },
        { icon: Building2, text: "Climate tech seed funds", category: "Climate" }
    ];

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 h-full flex flex-col relative w-full">
            {/* Header / Welcome */}
            {!hasSearched && (
                <div className="flex-1 flex flex-col items-center justify-center text-center mb-12">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="w-20 h-20 bg-indigo-50 dark:bg-indigo-500/10 rounded-3xl flex items-center justify-center mb-8 shadow-sm dark:shadow-inner border border-indigo-100 dark:border-white/10 ring-1 ring-indigo-50 dark:ring-white/5"
                    >
                        <Sparkles className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
                    </motion.div>
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="text-4xl md:text-5xl font-bold text-indigo-950 dark:text-white mb-6 tracking-tight"
                    >
                        How can I help you <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">fundraise today?</span>
                    </motion.h1>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-lg text-indigo-900/60 dark:text-indigo-200/60 max-w-lg leading-relaxed mb-10"
                    >
                        Find the perfect investors for your startup using AI-powered matching.
                    </motion.p>

                    {/* Search Recommendations */}
                    <AnimatePresence>
                        {!isTyping && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ delay: 0.3, duration: 0.4 }}
                                className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl"
                            >
                                {searchSuggestions.map((suggestion, i) => (
                                    <motion.button
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 + i * 0.05 }}
                                        onClick={() => {
                                            setQuery(suggestion.text);
                                            setIsTyping(true);
                                        }}
                                        className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-white/[0.03] border border-indigo-100 dark:border-white/[0.08] rounded-xl hover:bg-indigo-50 dark:hover:bg-white/[0.06] hover:border-indigo-200 dark:hover:border-white/[0.15] transition-all duration-300 text-left group shadow-sm dark:shadow-none"
                                    >
                                        <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/30 transition-colors">
                                            <suggestion.icon className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-indigo-900 dark:text-indigo-100 group-hover:text-indigo-600 dark:group-hover:text-white transition-colors font-medium">{suggestion.text}</p>
                                            <p className="text-xs text-indigo-400 dark:text-indigo-300/70">{suggestion.category}</p>
                                        </div>
                                    </motion.button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}

            {/* Results Stream */}
            {hasSearched && (
                <div className="flex-1 overflow-y-auto pb-40 space-y-10 w-full scrollbar-none flex flex-col justify-start">
                    {/* User Query Bubble */}
                    <div className="flex justify-end">
                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/40 dark:to-purple-900/40 text-indigo-900 dark:text-white px-6 py-4 rounded-2xl rounded-tr-md max-w-[80%] shadow-sm border border-indigo-100 dark:border-indigo-500/30 backdrop-blur-md text-lg">
                            {query}
                        </div>
                    </div>

                    {/* AI Response */}
                    <div className="space-y-6">
                        <div className="flex items-start space-x-5">
                            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-500/20 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 mt-1 border border-indigo-200 dark:border-indigo-500/30">
                                <Sparkles className="w-5 h-5" />
                            </div>
                            <div className="space-y-6 w-full">
                                {isLoading ? (
                                    <LoadingState searchQuery={query} />
                                ) : error ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-500/50 px-6 py-5 rounded-2xl rounded-tl-md"
                                    >
                                        <div className="flex items-center gap-3 text-red-600 dark:text-red-400 mb-2">
                                            <AlertCircle className="w-5 h-5" />
                                            <span className="font-medium">Search Error</span>
                                        </div>
                                        <p className="text-sm text-red-700 dark:text-red-300 mb-4">{error}</p>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => { setHasSearched(false); setError(null); }}
                                            className="text-sm border-red-200 hover:bg-red-100 hover:text-red-700 dark:border-red-500/50 dark:hover:bg-red-900/20"
                                        >
                                            Try Again
                                        </Button>
                                    </motion.div>
                                ) : results.length > 0 ? (
                                    <>
                                        <div className="prose prose-lg dark:prose-invert max-w-none bg-white/80 dark:bg-white/5 border border-indigo-100 dark:border-white/10 px-8 py-6 rounded-2xl rounded-tl-md mb-8 shadow-sm">
                                            <p className="text-indigo-900 dark:text-indigo-200 m-0 font-body">
                                                I found <strong className="text-indigo-600 dark:text-indigo-400">{results.length} {mode}</strong> matching your search.
                                                {keywords?.categoryKeywords?.length > 0 && (
                                                    <> I expanded your query to include terms like: <em className="text-indigo-500 dark:text-indigo-300 not-italic">{keywords?.categoryKeywords?.slice(0, 5).join(', ')}</em>.</>
                                                )}
                                            </p>
                                        </div>

                                        <motion.div
                                            initial="hidden"
                                            animate="visible"
                                            variants={{
                                                visible: { transition: { staggerChildren: 0.1 } }
                                            }}
                                            className="grid md:grid-cols-2 gap-6"
                                        >
                                            {results.map((result: any, index: number) => (
                                                <InvestorCard
                                                    key={index}
                                                    investor={result.investor}
                                                    score={result.score}
                                                    breakdown={result.breakdown}
                                                    onDraftMessage={openModal}
                                                    onSave={async (inv) => { /* ... */ }}
                                                />
                                            ))}
                                        </motion.div>
                                    </>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* FAB Write Message Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openModal()}
                className="fixed bottom-28 right-8 bg-indigo-600 text-white p-4 rounded-full shadow-2xl z-40 flex items-center justify-center hover:bg-indigo-700 hover:shadow-indigo-500/20 transition-all dark:bg-white dark:text-black dark:hover:bg-indigo-50"
            >
                <PenSquare className="w-6 h-6" />
            </motion.button>

            <MessageModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                preSelectedInvestor={selectedInvestor}
                currentUserId="00000000-0000-0000-0000-000000000000" // Passing dummy ID to match prop
            />

            {/* Input Area */}
            <div className={`fixed bottom-0 left-0 right-0 p-4 transition-all duration-500 pointer-events-none z-50`}>
                <div className={`max-w-3xl mx-auto transition-all duration-500`}>
                    <div className="bg-white/80 dark:bg-[#0A0A0A]/90 backdrop-blur-xl rounded-3xl p-2 shadow-2xl shadow-indigo-500/5 dark:shadow-black/50 pointer-events-auto border border-indigo-100 dark:border-white/10 ring-1 ring-black/5 dark:ring-white/5">
                        <SearchToggle mode={mode} setMode={setMode} />

                        <form onSubmit={handleSearch} className="relative mt-2">
                            <input
                                type="text"
                                value={query}
                                onChange={handleInputChange}
                                placeholder={`Ask FundLab... (e.g., 'Fintech seed investors in Madrid')`}
                                className="w-full bg-transparent border-0 rounded-2xl py-4 pl-6 pr-16 text-lg focus:outline-none focus:ring-0 focus:border-0 !outline-none !ring-0 !border-0 !shadow-none placeholder:text-indigo-300 dark:placeholder:text-indigo-300/50 text-indigo-900 dark:text-white caret-indigo-500"
                            />
                            <Button
                                type="submit"
                                size="icon"
                                disabled={!query.trim() || isLoading}
                                className="absolute right-2 top-2 h-10 w-10 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-sm disabled:opacity-50"
                            >
                                <Send className="w-5 h-5" />
                            </Button>
                        </form>
                        <div className="absolute -bottom-8 left-0 right-0 text-center">
                            <p className="text-[10px] text-indigo-300/60 dark:text-indigo-300/50">
                                FundLab AI can make mistakes. Verify important info.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
