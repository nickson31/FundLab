'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Linkedin, MapPin, Sparkles, Zap, Globe, ChevronDown, ChevronUp } from 'lucide-react'; // Added Chevrons
import { cn } from '@/lib/utils';
import { InvestmentFund } from '@/types/investor';
import { generateAvatarGradient } from '@/lib/avatarGenerator';

interface FundCardProps {
    fund: any;
    score: number;
    breakdown: any;
    onDraftMessage?: (fund: any) => void;
    onSave?: (fund: any) => void;
    isSaved?: boolean;
    query?: string;
}

const getInitials = (n: string) => n.split(' ').map(p => p[0]).join('').toUpperCase().slice(0, 2);

export default function FundCard(props: FundCardProps) {
    const { fund, score, onDraftMessage } = props;
    const [isExpanded, setIsExpanded] = useState(false);

    if (!fund) return null;

    // Data Extraction (Fund Specific)
    const name = fund.name || fund.fullName || 'Unknown Fund';
    // Fund location usually splits differently or uses different fields
    const location = fund.hq_location || fund.location_city || 'Global';
    const websiteUrl = fund.website_url || fund.website || fund['website/value'];
    const linkedInUrl = fund.linkedinUrl || fund.linkedin_url || fund['linkedin/value'];

    // Smart Data Access (Backend injects this)
    const smartData = (fund as any).smartData;

    // Fallbacks if Smart Data is missing
    const summary = smartData?.oneLineSummary || fund.short_description || fund.description || "Venture Capital Fund";
    const explanation = smartData?.generalExplanation || fund.investment_thesis || "Active investor in your sector.";
    const expertise = smartData?.expertises || [];
    // Fallback to categories if no smart tags
    if (expertise.length === 0 && fund.category_keywords) {
        const rawCats = fund.category_keywords.replace(/[\[\]'"]/g, '').split(',').filter(Boolean);
        expertise.push(...rawCats.slice(0, 3));
    }

    const nuggets = smartData?.goldenNuggets || [];
    const extendedAnalysis = smartData?.extendedAnalysis || [];
    const matchLabel = smartData?.matchLabel || "Top Fund Match";

    const safeChipColors = [
        "bg-indigo-50 text-indigo-700 border-indigo-100",
        "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-100", // Slightly different for funds
        "bg-blue-50 text-blue-700 border-blue-100"
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

                {/* 1. Top Section: Identity & Score */}
                <div className="p-8 pb-4">
                    <div className="flex justify-between items-start gap-4">
                        <div className="flex gap-5">
                            {/* Avatar */}
                            <div className={cn("w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-indigo-500/20", bgGradient)}>
                                {getInitials(name)}
                            </div>

                            <div className="space-y-1">
                                <h3 className="text-2xl font-bold text-indigo-950 dark:text-white tracking-tight leading-tight">{name}</h3>
                                <div className="flex items-center gap-2 text-sm font-medium text-indigo-400/80">
                                    <MapPin className="w-3.5 h-3.5" />
                                    {location}
                                </div>
                            </div>
                        </div>

                        {/* Score */}
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

                    {/* 2. Headline Summary (Clean) */}
                    <div className="mt-6 mb-4">
                        <p className="text-lg font-medium text-indigo-900/90 dark:text-indigo-100 leading-snug">
                            {summary}
                        </p>
                    </div>

                    {/* 3. Expertise Chips (Clean, below summary) */}
                    <div className="flex flex-wrap gap-2 mb-2">
                        {expertise.length > 0 ? expertise.map((tag: string, i: number) => (
                            <span key={i} className={cn("px-3 py-1.5 rounded-lg text-[11px] font-bold border uppercase tracking-wide", safeChipColors[i % safeChipColors.length])}>
                                {tag.toUpperCase()}
                            </span>
                        )) : (
                            <span className="px-3 py-1 rounded-lg text-xs font-bold border border-indigo-50 bg-indigo-50/50 text-indigo-300 uppercase">
                                PENDING ANALYSIS
                            </span>
                        )}
                    </div>
                </div>

                {/* --- TOGGLE BUTTON --- */}
                <div className="px-8 pb-6 pt-2">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-50/50 dark:bg-white/5 hover:bg-indigo-50 dark:hover:bg-white/10 text-xs font-bold text-indigo-600 dark:text-indigo-300 uppercase tracking-widest transition-all"
                    >
                        {isExpanded ? "Minimize Insights" : "View Smart Analysis"}
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                </div>

                {/* --- COLLAPSIBLE CONTENT (Now holds the 'Tight' stuff) --- */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-slate-50/50 dark:bg-black/20 overflow-hidden border-t border-indigo-50 dark:border-white/5"
                        >
                            <div className="p-8 space-y-8">

                                {/* 1. Strategic Explanation (Moved Here) */}
                                <div className="relative pl-4 border-l-2 border-indigo-200 dark:border-indigo-800">
                                    <h4 className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <Sparkles className="w-3 h-3" /> Investment Thesis Match
                                    </h4>
                                    <p className="text-sm text-indigo-900 dark:text-indigo-200 leading-relaxed italic">
                                        "{explanation}"
                                    </p>
                                </div>

                                {/* 2. Golden Nuggets */}
                                {nuggets.length > 0 && (
                                    <div>
                                        <h4 className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-3">Portfolio Highlights</h4>
                                        <div className="grid gap-3">
                                            {nuggets.map((nugget: any, i: number) => (
                                                <div key={i} className="flex items-start gap-3 bg-white dark:bg-white/5 p-3 rounded-xl border border-indigo-100 dark:border-white/5 shadow-sm">
                                                    <Zap className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                                                    <div>
                                                        <span className="block text-xs font-bold text-indigo-900 dark:text-white mb-0.5">{nugget.title}</span>
                                                        <span className="text-xs text-indigo-600 dark:text-slate-400">{nugget.content}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* 3. Extended Metrics */}
                                {extendedAnalysis && extendedAnalysis.length > 0 && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {extendedAnalysis.map((item: any, i: number) => (
                                            <div key={i} className="p-3 rounded-lg bg-indigo-50/50 dark:bg-white/5 border border-indigo-100 dark:border-white/5">
                                                <div className="text-[10px] font-bold text-indigo-400 uppercase mb-1">{item.title}</div>
                                                <div className="text-sm font-semibold text-indigo-900 dark:text-white">{item.content}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* 4. Actions */}
                                <div className="pt-2 flex items-center gap-3">
                                    <Button
                                        onClick={(e) => { e.stopPropagation(); onDraftMessage && onDraftMessage(fund); }}
                                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-6 rounded-xl shadow-lg shadow-indigo-500/20 active:scale-95 transition-all"
                                    >
                                        <Sparkles className="w-4 h-4 mr-2 text-indigo-200" />
                                        Draft Application
                                    </Button>

                                    {websiteUrl && (
                                        <a href={websiteUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                            <Button variant="outline" className="h-12 w-12 rounded-xl border-indigo-100 bg-white text-indigo-400 hover:text-indigo-600 hover:border-indigo-300">
                                                <Globe className="w-5 h-5" />
                                            </Button>
                                        </a>
                                    )}

                                    {linkedInUrl && (
                                        <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                            <Button variant="outline" className="h-12 w-12 rounded-xl border-indigo-100 bg-white text-indigo-400 hover:text-indigo-600 hover:border-indigo-300">
                                                <Linkedin className="w-5 h-5" />
                                            </Button>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

