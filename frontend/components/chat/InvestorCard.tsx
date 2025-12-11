'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Linkedin, MapPin, TrendingUp, Sparkles, CheckCircle2, ChevronDown, ChevronUp, ExternalLink, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Investor, MatchBreakdown, AngelInvestor, InvestmentFund, FundEmployee } from '@/types/investor';

interface InvestorCardProps {
    investor: Investor;
    type: 'angel' | 'fund' | 'employee';
    score: number;
    breakdown: MatchBreakdown;
    onDraftMessage?: (investor: Investor) => void;
    onSave?: (investor: Investor) => void;
    isSaved?: boolean;
}

export default function InvestorCard({
    investor,
    score,
    breakdown,
    onDraftMessage,
    onSave,
    isSaved = false
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

    const scoreBg = score >= 0.8 ? 'bg-green-100 dark:bg-green-500/20' : score >= 0.6 ? 'bg-yellow-100 dark:bg-yellow-500/20' : 'bg-gray-100 dark:bg-gray-500/20';
    const scoreColor = score >= 0.8 ? 'text-green-700 dark:text-green-400' : score >= 0.6 ? 'text-yellow-700 dark:text-yellow-400' : 'text-gray-700 dark:text-gray-400';

    const description = 'description' in investor ? investor.description : '';
    const displaySummary = headline || description;
    const fullDescription = ('about' in investor ? (investor as any).about : null) || description;

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
            <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-5 border border-blue-200 dark:border-gray-800 shadow-md hover:shadow-xl transition-all duration-300">

                {/* Top Row */}
                <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="relative">
                        <Avatar className="h-14 w-14 border-2 border-blue-100 dark:border-gray-800 shadow-sm">
                            <AvatarImage src={profilePic || undefined} alt={name} className="object-cover" />
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-lg">
                                {getInitials(name)}
                            </AvatarFallback>
                        </Avatar>
                        {/* Status Indicator */}
                        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-gray-900" />
                    </div>

                    {/* Name & Info */}
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-blue-900 dark:text-white truncate">
                            {name}
                        </h3>
                        <p className="text-sm text-blue-800 dark:text-gray-400 truncate mt-0.5">
                            {headline?.slice(0, 60) || 'Investor'}
                        </p>
                        {location && (
                            <div className="flex items-center gap-1 mt-1.5 text-xs text-blue-700 dark:text-gray-500">
                                <MapPin className="w-3 h-3" />
                                <span>{location.split(',')[0]}</span>
                            </div>
                        )}
                    </div>

                    {/* Score Badge */}
                    <div className={cn(
                        "flex flex-col items-center justify-center w-16 h-16 rounded-xl",
                        score >= 0.8 ? "bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800" :
                            score >= 0.6 ? "bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800" :
                                "bg-blue-50 dark:bg-gray-800 border border-blue-200 dark:border-gray-700"
                    )}>
                        <span className={cn(
                            "text-2xl font-bold",
                            score >= 0.8 ? "text-emerald-600 dark:text-emerald-400" :
                                score >= 0.6 ? "text-amber-600 dark:text-amber-400" :
                                    "text-blue-800 dark:text-gray-400"
                        )}>{Math.round(score * 100)}</span>
                        <span className="text-[9px] font-medium text-blue-700 dark:text-gray-500 uppercase">Match</span>
                    </div>
                </div>

                {/* Category Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                    {categoryTags.map((tag, i) => (
                        <span
                            key={i}
                            className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-gray-800 text-purple-800 dark:text-gray-300 border border-purple-200 dark:border-gray-700"
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
                                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-500/20 dark:to-purple-500/20 rounded-xl p-5 border-2 border-indigo-200 dark:border-indigo-500/30 shadow-lg">
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
                                                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-black/30 text-xs font-bold text-indigo-700 dark:text-indigo-200 border-2 border-indigo-300 dark:border-indigo-500/50 shadow-md">
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

                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5">
                                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">Ticket Size</p>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{ticketSize}</p>
                                    </div>
                                    <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5">
                                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">Recent Activity</p>
                                        <p className="text-xs font-medium text-gray-900 dark:text-white leading-relaxed line-clamp-2">
                                            {recentInvestments || "No recent public deals listed."}
                                        </p>
                                    </div>
                                </div>

                                {/* Bio / About */}
                                {('about' in investor) && (investor as any).about && (
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-2">About</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-black/20 p-3 rounded-lg border-l-2 border-purple-500">
                                            {(investor as any).about}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Footer Actions */}
                <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
                        className="text-blue-700 hover:text-blue-900 dark:text-gray-400 dark:hover:text-white hover:bg-blue-50 dark:hover:bg-white/10 font-medium transition-colors"
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
                                className="h-9 w-9 p-0 rounded-full border-gray-200 dark:border-gray-700"
                                onClick={(e) => { e.stopPropagation(); window.open(linkedinUrl, '_blank'); }}
                            >
                                <Linkedin className="w-4 h-4 text-[#0077b5]" />
                            </Button>
                        )}
                        <Button
                            size="sm"
                            onClick={(e) => { e.stopPropagation(); onDraftMessage && onDraftMessage(investor); }}
                            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-full px-5 font-semibold shadow-lg shadow-indigo-500/20 transition-all"
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

