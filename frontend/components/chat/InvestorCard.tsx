'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Linkedin, MapPin, Sparkles, Zap, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Investor, MatchBreakdown } from '@/types/investor';
import { generateAvatarGradient } from '@/lib/avatarGenerator';

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
    const expertise = smartData?.expertises || [];
    const nuggets = smartData?.goldenNuggets || [];
    const extendedAnalysis = smartData?.extendedAnalysis || [];
    const matchLabel = smartData?.matchLabel || "Strong Match";
    const linkedInUrl = 'linkedinUrl' in investor ? investor.linkedinUrl : ('website_url' in investor ? investor.website_url : undefined);

    const safeChipColors = [
        "bg-indigo-50 text-indigo-700 border-indigo-100",
        "bg-violet-50 text-violet-700 border-violet-100",
        "bg-emerald-50 text-emerald-700 border-emerald-100"
    ];

    // Dynamic Gradient for "Programmed Photo"
    const bgGradient = generateAvatarGradient(name);

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
                            {/* Initials Avatar (Programmed Photo) */}
                            <div className={cn("w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-indigo-500/20", bgGradient)}>
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
                    <p className="mt-4 text-lg font-medium text-indigo-900/80 dark:text-indigo-200 leading-snug">
                        {summary}
                    </p>

                    {/* 3. Match Logic / Explanation (Moved from Dropdown) */}
                    <div className="mt-4 p-3 bg-indigo-50/50 dark:bg-white/5 rounded-xl border border-indigo-100 dark:border-white/5">
                        <h4 className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> Analysis
                        </h4>
                        <p className="text-sm text-indigo-800 dark:text-zinc-400 leading-relaxed">
                            {explanation}
                        </p>
                    </div>
                </div>

                {/* 4. Expertise Chips (UPPERCASE per request) */}
                <div className="px-6 pb-2 flex flex-wrap gap-2">
                    {expertise.length > 0 ? expertise.map((tag: string, i: number) => (
                        <span key={i} className={cn("px-3 py-1 rounded-md text-[11px] font-bold border uppercase tracking-wide", safeChipColors[i % safeChipColors.length])}>
                            {tag.toUpperCase()}
                        </span>
                    )) : (
                        <span className="px-4 py-1.5 rounded-full text-xs font-bold border border-indigo-50 bg-indigo-50/50 text-indigo-300 uppercase">
                            ANALYSIS PENDING...
                        </span>
                    )}
                </div>

                {/* --- TOGGLE BUTTON FOR DROPDOWN --- */}
                <div className="px-6 py-4">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors focus:outline-none"
                    >
                        {isExpanded ? "Hide Details" : "View Details & Insights"}
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                </div>

                {/* --- COLLAPSIBLE CONTENT (DROPDOWN) --- %}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-slate-50/30 dark:bg-black/20 overflow-hidden border-t border-indigo-50 dark:border-white/5"
                        >
                            <div className="p-6 space-y-6">

                                {/* Deep Summary REMOVED from here, moved up */}

                {/* Golden Nuggets (Kept in Dropdown) */}

                {/* Golden Nuggets (Moved to Dropdown) */}
                {nuggets.length > 0 && (
                    <div>
                        <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3">Key Insights</h4>
                        <div className="grid gap-3">
                            {nuggets.map((nugget: any, i: number) => (
                                <div key={i} className="flex items-start gap-3 bg-indigo-50/50 dark:bg-white/5 p-3 rounded-xl border border-indigo-100 dark:border-white/5">
                                    <Zap className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                                    <div>
                                        <span className="block text-xs font-bold text-indigo-900 dark:text-white mb-0.5">{nugget.title}</span>
                                        <span className="text-xs text-indigo-700/80 dark:text-slate-400">{nugget.content}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Extended Analysis (Moved to Dropdown) */}
                {extendedAnalysis && extendedAnalysis.length > 0 && (
                    <div>
                        <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2">Extended Metrics</h4>
                        <div className="grid grid-cols-1 gap-2">
                            {extendedAnalysis.map((item: any, i: number) => (
                                <div key={i} className="flex justify-between items-center p-2 rounded-lg border-b border-indigo-50 dark:border-white/5 last:border-0">
                                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-300 uppercase">{item.title}</span>
                                    <span className="text-xs text-indigo-900 dark:text-slate-300 text-right">{item.content}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ACTION BUTTONS (Moved to Dropdown) */}
                <div className="pt-4 flex items-center gap-3">
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
        </motion.div>
    );
}

