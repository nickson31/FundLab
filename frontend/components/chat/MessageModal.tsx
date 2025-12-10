'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RefreshCw, Save, ChevronRight, Sparkles, Search } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Investor, AngelInvestor, InvestmentFund, FundEmployee } from '@/types/investor';
import { cn } from '@/lib/utils';

interface MessageModalProps {
    isOpen: boolean;
    onClose: () => void;
    preSelectedInvestor?: Investor;
}

export default function MessageModal({ isOpen, onClose, preSelectedInvestor }: MessageModalProps) {
    const [step, setStep] = useState(1);
    const [recipients, setRecipients] = useState<Investor[]>([]);
    const [selectedRecipient, setSelectedRecipient] = useState<Investor | null>(null);
    const [companyContext, setCompanyContext] = useState('');
    const [generatedMessage, setGeneratedMessage] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setStep(preSelectedInvestor ? 2 : 1);
            setSelectedRecipient(preSelectedInvestor || null);
            setCompanyContext('');
            setGeneratedMessage('');
            if (!preSelectedInvestor) {
                fetchRecipients();
            }
        }
    }, [isOpen, preSelectedInvestor]);

    const fetchRecipients = async () => {
        // Fetch saved results from search_results table
        const { data: savedResults, error } = await supabase
            .from('search_results')
            .select('matched_investor_id, matched_fund_id')
            .eq('status', 'saved')
            // .eq('user_id', ...) // In real app, filter by auth user
            .order('created_at', { ascending: false })
            .limit(50);

        if (error || !savedResults) {
            console.error('Error fetching saved results:', error);
            return;
        }

        const angelIds = savedResults
            .filter(r => r.matched_investor_id)
            .map(r => r.matched_investor_id);

        if (angelIds.length > 0) {
            const { data: angels } = await supabase
                .from('angels')
                .select('*')
                .in('id', angelIds);

            if (angels) {
                // Cast to AngelInvestor to satisfy TS, assuming DB structure matches
                setRecipients(angels as unknown as Investor[]);
            }
        }
    };

    const handleGenerate = async () => {
        if (!companyContext || !selectedRecipient) return;

        setIsGenerating(true);
        setStep(3);

        try {
            const res = await fetch('/api/message/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    investorData: selectedRecipient,
                    companyContext,
                })
            });
            const data = await res.json();
            setGeneratedMessage(data.message);
        } catch (error) {
            console.error('Generation error:', error);
            setGeneratedMessage('Error generating message. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            // Logic to update status in DB or save message draft
            // For now just close, as "Save Draft" implies local storage or DB update not fully specced
            onClose();
        } catch (error) {
            console.error('Save error:', error);
        } finally {
            setIsSaving(false);
        }
    };

    if (!isOpen) return null;

    // Helper for safe access
    const getRecipientName = (inv: Investor | null) => {
        if (!inv) return 'Investor';
        if ('fullName' in inv && inv.fullName) return inv.fullName;
        if ('name' in inv && inv.name) return inv.name;
        if ('full_name' in inv && inv.full_name) return inv.full_name;
        return 'Investor';
    };

    const recipientName = getRecipientName(selectedRecipient);
    const recipientInitial = recipientName.charAt(0).toUpperCase();

    const getRecipientHeadline = (inv: Investor | null) => {
        if (!inv) return '';
        if ('headline' in inv && inv.headline) return inv.headline;
        return '';
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 0 }}
                        className="glass-panel w-full max-w-2xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden flex flex-col max-h-[90vh] z-10 relative bg-[#0A0A0A]"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
                            <div>
                                <h2 className="text-xl font-bold text-white">
                                    {step === 1 ? 'Select Recipient' : step === 2 ? 'Provide Context' : 'Review Message'}
                                </h2>
                                <p className="text-sm text-muted-foreground mt-1">
                                    {step === 1 ? 'Who are you reaching out to?' : step === 2 ? 'Help the AI understand your pitch.' : 'Polish and send.'}
                                </p>
                            </div>
                            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-white/10 text-muted-foreground hover:text-white">
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        {/* Content */}
                        <div className="p-6 overflow-y-auto flex-1">
                            {step === 1 && (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        {recipients.map((r, idx) => (
                                            <div
                                                key={r.id || idx}
                                                onClick={() => { setSelectedRecipient(r); setStep(2); }}
                                                className="flex items-center p-3 hover:bg-white/5 rounded-xl cursor-pointer transition-colors border border-transparent hover:border-white/10 group"
                                            >
                                                <Avatar className="h-10 w-10 mr-4 border border-white/10">
                                                    <AvatarFallback className="bg-indigo-500/20 text-indigo-300 font-medium">
                                                        {getRecipientName(r).charAt(0)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-semibold text-white">{getRecipientName(r)}</div>
                                                    <div className="text-sm text-muted-foreground line-clamp-1">{getRecipientHeadline(r)}</div>
                                                </div>
                                                <ChevronRight className="ml-auto text-muted-foreground group-hover:text-indigo-400 transition-colors w-5 h-5" />
                                            </div>
                                        ))}
                                        {recipients.length === 0 && (
                                            <div className="text-center py-12">
                                                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <Search className="w-8 h-8 text-muted-foreground" />
                                                </div>
                                                <p className="text-muted-foreground">No saved investors found yet.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-6">
                                    <div className="bg-indigo-500/10 p-4 rounded-xl flex items-center border border-indigo-500/20">
                                        <Avatar className="h-10 w-10 mr-3 border border-indigo-500/20">
                                            <AvatarFallback className="bg-indigo-500/50 text-white">
                                                {recipientInitial}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="text-xs text-indigo-400 font-medium uppercase tracking-wider mb-0.5">Drafting Message To</div>
                                            <div className="font-bold text-white leading-tight">{recipientName}</div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-white mb-2 ml-1">
                                            What's the core of your pitch?
                                        </label>
                                        <textarea
                                            value={companyContext}
                                            onChange={(e) => setCompanyContext(e.target.value)}
                                            placeholder="Desribe your company, traction, and why this investor is a good fit..."
                                            className="w-full h-48 p-4 rounded-xl bg-black/20 border border-white/10 focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent resize-none outline-none text-white placeholder:text-muted-foreground/50 leading-relaxed"
                                        />
                                        <div className="flex justify-between mt-2 px-1">
                                            <span className="text-xs text-muted-foreground">Be specific about metrics.</span>
                                            <span className="text-xs text-muted-foreground">{companyContext.length} chars</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-6 h-full flex flex-col">
                                    {isGenerating ? (
                                        <div className="flex flex-col items-center justify-center py-16 space-y-6">
                                            <div className="relative">
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                                    className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <Sparkles className="w-6 h-6 text-indigo-400 animate-pulse" />
                                                </div>
                                            </div>
                                            <p className="text-muted-foreground font-medium animate-pulse">Generating personalized message...</p>
                                        </div>
                                    ) : (
                                        <div className="bg-black/20 p-6 rounded-xl border border-white/5 whitespace-pre-wrap font-sans text-white leading-relaxed flex-1 overflow-y-auto shadow-inner text-sm md:text-base">
                                            {generatedMessage}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-white/5 flex justify-between bg-white/5 items-center">
                            {step > 1 ? (
                                <Button
                                    variant="ghost"
                                    onClick={() => setStep(step - 1)}
                                    className="text-muted-foreground hover:text-white pl-0 hover:bg-transparent"
                                >
                                    Back
                                </Button>
                            ) : <div></div>}

                            <div className="flex space-x-3">
                                {step === 2 && (
                                    <Button
                                        onClick={handleGenerate}
                                        disabled={!companyContext}
                                        className="bg-indigo-600 hover:bg-indigo-500 text-white min-w-[150px] shadow-lg shadow-indigo-500/20"
                                    >
                                        Generate Draft <Sparkles className="w-4 h-4 ml-2" />
                                    </Button>
                                )}

                                {step === 3 && !isGenerating && (
                                    <>
                                        <Button variant="outline" onClick={handleGenerate} className="border-white/10 hover:bg-white/5 text-muted-foreground hover:text-white bg-transparent">
                                            <RefreshCw className="w-4 h-4 mr-2" /> Try Again
                                        </Button>
                                        <Button onClick={handleSave} disabled={isSaving} className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20">
                                            <Save className="w-4 h-4 mr-2" /> Save Draft
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

