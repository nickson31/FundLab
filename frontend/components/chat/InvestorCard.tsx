'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Linkedin, MapPin, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';
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

    const scoreColor = score >= 0.7 ? 'text-green-400' : score >= 0.5 ? 'text-yellow-400' : 'text-gray-400';
    const scoreBg = score >= 0.7 ? 'bg-green-500/10' : score >= 0.5 ? 'bg-yellow-500/10' : 'bg-gray-500/10';

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative h-auto"
        >
            <div className="absolute inset-0 bg-gradient-to-b from-black/[0.02] to-black/[0.01] dark:from-white/[0.07] dark:to-white/[0.02] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative flex flex-col h-full bg-white/80 dark:bg-black/40 backdrop-blur-md border border-gray-200/50 dark:border-white/[0.08] rounded-2xl p-5 hover:border-gray-300 dark:hover:border-white/[0.15] transition-all duration-500 overflow-hidden shadow-sm dark:shadow-none">

                {/* Header */}
                <div className="flex items-start gap-4 mb-4 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                    <Avatar className="h-12 w-12 border border-gray-200 dark:border-white/10 shrink-0">
                        <AvatarImage src={profilePic || undefined} alt={name} />
                        <AvatarFallback className="bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-200 font-medium text-sm">
                            {getInitials(name)}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                            <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white truncate mb-1 pr-2">
                                {name}
                            </h3>
                            <div className={cn(
                                "flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold shrink-0",
                                scoreBg, scoreColor
                            )}>
                                <TrendingUp className="w-3 h-3" />
                                {Math.round(score * 100)}%
                            </div>
                        </div>
                        <p className={cn("text-xs md:text-sm text-gray-500 dark:text-gray-400 transition-all", isExpanded ? "" : "line-clamp-2")}>
                            {isExpanded ? fullDescription : displaySummary}
                        </p>
                    </div>
                </div>

                {/* Validation Reasons */}
                {reasons.length > 0 && (
                    <div className="mb-4 space-y-1.5">
                        {reasons.slice(0, isExpanded ? 4 : 2).map((reason, i) => (
                            <div key={i} className="flex gap-2 text-xs text-gray-600 dark:text-gray-300 items-start">
                                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400/80 shrink-0 mt-0.5" />
                                <span className="opacity-90 leading-tight">{reason}</span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Expanded Content */}
                <div className={cn("grid transition-all duration-300 ease-in-out", isExpanded ? "grid-rows-[1fr] opacity-100 mb-4" : "grid-rows-[0fr] opacity-0")}>
                    <div className="overflow-hidden space-y-3">
                        {/* Bio / About */}
                        {('about' in investor) && (investor as any).about && (
                            <div className="bg-gray-50 dark:bg-white/5 rounded-lg p-3 border border-gray-100 dark:border-white/5">
                                <p className="text-[10px] uppercase tracking-wider text-gray-500 font-medium mb-1">About</p>
                                <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-4 hover:line-clamp-none transition-all">
                                    {(investor as any).about}
                                </p>
                            </div>
                        )}

                        <div className="bg-gray-50 dark:bg-white/5 rounded-lg p-3 border border-gray-100 dark:border-white/5">
                            <p className="text-[10px] uppercase tracking-wider text-gray-500 font-medium mb-1">Recent Investments & Portfolio</p>
                            <p className="text-xs text-gray-700 dark:text-white leading-relaxed">
                                {recentInvestments ||
                                    (('portfolio_companies' in investor && Array.isArray((investor as any).portfolio_companies))
                                        ? (investor as any).portfolio_companies.join(', ')
                                        : 'No public investments listed.')}
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1 bg-gray-50 dark:bg-white/5 rounded-lg p-3 border border-gray-100 dark:border-white/5">
                                <p className="text-[10px] uppercase tracking-wider text-gray-500 font-medium mb-1">Ticket Size</p>
                                <p className="text-xs text-gray-900 dark:text-white font-medium">{ticketSize}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1" />

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {categoryTags.map((tag, i) => (
                        <Badge key={i} variant="secondary" className="bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-white/5 text-[10px] px-1.5 h-5 font-normal">
                            {tag}
                        </Badge>
                    ))}
                    {location && (
                        <div className="flex items-center gap-1 text-[10px] text-gray-400 ml-auto pt-1">
                            <MapPin className="w-3 h-3" />
                            <span className="truncate max-w-[80px]">{location.split(',')[0]}</span>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-auto pt-3 border-t border-gray-100 dark:border-white/5">
                    <Button
                        onClick={() => onDraftMessage?.(investor)}
                        className="flex-1 h-8 text-xs bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-900/20"
                    >
                        Draft Message
                    </Button>

                    <Button
                        variant="ghost"
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 h-8 px-3 text-xs"
                    >
                        {isExpanded ? 'Less' : 'More'}
                    </Button>

                    {linkedinUrl && (
                        <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 shrink-0"
                            onClick={() => window.open(linkedinUrl, '_blank')}
                        >
                            <Linkedin className="w-3.5 h-3.5 text-gray-400" />
                        </Button>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

