'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, PenSquare } from 'lucide-react';
import SearchToggle from './SearchToggle';
import InvestorCard from './InvestorCard';
import MessageModal from './MessageModal';
import { Button } from '@/components/ui/button';

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
        <div className="max-w-5xl mx-auto px-4 py-8 h-full flex flex-col relative w-full">
            {/* Header / Welcome */}
            {!hasSearched && (
                <div className="flex-1 flex flex-col items-center justify-center text-center mb-12">
                    <div className="w-20 h-20 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-3xl flex items-center justify-center mb-8 shadow-inner border border-white/10 ring-1 ring-black/5 dark:ring-white/10 backdrop-blur-3xl">
                        <Sparkles className="w-10 h-10 text-primary" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
                        How can I help you <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">fundraise today?</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                        Find the perfect investors for your startup using AI-powered matching.
                        Just tell me who you're looking for.
                    </p>
                </div>
            )}

            {/* Results Stream */}
            {hasSearched && (
                <div className="flex-1 overflow-y-auto pb-40 space-y-10 w-full scrollbar-none">
                    {/* User Query Bubble */}
                    <div className="flex justify-end">
                        <div className="bg-primary/20 text-primary-foreground px-6 py-4 rounded-2xl rounded-tr-md max-w-[80%] shadow-lg border border-primary/20 backdrop-blur-md text-lg">
                            {query}
                        </div>
                    </div>

                    {/* AI Response */}
                    <div className="space-y-6">
                        <div className="flex items-start space-x-5">
                            <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white shrink-0 mt-1 shadow-lg shadow-indigo-500/30">
                                <Sparkles className="w-5 h-5" />
                            </div>
                            <div className="space-y-6 w-full">
                                {isLoading ? (
                                    <div className="flex items-center space-x-3 text-muted-foreground glass-card px-6 py-4 rounded-2xl rounded-tl-md w-fit">
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full"
                                        />
                                        <span className="font-medium">Analyzing 500+ investor profiles...</span>
                                    </div>
                                ) : (
                                    <>
                                        <div className="prose prose-lg dark:prose-invert max-w-none glass-card px-8 py-6 rounded-2xl rounded-tl-md">
                                            <p className="text-foreground m-0">
                                                I found <strong className="text-primary">{results.length} {mode}</strong> matching your search.
                                                I expanded your query to include terms like: <em className="text-muted-foreground">{keywords?.categoryKeywords?.slice(0, 5).join(', ')}</em>.
                                            </p>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
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
                className="fixed bottom-28 right-8 bg-foreground text-background p-4 rounded-full shadow-2xl z-40 flex items-center justify-center hover:shadow-black/25 dark:hover:shadow-white/10 transition-shadow"
            >
                <PenSquare className="w-6 h-6" />
            </motion.button>

            <MessageModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                preSelectedInvestor={selectedInvestor}
            />

            {/* Input Area */}
            <div className={`fixed bottom-0 left-0 right-0 p-4 transition-all duration-500 pointer-events-none z-50`}>
                <div className={`max-w-3xl mx-auto transition-all duration-500 ${hasSearched ? 'ml-[auto] md:ml-[300px]' : ''}`}>
                    <div className="glass-card rounded-3xl p-2 shadow-2xl shadow-primary/5 pointer-events-auto border-border/50">
                        <SearchToggle mode={mode} setMode={setMode} />

                        <form onSubmit={handleSearch} className="relative mt-2">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder={`Ask FundLab... (e.g., 'Fintech seed investors in Madrid')`}
                                className="w-full bg-transparent border-0 rounded-2xl py-4 pl-6 pr-16 text-lg focus:outline-none placeholder:text-muted-foreground/50 text-foreground"
                            />
                            <Button
                                type="submit"
                                size="icon"
                                disabled={!query.trim() || isLoading}
                                className="absolute right-2 top-2 h-10 w-10 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground transition-colors shadow-sm"
                            >
                                <Send className="w-5 h-5" />
                            </Button>
                        </form>
                        <div className="absolute -bottom-8 left-0 right-0 text-center">
                            <p className="text-[10px] text-muted-foreground/60">
                                FundLab AI can make mistakes. Verify important info.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
