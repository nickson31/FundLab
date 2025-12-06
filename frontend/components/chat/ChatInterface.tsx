'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Paperclip, Sparkles, PenSquare } from 'lucide-react';
import SearchToggle from './SearchToggle';
import InvestorCard from './InvestorCard';
import MessageModal from './MessageModal';

export default function ChatInterface() {
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
        setResults([]); // Clear previous results

        try {
            // Mock userId for MVP
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

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 h-full flex flex-col">
            {/* Header / Welcome */}
            {!hasSearched && (
                <div className="flex-1 flex flex-col items-center justify-center text-center mb-12">
                    <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 text-indigo-600">
                        <Sparkles className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        How can I help you fundraise today?
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md">
                        Find the perfect investors for your startup using AI-powered matching.
                    </p>
                </div>
            )}

            {/* Results Stream */}
            {hasSearched && (
                <div className="flex-1 overflow-y-auto pb-32 space-y-8">
                    {/* User Query Bubble */}
                    <div className="flex justify-end">
                        <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-6 py-3 rounded-2xl rounded-tr-sm max-w-[80%]">
                            {query}
                        </div>
                    </div>

                    {/* AI Response */}
                    <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white shrink-0 mt-1">
                                <Sparkles className="w-4 h-4" />
                            </div>
                            <div className="space-y-4 w-full">
                                {isLoading ? (
                                    <div className="flex items-center space-x-2 text-gray-500">
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full"
                                        />
                                        <span>Analyzing 500+ investor profiles...</span>
                                    </div>
                                ) : (
                                    <>
                                        <div className="prose dark:prose-invert max-w-none">
                                            <p>
                                                I found <strong>{results.length} {mode === 'angels' ? 'angels' : 'funds'}</strong> matching your search.
                                                I expanded your query to include terms like: <em>{keywords?.categoryKeywords?.slice(0, 5).join(', ')}</em>.
                                            </p>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            {results.map((result: any, index: number) => (
                                                <InvestorCard
                                                    key={index}
                                                    investor={result.angel || result.fund}
                                                    type={mode === 'angels' ? 'angel' : 'fund'}
                                                    score={result.score}
                                                    breakdown={result.breakdown}
                                                    onDraftMessage={openModal}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
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
                className="fixed bottom-24 right-8 bg-gray-900 dark:bg-white text-white dark:text-gray-900 p-4 rounded-full shadow-lg z-40 flex items-center justify-center hover:shadow-xl transition-shadow"
            >
                <PenSquare className="w-6 h-6" />
            </motion.button>

            <MessageModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                preSelectedInvestor={selectedInvestor}
            />

            {/* Input Area */}
            <div className={`fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 p-4 transition-all duration-300 ${hasSearched ? 'ml-[60px]' : ''}`}>
                <div className="max-w-3xl mx-auto">
                    <SearchToggle mode={mode} setMode={setMode} />

                    <form onSubmit={handleSearch} className="relative">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={`Search for ${mode}... (e.g., 'Fintech seed investors in Spain')`}
                            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl py-4 pl-6 pr-14 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                        />
                        <button
                            type="submit"
                            disabled={!query.trim() || isLoading}
                            className="absolute right-3 top-3 p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </form>
                    <p className="text-center text-xs text-gray-400 mt-3">
                        FundLab can make mistakes. Consider checking important info.
                    </p>
                </div>
            </div>
        </div>
    );
}
