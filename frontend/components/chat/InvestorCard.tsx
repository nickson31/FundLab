'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Linkedin, MapPin, Sparkles, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Investor, MatchBreakdown } from '@/types/investor';

// --- Shared Types ---
interface InvestorCardProps {
    investor: Investor;
    score: number;
    breakdown: MatchBreakdown;
    onDraftMessage?: (investor: Investor) => void;
    onSave?: (investor: Investor) => void;
    isSaved?: boolean;
}

const getInitials = (n: string) => n.split(' ').map(p => p[0]).join('').toUpperCase().slice(0, 2);

export default function InvestorCard(props: InvestorCardProps) {
    const { investor, score, onDraftMessage } = props;
    const [isExpanded, setIsExpanded] = useState(false);

    if (!investor) return null;

    // Data Extraction & Safeguards
    const name = ('fullName' in investor ? investor.fullName : ('name' in investor ? investor.name : 'Unknown Investor')) || 'Unknown Investor';
    const location = ('addressWithCountry' in investor ? investor.addressWithCountry : null) || ('location_city' in investor ? `${investor.location_city}` : 'Global');

    // Smart Data Access (Backend injects this)
    const smartData = (investor as any).smartData;

    // Fallbacks if Smart Data is missing (e.g. latency or error)
    const summary = smartData?.oneLineSummary || ('headline' in investor ? investor.headline : "Investor Profile");
    const explanation = smartData?.generalExplanation || "This investor matches your criteria based on their investment thesis and past activity.";
    const expertise = smartData?.expertises || []; // If empty, we might want to fallback to category tags, but prompt says "Reescritos", so prefer empty/clean to raw data.
    const nuggets = smartData?.goldenNuggets || [];
    const matchLabel = smartData?.matchLabel || "Strong Match";
    const linkedInUrl = 'linkedinUrl' in investor ? investor.linkedinUrl : ('website_url' in investor ? investor.website_url : undefined);

    const safeChipColors = [
        "bg-indigo-50 text-indigo-700 border-indigo-100",
        "bg-violet-50 text-violet-700 border-violet-100",
        "bg-emerald-50 text-emerald-700 border-emerald-100"
    ];

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative bg-white dark:bg-white/5 rounded-3xl overflow-hidden border border-indigo-50 dark:border-white/10 shadow-lg shadow-indigo-500/5 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300"
        >
            <div className="p-0 flex flex-col h-full">

                {/* 1. Top Section: Name (Initials), Score, Location */}
                <div className="p-6 pb-2">
                    <div className="flex justify-between items-start gap-4">
                        <div className="flex gap-4">
                            {/* Initials Avatar (No Photo) */}
                            <div className="w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-indigo-500/20">
                                {getInitials(name)}
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold text-indigo-950 dark:text-white tracking-tight leading-tight">{name}</h3>
                                {/* Location */}
                                <div className="flex items-center gap-2 mt-1 text-sm font-medium text-indigo-400/80">
                                    <MapPin className="w-3.5 h-3.5" />
                                    {location}
                                </div>
                            </div>
                        </div>

                        {/* Score Circle */}
                        <div className="flex flex-col items-center gap-1">
                            <div className="relative flex items-center justify-center w-14 h-14">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="28" cy="28" r="26" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-indigo-50 dark:text-white/10" />
                                    <circle cx="28" cy="28" r="26" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray={163} strokeDashoffset={163 - (163 * score)} className="text-indigo-600 transition-all duration-1000 ease-out" />
                                </svg>
                                <span className="absolute text-lg font-bold text-indigo-700 dark:text-indigo-400">{Math.round(score * 100)}</span>
                            </div>
                            <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">{matchLabel}</span>
                        </div>
                    </div>

                    {/* 2. One Line Summary */}
                    <p className="mt-5 text-lg font-medium text-indigo-900/80 dark:text-indigo-200 leading-snug">
                        {summary}
                    </p>
                </div>

                {/* 3. Expertise Chips (UPPERCASE via CSS) */}
                <div className="px-6 py-2 flex flex-wrap gap-2">
                    {expertise.length > 0 ? expertise.map((tag: string, i: number) => (
                        <span key={i} className={cn("px-4 py-1.5 rounded-full text-xs font-bold border uppercase tracking-wide", safeChipColors[i % safeChipColors.length])}>
                            {tag}
                        </span>
                    )) : (
                        // Fallback tags if AI hasn't loaded logic yet
                        <span className="px-4 py-1.5 rounded-full text-xs font-bold border border-indigo-50 bg-indigo-50/50 text-indigo-300 uppercase">
                            Analysis Pending...
                        </span>
                    )}
                </div>

                {/* Body Content */}
                <div className="p-6 pt-4 space-y-6">

                    {/* 4. Deep Summary (Prompt + Investor) */}
                    <div className="bg-indigo-50/30 dark:bg-black/20 p-5 rounded-2xl border border-indigo-50 dark:border-white/5">
                        <div className="flex items-start gap-3">
                            <Sparkles className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                            <div>
                                <h4 className="text-xs font-bold text-indigo-900 dark:text-indigo-300 uppercase mb-2">Investment Logic</h4>
                                <p className="text-sm font-medium text-indigo-800/70 dark:text-slate-300 leading-relaxed">
                                    {explanation}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 5. Golden Nuggets */}
                    {nuggets.length > 0 && (
                        <div className="space-y-3">
                            <h4 className="text-xs font-bold text-indigo-300 uppercase flex items-center gap-2 tracking-widest">
                                <Zap className="w-3 h-3" /> Golden Nuggets
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {nuggets.map((nugget: any, i: number) => (
                                    <div key={i} className="bg-white dark:bg-white/5 p-4 rounded-xl border border-indigo-50 dark:border-white/10 shadow-sm">
                                        <p className="text-[10px] font-bold text-indigo-500 uppercase mb-1">{nugget.title}</p>
                                        <p className="text-sm font-semibold text-indigo-950 dark:text-slate-200">{nugget.content}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 6. Action Buttons */}
                    <div className="flex items-center gap-3 pt-2">
                        <Button
                            onClick={(e) => { e.stopPropagation(); onDraftMessage && onDraftMessage(investor); }}
                            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-6 rounded-2xl shadow-xl shadow-indigo-500/30 active:scale-95 transition-all text-base"
                        >
                            <span className="flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-indigo-200" />
                                Generate Message
                            </span>
                        </Button>

                        {linkedInUrl && (
                            <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className="shrink-0" onClick={(e) => e.stopPropagation()}>
                                <Button variant="outline" className="h-14 w-14 rounded-2xl border-2 border-indigo-50 hover:border-indigo-200 hover:bg-indigo-50 text-indigo-300 hover:text-indigo-600 transition-all p-0 flex items-center justify-center">
                                    <Linkedin className="w-6 h-6" />
                                </Button>
                            </a>
                        )}
                    </div>

                </div>
            </div>
        </motion.div>
    );
}
