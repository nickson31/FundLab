'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Linkedin, MapPin, TrendingUp, Sparkles, CheckCircle2, ChevronDown, ChevronUp, ExternalLink, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Investor, MatchBreakdown, AngelInvestor, InvestmentFund, FundEmployee } from '@/types/investor';
import { selectDynamicLayout, CardLayout, DynamicField } from '@/lib/dynamicCardLayouts';

interface InvestorCardProps {
    investor: Investor;
    type: 'angel' | 'fund' | 'employee';
    score: number;
    breakdown: MatchBreakdown;
    onDraftMessage?: (investor: Investor) => void;
    onSave?: (investor: Investor) => void;
    isSaved?: boolean;
    query?: string;
}

export default function InvestorCard({
    investor,
    score,
    breakdown,
    onDraftMessage,
    onSave,
    isSaved = false,
    query
}: InvestorCardProps) {
    // DIAGNOSTIC LOGGING
    if (!investor) {
        console.warn('InvestorCard received undefined investor');
        return null;
    }
    // console.log('Rendering InvestorCard for:', investor.fullName || investor.name, score);


    const [isHovered, setIsHovered] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    // Type Guards & Extraction
    const isAngel = (inv: Investor): inv is AngelInvestor =>
        'angel_score' in inv && (typeof inv.angel_score === 'number' || typeof inv.angel_score === 'string');

    const isFund = (inv: Investor): inv is InvestmentFund =>
        !isAngel(inv) && ('category_keywords' in inv || 'description' in inv);

    // Name Extraction
    let name = 'Unknown';
    if ('fullName' in investor && investor.fullName) name = investor.fullName;
    else if ('name' in investor && investor.name) name = investor.name;
    else if ('full_name' in investor && investor.full_name) name = investor.full_name;

    // Common Fields
    const headline = 'headline' in investor ? investor.headline : (isFund(investor) ? investor.description?.slice(0, 100) + '...' : '');
    const location = ('addressWithCountry' in investor ? investor.addressWithCountry : undefined) ||
        ('location_city' in investor ? `${investor.location_city}, ${investor.location_country}` : undefined) ||
        'Global';

    const linkedinUrl = 'linkedinUrl' in investor ? investor.linkedinUrl :
        'linkedin_url' in investor ? investor.linkedin_url : undefined;

    const profilePic = 'profilePic' in investor ? investor.profilePic : undefined;

    // Expanded Details
    const recentInvestments = 'recent_investments' in investor ? (investor as any).recent_investments || '' : '';
    const ticketSize = 'ticket_size' in investor ? (investor as any).ticket_size || 'Not specified' : 'Not specified';

    // Score (Specific to Angels)
    const angelScore = isAngel(investor) ? parseFloat(String(investor.angel_score || 0)) : 0;

    // Categories & Stages
    let categories: string[] = [];
    let stages: string[] = [];
    let reasons: string[] = [];

    if (isAngel(investor)) {
        // ENGLISH ONLY - No Spanish tags
        categories = (investor.categories_strong_en || investor.categories_general_en || '')
            .split(',')
            .filter(Boolean)
            .map(s => s.trim());

        stages = (investor.stages_strong_en || investor.stages_general_en || '')
            .split(',')
            .filter(Boolean)
            .map(s => s.trim());

        if (investor.validation_reasons_english) {
            reasons = investor.validation_reasons_english.split(';').map(s => s.trim()).filter(Boolean).slice(0, 2);
        }
    } else if (isFund(investor)) {
        if (investor.category_keywords) {
            const clean = investor.category_keywords.replace(/[\[\]'"]/g, '');
            categories = clean.split(',').slice(0, 5);
        }
    }

    const categoryTags = [...new Set(categories)].slice(0, 3);

    const getInitials = (n: string) => n.split(' ').map(p => p[0]).join('').toUpperCase().slice(0, 2);

    const scoreBg = score >= 0.8 ? 'bg-emerald-100 dark:bg-emerald-500/20' : score >= 0.6 ? 'bg-amber-100 dark:bg-amber-500/20' : 'bg-slate-100 dark:bg-slate-800/50';
    const scoreColor = score >= 0.8 ? 'text-emerald-700 dark:text-emerald-400' : score >= 0.6 ? 'text-amber-700 dark:text-amber-400' : 'text-slate-700 dark:text-slate-400';

    const description = 'description' in investor ? investor.description : '';
    const displaySummary = headline || description;
    const fullDescription = ('about' in investor ? (investor as any).about : null) || description;

    // Use Dynamic Layout System
    const layout = selectDynamicLayout(investor, 'angel', query);
    const dynamicFields = layout.fields;

    // Helper to find a specific dynamic field
    const getField = (componentName: string) => dynamicFields.find(f => f.component === componentName);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="group relative"
        >
            {/* Subtle Glow on Hover */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" />

            {/* Main Card */}
            <div className="relative glass-card p-4 md:p-6 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300">

                {/* Top Row */}
                <div className="flex items-start gap-3 md:gap-4">
                    {/* Avatar */}
                    <div className="relative">
                        <Avatar className="h-12 w-12 md:h-14 md:w-14 border-2 border-white dark:border-white/10 shadow-sm">
                            <AvatarImage src={profilePic || undefined} alt={name} className="object-cover" />
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-lg">
                                {getInitials(name)}
                            </AvatarFallback>
                        </Avatar>
                        {/* Status Indicator */}
                        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-black" />
                    </div>

                    {/* Name & Info */}
                    <div className="flex-1 min-w-0">
                        <h3 className="text-base md:text-lg font-bold text-foreground truncate">
                            {name}
                        </h3>
                        <p className="text-sm md:text-sm text-muted-foreground truncate mt-0.5">
                            {headline?.slice(0, 60) || 'Investor'}
                        </p>
                        {location && (
                            <div className="flex items-center gap-1 mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                                <MapPin className="w-3 h-3" />
                                <span>{location.split(',')[0]}</span>
                            </div>
                        )}
                    </div>

                    {/* Score Badge */}
                    <div className={cn(
                        "flex flex-col items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-xl",
                        score >= 0.8 ? "bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20" :
                            score >= 0.6 ? "bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20" :
                                "bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10"
                    )}>
                        <span className={cn(
                            "text-xl md:text-2xl font-bold",
                            score >= 0.8 ? "text-emerald-600 dark:text-emerald-400" :
                                score >= 0.6 ? "text-amber-600 dark:text-amber-400" :
                                    "text-slate-600 dark:text-slate-400"
                        )}>{Math.round(score * 100)}</span>
                        <span className="text-[9px] font-medium text-slate-500 dark:text-slate-500 uppercase">Match</span>
                    </div>
                </div>

                {/* Category Tags */}
                <div className="flex flex-wrap gap-1.5 md:gap-2 mt-3 md:mt-4">
                    {categoryTags.map((tag, i) => (
                        <span
                            key={i}
                            className="px-2.5 py-1 md:px-3 md:py-1 rounded-full text-xs font-medium bg-white/50 dark:bg-white/5 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 shadow-sm"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Enhanced Expanded Content */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="pt-4 space-y-4">
                                {/* AI Reasoning Block */}
                                <div className="bg-indigo-50/50 dark:bg-indigo-500/10 rounded-xl p-5 border border-indigo-100 dark:border-indigo-500/20 shadow-sm">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                                            <Sparkles className="w-4 h-4 text-white" />
                                        </div>
                                        <span className="text-sm font-bold text-indigo-900 dark:text-indigo-100 uppercase tracking-widest">AI Analysis</span>
                                    </div>

                                    {/* Matched Keywords Badge */}
                                    {breakdown?.matched_keywords && breakdown.matched_keywords.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {breakdown.matched_keywords.map((kw: string, i: number) => (
                                                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-indigo-500/20 text-xs font-bold text-indigo-700 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-500/30 shadow-sm">
                                                    <Zap className="w-4 h-4 text-indigo-500" />
                                                    {kw}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {reasons.length > 0 ? (
                                        <div className="space-y-2">
                                            {reasons.map((reason, i) => (
                                                <div key={i} className="flex gap-2 text-sm text-indigo-900 dark:text-indigo-100 leading-relaxed items-start font-medium">
                                                    <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                                                    <span>{reason}</span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-indigo-900 dark:text-indigo-100 leading-relaxed font-medium">
                                            {breakdown?.reasoning || "High alignment based on investment history and sector focus."}
                                        </p>
                                    )}
                                </div>

                                {/* Dynamic Stats Grid based on available data */}
                                <div className="grid grid-cols-2 gap-3">
                                    {dynamicFields
                                        .filter(f => ['ticket_size', 'recent_investments', 'investment_thesis'].includes(f.component))
                                        .map((field, idx) => (
                                            <div key={idx} className="p-3 bg-slate-50 dark:bg-white/5 rounded-lg border border-slate-200 dark:border-white/5">
                                                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">{field.label}</p>
                                                <p className="text-xs font-medium text-foreground leading-relaxed line-clamp-2">
                                                    {field.value}
                                                </p>
                                            </div>
                                        ))}
                                </div>

                                {/* Dynamic Text Sections (About, Bio, etc) */}
                                {dynamicFields
                                    .filter(f => ['about', 'portfolio_companies'].includes(f.component))
                                    .map((field, idx) => (
                                        <div key={idx}>
                                            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-2">{field.label}</p>
                                            <p className="text-sm text-foreground leading-relaxed bg-slate-50 dark:bg-white/5 p-3 rounded-lg border-l-2 border-indigo-500">
                                                {field.value}
                                            </p>
                                        </div>
                                    ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Footer Actions */}
                <div className="mt-4 md:mt-5 pt-3 md:pt-4 border-t border-slate-100 dark:border-white/5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
                        className="text-slate-500 hover:text-foreground dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 font-medium transition-colors min-h-[44px] px-4"
                    >
                        {isExpanded ? (
                            <><ChevronUp className="w-4 h-4 mr-1.5" /> Less Info</>
                        ) : (
                            <><ChevronDown className="w-4 h-4 mr-1.5" /> Deep Dive</>
                        )}
                    </Button>

                    <div className="flex gap-2">
                        {(linkedinUrl) && (
                            <Button
                                size="sm"
                                variant="outline"
                                className="h-11 w-11 md:h-9 md:w-9 p-0 rounded-full border border-slate-200 dark:border-white/10 bg-transparent"
                                onClick={(e) => { e.stopPropagation(); window.open(linkedinUrl, '_blank'); }}
                            >
                                <Linkedin className="w-4 h-4 text-[#0077b5]" />
                            </Button>
                        )}
                        <Button
                            size="sm"
                            onClick={(e) => { e.stopPropagation(); onDraftMessage && onDraftMessage(investor); }}
                            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-full px-4 md:px-5 min-h-[44px] font-semibold shadow-lg shadow-indigo-500/20 transition-all"
                        >
                            <Sparkles className="w-3.5 h-3.5 mr-2" />
                            Draft Intro
                        </Button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

