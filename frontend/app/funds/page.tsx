'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Search, ChevronDown, ChevronUp, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FundsPage() {
    const [funds, setFunds] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [expandedFundId, setExpandedFundId] = useState<string | null>(null);
    const [employees, setEmployees] = useState<Record<string, any[]>>({});

    useEffect(() => {
        async function fetchFunds() {
            const userId = '00000000-0000-0000-0000-000000000000';

            const { data: saved } = await supabase
                .from('saved_investors')
                .select('investor_id')
                .eq('user_id', userId)
                .eq('type', 'fund');

            if (!saved || saved.length === 0) {
                setLoading(false);
                return;
            }

            const ids = saved.map(s => s.investor_id);

            const { data: fundDetails } = await supabase
                .from('investment_funds')
                .select('*')
                .in('id', ids);

            if (fundDetails) {
                setFunds(fundDetails.map(f => ({ ...f.data, id: f.id })));
            }
            setLoading(false);
        }

        fetchFunds();
    }, []);

    const toggleFund = async (fundId: string, fundName: string) => {
        if (expandedFundId === fundId) {
            setExpandedFundId(null);
            return;
        }

        setExpandedFundId(fundId);

        if (!employees[fundId]) {
            // Fetch employees for this fund
            // Note: Using ILIKE on JSONB field requires specific syntax or just fetching all and filtering if small dataset
            // Or better, use the index we created: LOWER(data->>'fund_name')
            // But Supabase JS client filter on JSON property:
            const { data } = await supabase
                .from('fund_employees')
                .select('*')
                // This is tricky with JSONB in Supabase JS. 
                // We'll try textSearch or just filter client side if needed, but let's try filter
                .textSearch('data->>fund_name', `'${fundName}'`);

            // Alternative: Fetch ALL employees and filter (bad for scale, ok for MVP demo)
            // Or use the 'contains' operator if we can

            // Let's try a raw query or just simple filter if possible.
            // Actually, the best way for MVP without complex RPC is to fetch all employees (there are only ~20 in the json)
            // Wait, the json has 20 rows? Let's check.
            // If it's small, we can fetch all.

            const { data: allEmps } = await supabase.from('fund_employees').select('*');
            if (allEmps) {
                const fundEmps = allEmps
                    .map(e => ({ ...e.data, id: e.id }))
                    .filter(e => e.fund_name?.toLowerCase() === fundName.toLowerCase());

                setEmployees(prev => ({ ...prev, [fundId]: fundEmps }));
            }
        }
    };

    const filteredFunds = funds.filter(f =>
        (f.name || '').toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="max-w-5xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Investment Funds</h1>
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
                <div className="text-center py-20 text-gray-500">Loading saved funds...</div>
            ) : filteredFunds.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                    <p className="text-gray-500">No saved funds found.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredFunds.map((fund) => (
                        <div key={fund.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                            <div
                                className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors flex items-center justify-between"
                                onClick={() => toggleFund(fund.id, fund.name)}
                            >
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{fund.name}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">{fund.short_description || fund.description}</p>
                                    <div className="flex items-center space-x-4 mt-3 text-xs text-gray-500">
                                        <span>{(fund.location_identifiers || []).join(', ')}</span>
                                        {fund.contact_email && <span>• {fund.contact_email}</span>}
                                    </div>
                                </div>
                                <div className="text-gray-400">
                                    {expandedFundId === fund.id ? <ChevronUp /> : <ChevronDown />}
                                </div>
                            </div>

                            <AnimatePresence>
                                {expandedFundId === fund.id && (
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: 'auto' }}
                                        exit={{ height: 0 }}
                                        className="overflow-hidden bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700"
                                    >
                                        <div className="p-6">
                                            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">Key People</h4>
                                            {employees[fund.id]?.length > 0 ? (
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    {employees[fund.id].map(emp => (
                                                        <div key={emp.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex items-start space-x-3">
                                                            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold shrink-0">
                                                                {emp.profilePic ? <img src={emp.profilePic} className="w-full h-full rounded-full object-cover" /> : (emp.fullName || 'U')[0]}
                                                            </div>
                                                            <div>
                                                                <div className="font-bold text-gray-900 dark:text-white">{emp.fullName}</div>
                                                                <div className="text-xs text-gray-500">{emp.jobTitle}</div>
                                                                <div className="mt-2 flex space-x-2">
                                                                    <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                                                        Score: {emp.score_combinado}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-sm text-gray-500 italic">No employees found for this fund.</p>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
