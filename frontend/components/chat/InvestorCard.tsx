'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Linkedin, MapPin, TrendingUp, Sparkles, CheckCircle2, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
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
        categories = [
            ...(investor.categories_strong_es || '').split(','),
            ...(investor.categories_strong_en || '').split(',')
        ].filter(Boolean).map(s => s.trim());

        stages = [
            ...(investor.stages_strong_es || '').split(','),
            ...(investor.stages_strong_en || '').split(',')
        ].filter(Boolean).map(s => s.trim());

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
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ scale: 1.002, translateY: -2 }}
            className="group relative"
        >
            {/* Ambient Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl" />

            {/* Main Card */}
            <div className="relative bg-white dark:bg-black/40 backdrop-blur-3xl border border-gray-100 dark:border-white/10 rounded-3xl p-6 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 overflow-hidden">

                {/* Decorative Top Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex gap-5">
                    {/* Left Column: Avatar & Score */}
                    <div className="flex flex-col items-center gap-3 shrink-0">
                        <Avatar className="h-16 w-16 border-2 border-white dark:border-white/10 shadow-lg ring-4 ring-gray-50 dark:ring-white/5">
                            <AvatarImage src={profilePic} alt={name} className="object-cover" />
                            <AvatarFallback className="bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 text-indigo-700 dark:text-indigo-200 font-bold text-lg">
                                {getInitials(name)}
                            </AvatarFallback>
                        </Avatar>

                        <div className={cn(
                            "flex flex-col items-center justify-center w-12 h-12 rounded-2xl border backdrop-blur-md shadow-inner",
                            score >= 0.8 ? "bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400" :
                                score >= 0.6 ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-600 dark:text-yellow-400" :
                                    "bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-500"
                        )}>
                            <span className="text-xs font-bold leading-none">{Math.round(score * 100)}</span>
                            <span className="text-[9px] font-medium opacity-70 leading-none">FIT</span>
                        </div>
                    </div>

                    {/* Right Column: Content */}
                    <div className="flex-1 min-w-0 space-y-3">
                        {/* Header */}
                        <div>
                            <div className="flex justify-between items-start">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate pr-2 tracking-tight">
                                    {name}
                                </h3>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed mt-1 font-medium">
                                {isExpanded ? fullDescription : displaySummary}
                            </p>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                            {location && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-gray-50 dark:bg-white/5 text-xs font-semibold text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-white/5">
                                    <MapPin className="w-3 h-3 text-indigo-500" />
                                    {location.split(',')[0]}
                                </span>
                            )}
                            {categoryTags.map((tag, i) => (
                                <Badge key={i} variant="outline" className="bg-transparent border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 text-xs font-medium px-2.5 py-1">
                                    {tag}
                                </Badge>
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
                                        <div className="bg-indigo-50/50 dark:bg-indigo-500/10 rounded-xl p-4 border border-indigo-100 dark:border-indigo-500/20">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                                                <span className="text-xs font-bold text-indigo-900 dark:text-indigo-200 uppercase tracking-widest">Why it's a match</span>
                                            </div>

                                            {reasons.length > 0 ? (
                                                <div className="space-y-2">
                                                    {reasons.map((reason, i) => (
                                                        <div key={i} className="flex gap-2 text-sm text-indigo-900/80 dark:text-indigo-200/80 leading-relaxed items-start">
                                                            <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                                                            <span>{reason}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-sm text-indigo-900/80 dark:text-indigo-200/80 leading-relaxed">
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
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="mt-5 pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between gap-3">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
                        className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 font-medium transition-colors"
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
                                className="h-9 w-9 p-0 rounded-full border-gray-200 dark:border-white/10"
                                onClick={(e) => { e.stopPropagation(); window.open(linkedinUrl, '_blank'); }}
                            >
                                <Linkedin className="w-4 h-4 text-[#0077b5]" />
                            </Button>
                        )}
                        <Button
                            size="sm"
                            onClick={(e) => { e.stopPropagation(); onDraftMessage && onDraftMessage(investor); }}
                            className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 rounded-full px-5 font-semibold shadow-lg shadow-indigo-500/0 hover:shadow-indigo-500/20 transition-all"
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

