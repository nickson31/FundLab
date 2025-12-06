'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Save, RefreshCw, Send, ChevronRight, Check } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';

interface MessageModalProps {
    isOpen: boolean;
    onClose: () => void;
    preSelectedInvestor?: any; // If opened from a card
}

export default function MessageModal({ isOpen, onClose, preSelectedInvestor }: MessageModalProps) {
    const [step, setStep] = useState(1);
    const [recipients, setRecipients] = useState<any[]>([]);
    const [selectedRecipient, setSelectedRecipient] = useState<any>(null);
    const [companyContext, setCompanyContext] = useState('');
    const [generatedMessage, setGeneratedMessage] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Reset state when opened
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
        // Fetch saved investors to populate list
        // For MVP, just fetching angels. Ideally fetch funds/employees too.
        const { data: saved } = await supabase
            .from('saved_investors')
            .select('investor_id, type')
            .eq('user_id', '00000000-0000-0000-0000-000000000000'); // Mock ID

        if (saved && saved.length > 0) {
            const ids = saved.map(s => s.investor_id);
            const { data: angels } = await supabase.from('angel_investors').select('*').in('id', ids);
            if (angels) {
                setRecipients(angels.map(a => ({ ...a.data, id: a.id, type: 'angel' })));
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
            await fetch('/api/message/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    recipientId: selectedRecipient.id,
                    recipientType: selectedRecipient.type || 'angel',
                    recipientName: selectedRecipient.fullName,
                    companyContext,
                    content: generatedMessage,
                    userId: '00000000-0000-0000-0000-000000000000'
                })
            });
            onClose();
            // Show toast success
        } catch (error) {
            console.error('Save error:', error);
        } finally {
            setIsSaving(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
                {/* Header */}
                <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {step === 1 ? 'Select Recipient' : step === 2 ? 'Provide Context' : 'Review Message'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto flex-1">
                    {step === 1 && (
                        <div className="space-y-2">
                            <input
                                type="text"
                                placeholder="Search saved investors..."
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-indigo-500 mb-4"
                            />
                            <div className="space-y-2">
                                {recipients.map(r => (
                                    <div
                                        key={r.id}
                                        onClick={() => { setSelectedRecipient(r); setStep(2); }}
                                        className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl cursor-pointer transition-colors"
                                    >
                                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold mr-4">
                                            {(r.fullName || 'U')[0]}
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900 dark:text-white">{r.fullName}</div>
                                            <div className="text-sm text-gray-500">{r.headline}</div>
                                        </div>
                                        <ChevronRight className="ml-auto text-gray-400 w-5 h-5" />
                                    </div>
                                ))}
                                {recipients.length === 0 && (
                                    <p className="text-center text-gray-500 py-8">No saved investors found.</p>
                                )}
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6">
                            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl flex items-center">
                                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold mr-3">
                                    {(selectedRecipient?.fullName || 'U')[0]}
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Drafting for:</div>
                                    <div className="font-bold text-indigo-900 dark:text-indigo-300">{selectedRecipient?.fullName}</div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Tell us about your company
                                </label>
                                <textarea
                                    value={companyContext}
                                    onChange={(e) => setCompanyContext(e.target.value)}
                                    placeholder="We're building a mobile fintech app for Gen Z users in Spain..."
                                    className="w-full h-40 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 resize-none"
                                />
                                <p className="text-xs text-gray-500 mt-2 text-right">
                                    {companyContext.length} chars
                                </p>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6">
                            {isGenerating ? (
                                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full"
                                    />
                                    <p className="text-gray-500 animate-pulse">Crafting personalized message...</p>
                                </div>
                            ) : (
                                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 whitespace-pre-wrap font-sans text-gray-800 dark:text-gray-200 leading-relaxed">
                                    {generatedMessage}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 dark:border-gray-800 flex justify-between bg-gray-50 dark:bg-gray-900/50">
                    {step > 1 && (
                        <button
                            onClick={() => setStep(step - 1)}
                            className="text-gray-500 hover:text-gray-700 font-medium"
                        >
                            Back
                        </button>
                    )}

                    <div className="ml-auto flex space-x-3">
                        {step === 2 && (
                            <Button
                                onClick={handleGenerate}
                                disabled={!companyContext}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                            >
                                Generate Message <SparklesIcon className="w-4 h-4 ml-2" />
                            </Button>
                        )}

                        {step === 3 && !isGenerating && (
                            <>
                                <Button variant="outline" onClick={handleGenerate}>
                                    <RefreshCw className="w-4 h-4 mr-2" /> Regenerate
                                </Button>
                                <Button onClick={handleSave} disabled={isSaving}>
                                    <Save className="w-4 h-4 mr-2" /> Save Draft
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

function SparklesIcon({ className }: { className?: string }) {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /><path d="M5 3v4" /><path d="M9 3v4" /><path d="M3 5h4" /><path d="M3 9h4" /></svg>
    )
}
