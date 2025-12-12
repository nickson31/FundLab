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

    <motion.div
        layout
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="group relative bg-white dark:bg-white/5 rounded-[2rem] overflow-hidden border border-indigo-50 dark:border-white/10 shadow-xl shadow-indigo-500/5 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500"
    >
        <div className="flex flex-col h-full">

            {/* --- HEADER: Identity & Score --- */}
            <div className="flex justify-between items-center p-8 border-b border-indigo-50 dark:border-white/5 bg-white/50 backdrop-blur-sm">
                <div className="flex items-center gap-5">
                    <div className={cn("w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-indigo-500/20", bgGradient)}>
                        {getInitials(name)}
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-indigo-950 dark:text-white tracking-tight">{name}</h3>
                        <div className="flex items-center gap-2 text-sm text-indigo-400 font-medium">
                            <MapPin className="w-3.5 h-3.5" />
                            {location}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center">
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

            {/* --- BODY: Insight & Summary --- */}
            <div className="p-8 space-y-8">

                {/* Featured Insight (The "Golden Nugget/Curiosity") */}
                {smartData?.unique_highlight ? (
                    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-5 border border-amber-100 dark:border-amber-900/30">
                        <div className="absolute top-0 right-0 p-3 opacity-10">
                            <Zap className="w-12 h-12 text-amber-500" />
                        </div>
                        <div className="relative z-10">
                            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/60 dark:bg-black/20 text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-2">
                                <Sparkles className="w-3 h-3" /> Insider Fact
                            </span>
                            <p className="text-lg font-bold text-indigo-950 dark:text-amber-100 leading-snug">
                                {smartData.unique_highlight}
                            </p>
                        </div>
                    </div>
                ) : (
                    // Fallback if no specific insight
                    <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-white/5 border border-indigo-100">
                        <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Key Strength</span>
                        <p className="text-base font-semibold text-indigo-900 dark:text-indigo-100">{explanation.slice(0, 80)}...</p>
                    </div>
                )}

                {/* Editorial Summary */}
                <div>
                    <p className="text-xl text-slate-600 dark:text-slate-300 font-serif italic leading-relaxed">
                        "{summary}"
                    </p>
                </div>

                {/* Minimal Tags */}
                <div className="flex flex-wrap gap-2">
                    {expertise.slice(0, 3).map((tag: string, i: number) => (
                        <span key={i} className="px-3 py-1 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 text-xs font-bold text-slate-500 uppercase tracking-wide">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* --- FOOTER: Toggle --- */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full py-4 border-t border-indigo-50 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] hover:bg-slate-100 dark:hover:bg-white/5 transition-colors flex items-center justify-center gap-2 text-xs font-bold text-indigo-500 uppercase tracking-widest group-hover:text-indigo-600"
            >
                {isExpanded ? "Close Deep Dive" : "View Investment Logic"}
                <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", isExpanded && "rotate-180")} />
            </button>

            {/* --- EXPANDED CONTENT --- */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-slate-50 dark:bg-black/20 text-left border-t border-indigo-50 dark:border-white/5 overflow-hidden"
                    >
                        <div className="p-8 space-y-8">

                            {/* 1. The "Logic" */}
                            <div className="space-y-2">
                                <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Why This Fund?</h4>
                                <p className="text-base text-indigo-900 dark:text-indigo-200 leading-relaxed">
                                    {explanation}
                                </p>
                            </div>

                            {/* 2. Hard Facts / Nuggets */}
                            {nuggets.length > 0 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {nuggets.map((nugget: any, i: number) => (
                                        <div key={i} className="bg-white dark:bg-white/5 p-4 rounded-xl shadow-sm border border-indigo-50 dark:border-white/5">
                                            <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">{nugget.title}</div>
                                            <div className="text-sm font-bold text-indigo-950 dark:text-white">{nugget.content}</div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* 3. Extended Data */}
                            {extendedAnalysis.length > 0 && (
                                <div className="bg-white dark:bg-white/5 rounded-xl border border-indigo-50 dark:border-white/5 divide-y divide-indigo-50 dark:divide-white/5">
                                    {extendedAnalysis.map((item: any, i: number) => (
                                        <div key={i} className="flex justify-between items-center p-4">
                                            <span className="text-xs font-bold text-indigo-400 uppercase">{item.title}</span>
                                            <span className="text-sm font-medium text-indigo-900 dark:text-white">{item.content}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* 4. Actions */}
                            <div className="flex gap-4 pt-4">
                                <Button
                                    onClick={(e) => { e.stopPropagation(); onDraftMessage && onDraftMessage(fund); }}
                                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-14 rounded-xl shadow-lg shadow-indigo-500/20 text-base"
                                >
                                    <Sparkles className="w-5 h-5 mr-2 opacity-80" />
                                    Draft Message
                                </Button>

                                {(websiteUrl || linkedInUrl) && (
                                    <a href={linkedInUrl || websiteUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                        <Button variant="outline" className="h-14 w-14 rounded-xl border-indigo-200 text-indigo-600 hover:bg-indigo-50">
                                            <Globe className="w-6 h-6" />
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

