'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RefreshCw, Save, ChevronRight, Sparkles, Search, Linkedin, Mail, Check, Copy } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Investor, AngelInvestor, InvestmentFund, FundEmployee } from '@/types/investor';
import { cn } from '@/lib/utils';

interface MessageModalProps {
    isOpen: boolean;
    onClose: () => void;
    preSelectedInvestor?: Investor;
    currentUserId?: string;
}

export default function MessageModal({ isOpen, onClose, preSelectedInvestor, currentUserId }: MessageModalProps) {
    const [step, setStep] = useState(1);
    const [recipients, setRecipients] = useState<Investor[]>([]);
    const [selectedRecipient, setSelectedRecipient] = useState<Investor | null>(null);
    const [companyContext, setCompanyContext] = useState('');
    const [generatedMessage, setGeneratedMessage] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [messageType, setMessageType] = useState<'linkedin' | 'email'>('linkedin');

    useEffect(() => {
        if (isOpen) {
            setStep(preSelectedInvestor ? 2 : 1);
            setSelectedRecipient(preSelectedInvestor || null);
            setCompanyContext('');
            setGeneratedMessage('');
            if (!preSelectedInvestor && currentUserId) {
                fetchRecipients();
            }
        }
    }, [isOpen, preSelectedInvestor, currentUserId]);

    const fetchRecipients = async () => {
        if (!currentUserId) return;

        // Fetch saved results from search_results table
        const { data: savedResults, error } = await supabase
            .from('search_results')
            .select('matched_angel_id, matched_fund_id')
            .eq('status', 'saved')
            .eq('user_id', currentUserId)
            .order('created_at', { ascending: false })
            .limit(50);

        if (error || !savedResults) {
            console.error('Error fetching saved results:', error);
            return;
        }

        const angelIds = savedResults
            .filter(r => r.matched_angel_id)
            .map(r => r.matched_angel_id);

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

        const minDelay = 10000; // 10 seconds delay
        const startTime = Date.now();

        try {
            const generatePromise = fetch('/api/message/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    investorData: selectedRecipient,
                    companyContext,
                })
            }).then(res => res.json());

            const delayPromise = new Promise(resolve => setTimeout(resolve, minDelay));

            // Wait for both
            const [data] = await Promise.all([generatePromise, delayPromise]);

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
    const [hasCopied, setHasCopied] = useState(false);

    // ... existing useEffect ...

    const handleCopy = async () => {
                await navigator.clipboard.writeText(generatedMessage);
            setHasCopied(true);
        setTimeout(() => setHasCopied(false), 2000);
    };

            // ... existing methods ...

            return (
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
                        {/* ... backdrop ... */}

                        {/* ... modal content ... */}

                        {/* Footer */}
                        <div className="p-6 border-t border-gray-200 dark:border-white/5 flex justify-between bg-gray-50/50 dark:bg-white/5 items-center">
                            {/* ... existing Back button logic ... */}
                            {step > 1 ? (
                                <Button
                                    variant="ghost"
                                    onClick={() => setStep(step - 1)}
                                    className="text-gray-500 dark:text-muted-foreground hover:text-gray-900 dark:hover:text-white pl-0 hover:bg-transparent"
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
                                        <Button
                                            variant="outline"
                                            onClick={handleCopy}
                                            className="border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 text-gray-600 dark:text-muted-foreground hover:text-gray-900 dark:hover:text-white bg-transparent"
                                        >
                                            {hasCopied ? (
                                                <>
                                                    <Check className="w-4 h-4 mr-2 text-green-500" /> Copied
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="w-4 h-4 mr-2" /> Copy
                                                </>
                                            )}
                                        </Button>
                                        <Button variant="outline" onClick={handleGenerate} className="border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 text-gray-600 dark:text-muted-foreground hover:text-gray-900 dark:hover:text-white bg-transparent">
                                            <RefreshCw className="w-4 h-4 mr-2" /> Retry
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
            )}
        </AnimatePresence >
    );
}

