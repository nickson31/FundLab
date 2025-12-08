'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Save, RefreshCw, Send, ChevronRight, Check } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Sparkles, Search } from 'lucide-react';

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

};

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
    } catch (error) {
        console.error('Save error:', error);
    } finally {
        setIsSaving(false);
    }
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
                                                <AvatarFallback className="bg-primary/20 text-primary">{(r.fullName || 'U')[0]}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-semibold text-white">{r.fullName}</div>
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
                                        <AvatarFallback className="bg-primary/50 text-white">{(selectedRecipient?.fullName || 'U')[0]}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="text-xs text-primary font-medium uppercase tracking-wider">Drafting Message To</div>
                                        <div className="font-bold text-white">{selectedRecipient?.fullName}</div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white mb-2">
                                        What's the core of your pitch?
                                    </label>
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
