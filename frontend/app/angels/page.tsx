'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import InvestorCard from '@/components/chat/InvestorCard';
import { Search, Sparkles, FolderOpen, ArrowRight } from 'lucide-react';
import MacShell from '@/components/layout/MacShell';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AngelsPage() {
    const [angels, setAngels] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const fetchAngels = useCallback(async () => {
        // Mock userId for MVP
        const userId = '00000000-0000-0000-0000-000000000000';

        // 1. Get saved angel IDs
        const { data: saved } = await supabase
            .from('saved_investors')
            .select('investor_id')
            .eq('user_id', userId)
            .eq('type', 'angel');

        if (!saved || saved.length === 0) {
            setLoading(false);
            setAngels([]);
            return;
        }

        const ids = saved.map(s => s.investor_id);

        // 2. Get angel details
        const { data: angelDetails } = await supabase
            .from('angels')
            .select('*')
            .in('id', ids);

        if (angelDetails) {
            setAngels(angelDetails.map(a => ({ ...a.data, id: a.id })));
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchAngels();
    }, [fetchAngels]);

    const handleUnsave = async (investor: any) => {
        const userId = '00000000-0000-0000-0000-000000000000';

        // Optimistic update
        setAngels(prev => prev.filter(a => a.id !== investor.id));

        const { error } = await supabase
            .from('saved_investors')
            .delete()
            .eq('user_id', userId)
            .eq('investor_id', investor.id);

        if (error) {
            console.error('Error removing investor:', error);
            // Revert if error (optional, for MVP optimisic is fine usually)
        }
    };

    const filteredAngels = angels.filter(a =>
        (a.fullName || '').toLowerCase().includes(search.toLowerCase()) ||
        (a.headline || '').toLowerCase().includes(search.toLowerCase())
    );

    return (
        <MacShell>
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                <div className="max-w-7xl mx-auto px-8 py-10">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4 sticky top-0 z-20 bg-[#030303]/80 backdrop-blur-xl p-4 -mx-4 rounded-b-2xl border-b border-white/5">
                        <div>
                            <h1 className="text-3xl font-bold font-heading text-white tracking-tight mb-1">Angel Investors</h1>
                            <p className="text-sm text-gray-500">Your curated list of saved angels.</p>
                        </div>

                        <div className="relative w-full md:w-80 group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                            <div className="relative bg-black rounded-xl flex items-center">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-hover:text-indigo-400 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search saved angels..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-black text-white border border-white/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500/50 placeholder-gray-600 transition-all text-sm font-medium"
                                />
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-40 gap-4">
                            <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-gray-500 text-sm animate-pulse">Loading your portfolio...</p>
                        </div>
                    ) : filteredAngels.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col items-center justify-center py-32 text-center max-w-lg mx-auto"
                        >
                            <div className="w-24 h-24 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 rounded-[2rem] flex items-center justify-center mb-8 border border-white/5 ring-1 ring-white/5">
                                <FolderOpen className="w-10 h-10 text-gray-600" strokeWidth={1} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4 font-heading">No saved angels yet.</h3>
                            <p className="text-gray-400 mb-8 leading-relaxed">
                                Use our AI Chat to find and vetting investors matches for your startup. Save them here to build your pipeline.
                            </p>
                            <Button className="rounded-full h-12 px-8 bg-white text-black hover:bg-indigo-50 font-bold" asChild>
                                <Link href="/chat">
                                    <Sparkles className="w-4 h-4 mr-2" />
                                    Find Investors
                                </Link>
                            </Button>
                        </motion.div>
                    ) : (
                        <motion.div
                            layout
                            className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 pb-20"
                        >
                            <AnimatePresence>
                                {filteredAngels.map((angel) => (
                                    <InvestorCard
                                        key={angel.id}
                                        investor={angel}
                                        type="angel"
                                        score={0} // Score not stored in flat list, or needs to be fetched
                                        breakdown={{}}
                                        isSaved={true}
                                        onSave={handleUnsave}
                                    />
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </div>
            </div>
        </MacShell>
    );
}
