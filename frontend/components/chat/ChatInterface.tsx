'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, PenSquare, Search, AlertCircle, Zap, TrendingUp, Users, Building2 } from 'lucide-react';
import SearchToggle from './SearchToggle';
import InvestorCard from './InvestorCard';
import MessageModal from './MessageModal';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';

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

        try {
            const userId = '00000000-0000-0000-0000-000000000000';
            const res = await fetch('/api/search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query, mode, userId }),
            });

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
                        className="w-20 h-20 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-3xl flex items-center justify-center mb-8 shadow-inner border border-white/10 ring-1 ring-black/5 dark:ring-white/10 backdrop-blur-3xl"
                    >
                        <Sparkles className="w-10 h-10 text-primary" />
                    </motion.div>
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight"
                    >
                        How can I help you <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">fundraise today?</span>
                    </motion.h1>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-lg text-muted-foreground max-w-lg leading-relaxed mb-10"
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
                                        className="flex items-center gap-3 px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-300 text-left group"
                                    >
                                        <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                                            <suggestion.icon className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">{suggestion.text}</p>
                                            <p className="text-xs text-muted-foreground">{suggestion.category}</p>
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
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="glass-premium px-6 py-5 rounded-2xl rounded-tl-md w-full max-w-md"
                                    >
                                        <div className="flex items-center gap-4 mb-4">
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full shrink-0"
                                            />
                                            <span className="font-medium text-foreground">Searching investors...</span>
                                        </div>
                                        <div className="space-y-2">
                                            {[
                                                { text: "Analyzing your query with AI", delay: 0 },
                                                { text: "Scanning 500,000+ investor profiles", delay: 0.5 },
                                                { text: "Calculating match scores", delay: 1 }
                                            ].map((step, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: step.delay }}
                                                    className="flex items-center gap-2 text-sm text-muted-foreground"
                                                >
                                                    <motion.div
                                                        animate={{ scale: [1, 1.2, 1] }}
                                                        transition={{ duration: 0.5, repeat: Infinity, delay: step.delay }}
                                                        className="w-1.5 h-1.5 rounded-full bg-primary/50"
                                                    />
                                                    {step.text}
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                ) : error ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="glass-premium px-6 py-5 rounded-2xl rounded-tl-md border border-red-500/20"
                                    >
                                        <div className="flex items-center gap-3 text-red-400 mb-2">
                                            <AlertCircle className="w-5 h-5" />
                                            <span className="font-medium">Search Error</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-4">{error}</p>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => { setHasSearched(false); setError(null); }}
                                            className="text-sm"
                                        >
                                            Try Again
                                        </Button>
                                    </motion.div>
                                ) : results.length > 0 ? (
                                    <>
                                        <div className="prose prose-lg dark:prose-invert max-w-none glass-premium px-8 py-6 rounded-2xl rounded-tl-md mb-8">
                                            <p className="text-foreground m-0 font-body">
                                                I found <strong className="text-primary">{results.length} {mode}</strong> matching your search.
                                                {keywords?.categoryKeywords?.length > 0 && (
                                                    <> I expanded your query to include terms like: <em className="text-muted-foreground">{keywords?.categoryKeywords?.slice(0, 5).join(', ')}</em>.</>
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
                                                    investor={result.angel || result.fund}
                                                    type={mode === 'angels' ? 'angel' : 'fund'}
                                                    score={result.score}
                                                    breakdown={result.breakdown}
                                                    onDraftMessage={openModal}
                                                    onSave={async (inv) => {
                                                        // Mock userId - In real app, get from context/auth
                                                        const userId = '00000000-0000-0000-0000-000000000000';
                                                        try {
                                                            await supabase.from('saved_investors').insert({
                                                                user_id: userId,
                                                                investor_id: inv.id,
                                                                type: mode === 'angels' ? 'angel' : 'fund',
                                                                saved_at: new Date().toISOString()
                                                            });
                                                            // Optional: Show toast
                                                            console.log('Saved!', inv.name || inv.fullName);
                                                        } catch (err) {
                                                            console.error('Error saving:', err);
                                                        }
                                                    }}
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
                                onChange={handleInputChange}
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
