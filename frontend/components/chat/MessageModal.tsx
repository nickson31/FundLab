'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Save, RefreshCw, Send, ChevronRight, Check } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Sparkles, Search, Linkedin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface MessageModalProps {
    isOpen: boolean;
    onClose: () => void;
    preSelectedInvestor?: any;
}

export default function MessageModal({ isOpen, onClose, preSelectedInvestor }: MessageModalProps) {
    const [step, setStep] = useState(1);
    const [recipients, setRecipients] = useState<any[]>([]);
    const [selectedRecipient, setSelectedRecipient] = useState<any>(null);
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
            fetchRecipients();
        }
    }, [isOpen, preSelectedInvestor]);

    const fetchRecipients = async () => {
        const { data: saved } = await supabase
            .from('saved_investors')
            .select('investor_id, type')
            .eq('user_id', '00000000-0000-0000-0000-000000000000');

        if (saved && saved.length > 0) {
            const ids = saved.map(s => s.investor_id);
            const { data: angels } = await supabase.from('angels').select('*').in('id', ids);
            if (angels) {
                setRecipients(angels.map(a => ({ ...a, type: 'angel' })));
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
                    userId: '00000000-0000-0000-0000-000000000000'
                })
            });
            const data = await res.json();
            setGeneratedMessage(data.message);
        } catch (error) {
            console.error('Generation error:', error);
            setGeneratedMessage('Error generating message.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const name = selectedRecipient.fullName || selectedRecipient.name || 'Investor';
            await fetch('/api/message/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    recipientId: selectedRecipient.id,
                    recipientType: selectedRecipient.type || 'angel',
                    recipientName: name,
                    companyContext,
                    content: generatedMessage,
                    userId: '00000000-0000-0000-0000-000000000000'
                })
            });
            onClose();
        } catch (error) {
            console.error('Save error:', error);
        } finally {
            setIsSaving(false);
        }
    };

    if (!isOpen) return null;

    const name = selectedRecipient?.fullName || selectedRecipient?.name || 'Investor';
    const linkedinUrl = selectedRecipient?.linkedinUrl || selectedRecipient?.['linkedin/value'] || '';
    const headline = selectedRecipient?.headline || selectedRecipient?.short_description || '';

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
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                        className="glass-panel w-full max-w-2xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden flex flex-col max-h-[90vh] z-10 relative"
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
                                    <input
                                        type="text"
                                        placeholder="Search saved investors..."
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-primary/50 focus:border-transparent outline-none transition-all placeholder:text-muted-foreground text-foreground"
                                    />
                                    <div className="space-y-2">
                                        {recipients.map(r => (
                                            <div
                                                key={r.id}
                                                onClick={() => { setSelectedRecipient(r); setStep(2); }}
                                                className="flex items-center p-3 hover:bg-white/5 rounded-xl cursor-pointer transition-colors border border-transparent hover:border-white/10 group"
                                            >
                                                <Avatar className="h-10 w-10 mr-4 border border-white/10">
                                                    <AvatarFallback className="bg-primary/20 text-primary">{(r.fullName || r.name || 'U')[0]}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-semibold text-white">{r.fullName || r.name}</div>
                                                    <div className="text-sm text-muted-foreground">{r.headline}</div>
                                                </div>
                                                <ChevronRight className="ml-auto text-muted-foreground group-hover:text-primary transition-colors w-5 h-5" />
                                            </div>
                                        ))}
                                        {recipients.length === 0 && (
                                            <div className="text-center py-12">
                                                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <Search className="w-8 h-8 text-muted-foreground" />
                                                </div>
                                                <p className="text-muted-foreground">No saved investors found yet.</p>
                                                <Button variant="ghost" className="mt-2 text-primary hover:bg-primary/10 pl-0 hover:text-primary">Go to Search</Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-6">
                                    <div className="bg-primary/10 p-4 rounded-xl flex items-center border border-primary/20">
                                        <Avatar className="h-10 w-10 mr-3 border border-primary/20">
                                            <AvatarFallback className="bg-primary/50 text-white">{name[0]}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="text-xs text-primary font-medium uppercase tracking-wider">Drafting Message To</div>
                                            <div className="font-bold text-white">{name}</div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-white mb-2">
                                            What's the core of your pitch?
                                        </label>
                                        <textarea
                                            value={companyContext}
                                            onChange={(e) => setCompanyContext(e.target.value)}
                                            placeholder="Example: We're building a B2B SaaS for legal teams in Europe. We have €10k MRR and just signed a pilot with a major firm..."
                                            className="w-full h-48 p-4 rounded-xl bg-black/20 border border-white/10 focus:ring-2 focus:ring-primary/50 focus:border-transparent resize-none outline-none text-white placeholder:text-muted-foreground/50 leading-relaxed"
                                        />
                                        <div className="flex justify-between mt-2">
                                            <span className="text-xs text-muted-foreground">Be specific about metrics and traction.</span>
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
                                                    className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                                                </div>
                                            </div>
                                            <p className="text-muted-foreground font-medium animate-pulse">Analyzing investor profile...</p>
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
                                        className="bg-primary hover:bg-primary/90 text-primary-foreground min-w-[150px] shadow-lg shadow-primary/20"
                                    >
                                        Generate Draft <Sparkles className="w-4 h-4 ml-2" />
                                    </Button>
                                )}

                                {step === 3 && !isGenerating && (
                                    <>
                                        <Button variant="outline" onClick={handleGenerate} className="border-white/10 hover:bg-white/5 text-muted-foreground hover:text-white bg-transparent">
                                            <RefreshCw className="w-4 h-4 mr-2" /> Try Again
                                        </Button>
                                        <Button onClick={handleSave} disabled={isSaving} className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20">
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
