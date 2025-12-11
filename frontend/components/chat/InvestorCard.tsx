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
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="group relative"
        >
            {/* Neon Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-75 blur-xl transition-all duration-500 animate-pulse" />

            {/* Main Card with Bold Design */}
            <div className="relative bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950 rounded-3xl p-6 border-2 border-blue-200 dark:border-blue-800 shadow-2xl hover:shadow-blue-500/50 dark:hover:shadow-blue-500/30 transition-all duration-300">

                {/* Animated Top Accent */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-t-3xl animate-gradient-x" />

                {/* Top Row: Avatar + Info + Score */}
                <div className="flex items-start gap-5">
                    {/* Avatar with Neon Ring */}
                    <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity" />
                        <Avatar className="relative h-16 w-16 border-4 border-white dark:border-gray-900 shadow-2xl ring-2 ring-blue-400">
                            <AvatarImage src={profilePic || undefined} alt={name} className="object-cover" />
                            <AvatarFallback className="bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 text-white font-black text-xl">
                                {getInitials(name)}
                            </AvatarFallback>
                        </Avatar>
                        {/* Animated Status Pulse */}
                        <div className="absolute -bottom-1 -right-1 w-5 h-5">
                            <div className="absolute inset-0 bg-green-400 rounded-full animate-ping" />
                            <div className="relative w-5 h-5 bg-green-500 rounded-full border-3 border-white dark:border-gray-900 shadow-lg" />
                        </div>
                    </div>

                    {/* Name & Title with Gradient */}
                    <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent truncate tracking-tight">
                            {name}
                        </h3>
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 truncate mt-1">
                            {headline?.slice(0, 60) || 'Investor'}
                        </p>
                        {location && (
                            <div className="flex items-center gap-1.5 mt-2 px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 rounded-full w-fit">
                                <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                                <span className="text-xs font-bold text-blue-700 dark:text-blue-300">{location.split(',')[0]}</span>
                            </div>
                        )}
                    </div>

                    {/* Score Badge - NEON DESIGN */}
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={cn(
                            "relative flex flex-col items-center justify-center w-20 h-20 rounded-2xl shadow-2xl",
                            score >= 0.8 ? "bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600" :
                                score >= 0.6 ? "bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500" :
                                    "bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600"
                        )}
                    >
                        <div className="absolute inset-0 bg-white/20 rounded-2xl animate-pulse" />
                        <span className="relative text-3xl font-black text-white drop-shadow-lg">{Math.round(score * 100)}</span>
                        <span className="relative text-[10px] font-black text-white/90 uppercase tracking-widest">MATCH</span>
                    </motion.div>
                </div>

                {/* Category Pills - VIBRANT NEON */}
                <div className="flex flex-wrap gap-2 mt-5">
                    {categoryTags.map((tag, i) => (
                        <motion.span
                            key={i}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className={cn(
                                "px-4 py-2 rounded-full text-xs font-black uppercase tracking-wide shadow-lg transition-all cursor-pointer",
                                i === 0 ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-cyan-500/50" :
                                    i === 1 ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:shadow-purple-500/50" :
                                        "bg-gradient-to-r from-orange-500 to-red-600 text-white hover:shadow-orange-500/50"
                            )}
                        >
                            {tag}
                        </motion.span>
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
                        className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/10 font-medium transition-colors"
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

