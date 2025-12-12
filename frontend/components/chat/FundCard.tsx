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
    const websiteUrl = fund.website_url;
    const linkedInUrl = fund.linkedinUrl;

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
                    <p className="mt-5 text-lg font-medium text-indigo-900/80 dark:text-indigo-200 leading-snug">
                        {summary}
                    </p>
                </div>

                {/* 3. Expertise Chips */}
                <div className="px-6 py-2 flex flex-wrap gap-2">
                    {expertise.length > 0 ? expertise.map((tag: string, i: number) => (
                        <span key={i} className={cn("px-4 py-1.5 rounded-full text-xs font-bold border uppercase tracking-wide", safeChipColors[i % safeChipColors.length])}>
                            {tag}
                        </span>
                    )) : (
                        <span className="px-4 py-1.5 rounded-full text-xs font-bold border border-indigo-50 bg-indigo-50/50 text-indigo-300 uppercase">
                            Thesis Analysis Pending...
                        </span>
                    )}
                </div>

                {/* --- TOGGLE BUTTON FOR DROPDOWN --- */}
                <div className="px-6 py-4">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors focus:outline-none"
                    >
                        {isExpanded ? "Hide Fund Analysis" : "View Fund Analysis"}
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                </div>

                {/* --- COLLAPSIBLE CONTENT (DROPDOWN) --- */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-slate-50/30 dark:bg-black/20 overflow-hidden"
                        >
                            <div className="p-6 space-y-4">
                                <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2">Strategic Analysis</h4>
                                {extendedAnalysis && extendedAnalysis.length > 0 ? (
                                    <div className="grid grid-cols-1 gap-3">
                                        {extendedAnalysis.map((item: any, i: number) => (
                                            <div key={i} className="flex flex-col gap-1 p-3 rounded-lg border border-indigo-100 dark:border-white/5 bg-white/50 dark:bg-white/5">
                                                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-300 uppercase">{item.title}</span>
                                                <span className="text-sm text-indigo-900 dark:text-slate-300">{item.content}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-indigo-400 italic">No deep dive analysis available.</p>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div className="px-6 pb-6 pt-4">
                    <div className="flex items-center gap-3">
                        <Button
                            onClick={(e) => { e.stopPropagation(); onDraftMessage && onDraftMessage(fund); }}
                            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-6 rounded-2xl shadow-xl shadow-indigo-500/30 active:scale-95 transition-all text-base"
                        >
                            <span className="flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-indigo-200" />
                                Draft Application
                            </span>
                        </Button>

                        {/* URL Button for Funds */}
                        {websiteUrl && (
                            <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className="shrink-0" onClick={(e) => e.stopPropagation()}>
                                <Button variant="outline" className="h-14 w-14 rounded-2xl border-2 border-indigo-50 hover:border-indigo-200 hover:bg-indigo-50 text-indigo-300 hover:text-indigo-600 transition-all p-0 flex items-center justify-center">
                                    <Globe className="w-6 h-6" />
                                </Button>
                            </a>
                        )}

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
