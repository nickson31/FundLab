'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import InvestorCard from '@/components/chat/InvestorCard';
import { Search } from 'lucide-react';

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
        <div className="max-w-5xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Angel Investors</h1>
                <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Filter by name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
            </div>

            {loading ? (
                <div className="text-center py-20 text-gray-500">Loading saved angels...</div>
            ) : filteredAngels.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                    <p className="text-gray-500">No saved angels found.</p>
                    <p className="text-sm text-gray-400 mt-2">Go to Chat to search and save investors.</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    {filteredAngels.map((angel) => (
                        <InvestorCard
                            key={angel.id}
                            investor={angel}
                            type="angel"
                            score={0} // Saved list doesn't have query score context usually, or we could store it
                            breakdown={{}}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
