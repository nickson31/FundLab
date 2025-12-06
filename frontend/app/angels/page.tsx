'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import InvestorCard from '@/components/chat/InvestorCard';
import { Search } from 'lucide-react';
import MacShell from '@/components/layout/MacShell';

export default function AngelsPage() {
    const [angels, setAngels] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        async function fetchAngels() {
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
                return;
            }

            const ids = saved.map(s => s.investor_id);

            // 2. Get angel details
            const { data: angelDetails } = await supabase
                .from('angel_investors')
                .select('*')
                .in('id', ids);

            if (angelDetails) {
                setAngels(angelDetails.map(a => ({ ...a.data, id: a.id })));
            }
            setLoading(false);
        }

        fetchAngels();
    }, []);

    const filteredAngels = angels.filter(a =>
        (a.fullName || '').toLowerCase().includes(search.toLowerCase()) ||
        (a.headline || '').toLowerCase().includes(search.toLowerCase())
    );

    return (
        <MacShell>
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="flex items-center justify-between mb-8 sticky top-0 bg-black/40 backdrop-blur-xl p-4 -mx-4 rounded-xl border border-white/5 z-10">
                        <h1 className="text-2xl font-medium text-white tracking-tight">Angel Investors</h1>
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Filter by name..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-black/20 text-white border border-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder-gray-600 transition-all text-sm"
                            />
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center py-20 text-gray-500">Loading saved angels...</div>
                    ) : filteredAngels.length === 0 ? (
                        <div className="text-center py-20 glass-panel rounded-xl border border-dashed border-white/10">
                            <p className="text-gray-400">No saved angels found.</p>
                            <p className="text-sm text-gray-600 mt-2">Go to Chat to search and save investors.</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                            {filteredAngels.map((angel) => (
                                <InvestorCard
                                    key={angel.id}
                                    investor={angel}
                                    type="angel"
                                    score={0}
                                    breakdown={{}}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </MacShell>
    );
}
