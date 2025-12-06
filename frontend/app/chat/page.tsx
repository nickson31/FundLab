'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, MessageSquare, MoreHorizontal, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import InvestorCard from '@/components/chat/InvestorCard';
import MessageModal from '@/components/chat/MessageModal';
import SearchToggle from '@/components/chat/SearchToggle';
import MacShell from '@/components/layout/MacShell';

export default function ChatPage() {
    const [query, setQuery] = useState('');
    const [mode, setMode] = useState<'angels' | 'funds'>('angels');
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<any[]>([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [keywords, setKeywords] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedInvestor, setSelectedInvestor] = useState<any>(null);

    const openModal = (investor?: any) => {
        setSelectedInvestor(investor);
        setIsModalOpen(true);
    };

    const handleSearch = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!query.trim()) return;

        setIsLoading(true);
        setHasSearched(true);
        setResults([]);

        try {
            const userId = '00000000-0000-0000-0000-000000000000';
            const res = await fetch('/api/search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query, mode, userId }),
            });

            const data = await res.json();
            if (data.results) {
                setResults(data.results);
                setKeywords(data.keywords);
            }
        } catch (error) {
            console.error('Search error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Right Panel Content (Investor Cards)
    const RightPanel = (
        <>
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-black/10 select-none">
                <span className="text-sm font-medium text-white tracking-tight">Matches</span>
                <span className="text-xs bg-white/10 text-gray-400 px-2 py-0.5 rounded-full">{results.length}</span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {results.length === 0 && !isLoading ? (
                    <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 space-y-3 opacity-50">
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
                                <InvestorCard
                                    investor={result.angel || result.fund}
                                    type={mode === 'angels' ? 'angel' : 'fund'}
                                    score={result.score}
                                    breakdown={result.breakdown}
                                    onDraftMessage={openModal}
                                />
                            </motion.div>
                        ))}
                        {isLoading && (
                            [1, 2, 3].map(i => (
                                <div key={i} className="h-40 rounded-xl bg-white/5 animate-pulse border border-white/5" />
                            ))
                        )}
                    </AnimatePresence>
                )}
            </div>
        </>
    );

    return (
        <MacShell sidePanel={RightPanel}>
            {/* Channel Header */}
            <div className="flex items-center justify-between border-b border-white/5 px-6 py-4 bg-black/10 backdrop-blur-md sticky top-0 z-20 select-none">
                <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-gray-400" />
                    <h1 className="text-lg font-medium tracking-tight text-white">Fundraising Assistant</h1>
                    <span className="text-[10px] rounded-full border border-green-500/20 bg-green-500/10 px-2 py-0.5 text-green-400 uppercase tracking-wide">Beta</span>
                </div>
                <SearchToggle mode={mode} setMode={setMode} />
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-0 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {!hasSearched ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-6 opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]">
                        <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 flex items-center justify-center border border-white/5 shadow-2xl backdrop-blur-xl">
                            <Sparkles className="w-10 h-10 text-indigo-400 animate-pulse" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-3xl font-medium text-white tracking-tight">How can I help you fundraise?</h2>
                            <p className="text-gray-400 max-w-md mx-auto">Use AI to search through 500k+ investor profiles and find your perfect match.</p>
                        </div>

                        {/* Suggestions - Hide when user is writing (query has length) */}
                        <AnimatePresence mode="wait">
                            {query.length === 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10, transition: { duration: 0.1 } }}
                                    className="grid grid-cols-2 gap-3 w-full max-w-md"
                                >
                                    {['Seed Investors in London', 'Fintech VCs', 'Impact Funds', 'Angel Networks'].map((suggestion) => (
                                        <button
                                            key={suggestion}
                                            onClick={() => { setQuery(suggestion); /* trigger search logic if needed */ }}
                                            className="p-4 rounded-xl bg-white/10 border border-white/10 text-sm font-medium text-white hover:bg-white/20 hover:border-indigo-500/50 transition-all text-left group shadow-lg shadow-black/20"
                                        >
                                            <span className="group-hover:translate-x-1 transition-transform inline-block">{suggestion}</span>
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ) : (
                    <div className="p-6 space-y-8">
                        {/* User Query */}
                        <div className="flex justify-end animate-[slideInRight_0.3s_ease-out]">
                            <div className="bg-indigo-600 text-white px-5 py-3 rounded-2xl rounded-tr-sm shadow-lg max-w-[80%] text-base leading-relaxed">
                                {query}
                            </div>
                        </div>

                        {/* AI Response */}
                        <div className="flex items-start gap-4 animate-[fadeIn_0.5s_ease-out_0.2s_forwards] opacity-0">
                            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center shrink-0 mt-1 shadow-lg shadow-indigo-500/20">
                                <Sparkles className="w-4 h-4 text-white" />
                            </div>
                            <div className="space-y-4 flex-1">
                                {isLoading ? (
                                    <div className="flex items-center space-x-3 text-gray-400 bg-white/5 px-4 py-3 rounded-2xl rounded-tl-sm w-fit border border-white/5">
                                        <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                                        <span className="text-sm">Analyzing market data...</span>
                                    </div>
                                ) : (
                                    <div className="prose prose-invert max-w-none">
                                        <div className="bg-white/5 border border-white/5 rounded-2xl rounded-tl-sm p-5 text-gray-300 text-base leading-relaxed shadow-sm">
                                            <p className="m-0">
                                                I found <strong className="text-white">{results.length} {mode}</strong> matching your criteria.
                                                {keywords?.categoryKeywords && (
                                                    <> I also looked for terms like: <span className="text-indigo-300 italic">{keywords.categoryKeywords.slice(0, 4).join(', ')}</span>.</>
                                                )}
                                                <br /><br />
                                                View the matches in the panel to the right.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer Composer */}
            <div className="p-6 bg-gradient-to-t from-black/40 to-transparent">
                <form onSubmit={handleSearch} className="relative">
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10" />
                    <div className="relative flex items-center px-4 py-3 gap-3">
                        <Button size="icon" variant="ghost" className="text-gray-400 hover:text-white hover:bg-white/10 rounded-xl" type="button">
                            <MoreHorizontal className="w-5 h-5" />
                        </Button>
                        <input
                            className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 text-base py-2"
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
                <p className="text-center text-[10px] text-gray-600 mt-3">FundLab AI can make mistakes. Verify important info.</p>
            </div>

            <MessageModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                preSelectedInvestor={selectedInvestor}
            />
        </MacShell>
    );
}
