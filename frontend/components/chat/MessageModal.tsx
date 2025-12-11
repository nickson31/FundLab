'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RefreshCw, Save, ChevronRight, Sparkles, Search, Linkedin, Mail, Check, Copy, PenSquare } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Investor } from '@/types/investor';
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
    const [hasCopied, setHasCopied] = useState(false);

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
        // const startTime = Date.now(); // Unused

        try {
            const generatePromise = fetch('/api/message/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    investorData: selectedRecipient,
                    companyContext,
                    messageType // Pass messageType to API
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
            onClose();
        } catch (error) {
            console.error('Save error:', error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleCopy = async () => {
        await navigator.clipboard.writeText(generatedMessage);
        setHasCopied(true);
        setTimeout(() => setHasCopied(false), 2000);
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

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!isOpen || !mounted) return null;

    // ... existing content helper ...

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 0 }}
                        className="glass-panel w-full max-w-3xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden flex flex-col max-h-[85vh] z-10 relative bg-white dark:bg-[#0A0A0A] isolate"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-gray-100 dark:border-white/5 flex justify-between items-center bg-gray-50/50 dark:bg-white/5">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    {step === 1 && <><Search className="w-5 h-5 text-indigo-500" /> Select Recipient</>}
                                    {step === 2 && <><PenSquare className="w-5 h-5 text-indigo-500" /> Draft Message</>}
                                    {step === 3 && <><Sparkles className="w-5 h-5 text-indigo-500" /> AI Draft</>}
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-muted-foreground mt-1">
                                    {step === 1 ? 'Choose who to contact from your matches.' : step === 2 ? 'Give the AI some context for a warm intro.' : 'Review and copy your personalized draft.'}
                                </p>
                            </div>
                            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500 dark:text-muted-foreground transition-colors">
                                <X className="w-6 h-6" />
                            </Button>
                        </div>

                        {/* ... Rest of content ... */}


                        {/* Content */}
                        <div className="p-6 overflow-y-auto flex-1">
                            {step === 1 && (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        {recipients.map((r, idx) => (
                                            <div
                                                key={r.id || idx}
                                                onClick={() => { setSelectedRecipient(r); setStep(2); }}
                                                className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl cursor-pointer transition-colors border border-transparent hover:border-gray-200 dark:hover:border-white/10 group"
                                            >
                                                <Avatar className="h-10 w-10 mr-4 border border-gray-200 dark:border-white/10">
                                                    <AvatarFallback className="bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 font-medium">
                                                        {getRecipientName(r).charAt(0)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-semibold text-gray-900 dark:text-white">{getRecipientName(r)}</div>
                                                    <div className="text-sm text-gray-500 dark:text-muted-foreground line-clamp-1">{getRecipientHeadline(r)}</div>
                                                </div>
                                                <ChevronRight className="ml-auto text-gray-400 dark:text-muted-foreground group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors w-5 h-5" />
                                            </div>
                                        ))}
                                        {recipients.length === 0 && (
                                            <div className="text-center py-12">
                                                <div className="w-16 h-16 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <Search className="w-8 h-8 text-gray-400 dark:text-muted-foreground" />
                                                </div>
                                                <p className="text-gray-500 dark:text-muted-foreground">No saved investors found yet.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-6">
                                    <div className="bg-indigo-50 dark:bg-indigo-500/10 p-4 rounded-xl flex items-center border border-indigo-100 dark:border-indigo-500/20">
                                        <Avatar className="h-10 w-10 mr-3 border border-indigo-200 dark:border-indigo-500/20">
                                            <AvatarFallback className="bg-indigo-100 dark:bg-indigo-500/50 text-indigo-600 dark:text-white">
                                                {recipientInitial}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="text-xs text-indigo-600 dark:text-indigo-400 font-medium uppercase tracking-wider mb-0.5">Drafting Message To</div>
                                            <div className="font-bold text-gray-900 dark:text-white leading-tight">{recipientName}</div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-white mb-3 ml-1">
                                            Platform & Format
                                        </label>
                                        <div className="grid grid-cols-2 gap-3 mb-6">
                                            <button
                                                onClick={() => setMessageType('linkedin')}
                                                className={cn(
                                                    "p-3 rounded-xl border text-sm font-medium transition-all flex items-center justify-center gap-2",
                                                    messageType === 'linkedin'
                                                        ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20"
                                                        : "bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10"
                                                )}
                                            >
                                                <Linkedin className="w-4 h-4" />
                                                LinkedIn
                                            </button>
                                            <button
                                                onClick={() => setMessageType('email')}
                                                className={cn(
                                                    "p-3 rounded-xl border text-sm font-medium transition-all flex items-center justify-center gap-2",
                                                    messageType === 'email'
                                                        ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                                                        : "bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10"
                                                )}
                                            >
                                                <Mail className="w-4 h-4" />
                                                Email
                                            </button>
                                        </div>

                                        <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2 ml-1">
                                            What's the core of your pitch?
                                        </label>
                                        <textarea
                                            value={companyContext}
                                            onChange={(e) => setCompanyContext(e.target.value)}
                                            placeholder="Describe your company, traction, and why this investor is a good fit..."
                                            className="w-full h-48 p-4 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent resize-none outline-none text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-muted-foreground/50 leading-relaxed"
                                        />
                                        <div className="flex justify-between mt-2 px-1">
                                            <span className="text-xs text-gray-500 dark:text-muted-foreground">Be specific about metrics.</span>
                                            <span className="text-xs text-gray-500 dark:text-muted-foreground">{companyContext.length} chars</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-6 h-full flex flex-col">
                                    {isGenerating ? (
                                        <div className="flex flex-col items-center justify-center py-20 space-y-8">
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full" />
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                                    className="relative w-24 h-24 border-[3px] border-indigo-500/30 border-t-indigo-500 rounded-full shadow-lg"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <Sparkles className="w-10 h-10 text-indigo-500 dark:text-indigo-400 animate-pulse" />
                                                </div>
                                            </div>

                                            <div className="space-y-2 text-center max-w-sm">
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    key="loading-text"
                                                    className="font-medium text-lg text-gray-900 dark:text-white"
                                                >
                                                    Crafting your message...
                                                </motion.div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400 flex flex-col gap-1 items-center">
                                                    <div className="flex items-center gap-2">
                                                        <Check className="w-3 h-3 text-green-500" />
                                                        <span>Analyzed <strong>{recipientName}</strong>'s profile</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 delay-1000 animate-in fade-in fill-mode-both">
                                                        <Check className="w-3 h-3 text-green-500" />
                                                        <span>Checked portfolio synergies</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 delay-2000 animate-in fade-in fill-mode-both">
                                                        <Sparkles className="w-3 h-3 text-indigo-500" />
                                                        <span>Optimizing for high response rate</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="bg-gray-50 dark:bg-black/20 p-6 rounded-xl border border-gray-200 dark:border-white/5 whitespace-pre-wrap font-sans text-gray-900 dark:text-white leading-relaxed flex-1 overflow-y-auto shadow-inner text-sm md:text-base selection:bg-indigo-100 dark:selection:bg-indigo-900/30">
                                            {generatedMessage}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-gray-200 dark:border-white/5 flex justify-between bg-gray-50/50 dark:bg-white/5 items-center">
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
        </AnimatePresence>,
        document.body
    );
}
