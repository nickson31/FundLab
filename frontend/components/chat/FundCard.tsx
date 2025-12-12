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
                <div className="p-12 pb-8">
                    <div className="flex justify-between items-start gap-8">
                        <div className="flex gap-8">
                            {/* Avatar */}
                            <div className={cn("w-24 h-24 shrink-0 rounded-[2rem] flex items-center justify-center text-white text-3xl font-bold shadow-2xl shadow-indigo-500/20 ring-4 ring-white dark:ring-white/5", bgGradient)}>
                                {getInitials(name)}
                            </div>

                            <div className="space-y-3 py-1">
                                <div>
                                    <h3 className="text-4xl font-bold text-indigo-950 dark:text-white tracking-tight leading-none">{name}</h3>
                                    <div className="flex items-center gap-2 mt-2 text-lg font-medium text-indigo-400/80">
                                        <MapPin className="w-5 h-5" />
                                        {location}
                                    </div>
                                </div>
                                {/* Unique Highlight (Curiosity) - BIGGER */}
                                {smartData?.unique_highlight && (
                                    <div className="inline-flex items-start gap-3 p-3 bg-fuchsia-50/80 dark:bg-fuchsia-900/10 text-fuchsia-700 dark:text-fuchsia-200 rounded-xl text-sm font-semibold border border-fuchsia-100 dark:border-fuchsia-900/20 max-w-md">
                                        <Zap className="w-5 h-5 fill-fuchsia-500 text-fuchsia-500 shrink-0 mt-0.5" />
                                        <span className="leading-snug">{smartData.unique_highlight}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Score */}
                        <div className="flex flex-col items-center gap-3">
                            <div className="relative flex items-center justify-center w-20 h-20">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="5" fill="transparent" className="text-indigo-50 dark:text-white/10" />
                                    <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="5" fill="transparent" strokeDasharray={226} strokeDashoffset={226 - (226 * score)} className="text-indigo-600 transition-all duration-1000 ease-out" />
                                </svg>
                                <span className="absolute text-2xl font-bold text-indigo-700 dark:text-indigo-400">{Math.round(score * 100)}</span>
                            </div>
                            <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">{matchLabel}</span>
                        </div>
                    </div>

                    {/* 2. Headline Summary */}
                    <div className="mt-10 mb-8">
                        <p className="text-2xl font-medium text-indigo-900/90 dark:text-indigo-100 leading-relaxed font-serif tracking-wide">
                            "{summary}"
                        </p>
                    </div>

                    {/* 3. Expertise Chips */}
                    <div className="flex flex-wrap gap-3">
                        {expertise.length > 0 ? expertise.map((tag: string, i: number) => (
                            <span key={i} className={cn("px-4 py-2 rounded-xl text-xs font-bold border uppercase tracking-wide shadow-sm", safeChipColors[i % safeChipColors.length])}>
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
                <div className="px-10 pb-8 pt-2">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-indigo-50/50 dark:bg-white/5 hover:bg-indigo-50 dark:hover:bg-white/10 text-xs font-bold text-indigo-600 dark:text-indigo-300 uppercase tracking-widest transition-all group-hover:bg-indigo-100/50"
                    >
                        {isExpanded ? "Close Analysis" : "View Details & Insights"}
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                </div>

                {/* --- COLLAPSIBLE CONTENT --- */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-slate-50/50 dark:bg-black/20 overflow-hidden border-t border-indigo-50 dark:border-white/5"
                        >
                            <div className="p-10 space-y-10">

                                {/* 1. Strategic Explanation */}
                                <div className="relative pl-6 border-l-4 border-indigo-200 dark:border-indigo-800">
                                    <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <Sparkles className="w-4 h-4" /> Investment Thesis Match
                                    </h4>
                                    <p className="text-base text-indigo-900 dark:text-indigo-200 leading-relaxed italic">
                                        "{explanation}"
                                    </p>
                                </div>

                                {/* 2. Golden Nuggets */}
                                {nuggets.length > 0 && (
                                    <div>
                                        <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-4">Portfolio Highlights</h4>
                                        <div className="grid gap-4">
                                            {nuggets.map((nugget: any, i: number) => (
                                                <div key={i} className="flex items-start gap-4 bg-white dark:bg-white/5 p-4 rounded-2xl border border-indigo-100 dark:border-white/5 shadow-sm">
                                                    <Zap className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                                                    <div>
                                                        <span className="block text-sm font-bold text-indigo-900 dark:text-white mb-1">{nugget.title}</span>
                                                        <span className="text-sm text-indigo-600 dark:text-slate-400 leading-relaxed">{nugget.content}</span>
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
                                            <div key={i} className="p-4 rounded-xl bg-indigo-50/50 dark:bg-white/5 border border-indigo-100 dark:border-white/5">
                                                <div className="text-[10px] font-bold text-indigo-400 uppercase mb-2">{item.title}</div>
                                                <div className="text-base font-semibold text-indigo-900 dark:text-white">{item.content}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* 4. Actions */}
                                <div className="pt-2 flex items-center gap-4">
                                    <Button
                                        onClick={(e) => { e.stopPropagation(); onDraftMessage && onDraftMessage(fund); }}
                                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-7 rounded-2xl shadow-xl shadow-indigo-500/20 active:scale-95 transition-all text-lg"
                                    >
                                        <Sparkles className="w-5 h-5 mr-2 text-indigo-200" />
                                        Draft Application
                                    </Button>

                                    {websiteUrl && (
                                        <a href={websiteUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                            <Button variant="outline" className="h-16 w-16 rounded-2xl border-2 border-indigo-100 bg-white text-indigo-400 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 transition-all">
                                                <Globe className="w-7 h-7" />
                                            </Button>
                                        </a>
                                    )}

                                    {linkedInUrl && (
                                        <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                            <Button variant="outline" className="h-16 w-16 rounded-2xl border-2 border-indigo-100 bg-white text-indigo-400 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 transition-all">
                                                <Linkedin className="w-7 h-7" />
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

