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

    // Type Guards & Extraction
    // Check if it has an angel score (string or number)
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
        // Funds usually have keywords in JSON string format or raw string
        // Assuming string based on updated types.
        if (investor.category_keywords) {
            // Primitive cleanup if it's a raw array string "['a', 'b']"
            const clean = investor.category_keywords.replace(/[\[\]'"]/g, '');
            categories = clean.split(',').slice(0, 5);
        }
    }

    const categoryTags = [...new Set(categories)].slice(0, 3);
    const stageTags = [...new Set(stages)].slice(0, 2);

    const getInitials = (n: string) => n.split(' ').map(p => p[0]).join('').toUpperCase().slice(0, 2);

    const scoreColor = score >= 0.7 ? 'text-green-400' : score >= 0.5 ? 'text-yellow-400' : 'text-gray-400';
    const scoreBg = score >= 0.7 ? 'bg-green-500/10' : score >= 0.5 ? 'bg-yellow-500/10' : 'bg-gray-500/10';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative h-full"
        >
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.07] to-white/[0.02] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative flex flex-col h-full bg-black/40 backdrop-blur-sm border border-white/[0.08] rounded-2xl p-5 hover:border-white/[0.15] transition-all duration-500">

                {/* Header */}
                <div className="flex items-start gap-3 mb-4">
                    <Avatar className="h-12 w-12 border border-white/10 shrink-0">
                        <AvatarImage src={profilePic || undefined} alt={name} />
                        <AvatarFallback className="bg-indigo-500/20 text-indigo-200 font-medium text-sm">
                            {getInitials(name)}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-white truncate pr-2">{name}</h3>
                        <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{headline}</p>
                    </div>

                    <div className={cn("shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium", scoreBg, scoreColor)}>
                        <TrendingUp className="w-3 h-3" />
                        {Math.round(score * 100)}%
                    </div>
                </div>

                {/* Stats / Score */}
                {angelScore > 0 && (
                    <div className="flex items-center gap-2 mb-3 px-3 py-1.5 rounded-lg bg-indigo-500/5 border border-indigo-500/20 w-fit">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                        <span className="text-xs text-indigo-300 font-medium">Angel Score: {angelScore}</span>
                    </div>
                )}

                {/* Validation Reasons (The "Wow" factor) */}
                {reasons.length > 0 && (
                    <div className="mb-4 space-y-1.5">
                        {reasons.map((reason, i) => (
                            <div key={i} className="flex gap-2 text-xs text-gray-300 items-start">
                                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400/80 shrink-0 mt-0.5" />
                                <span className="opacity-90 leading-tight">{reason}</span>
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex-1" /> {/* Spacer */}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {categoryTags.map((tag, i) => (
                        <Badge key={i} variant="secondary" className="bg-white/5 text-gray-400 border-white/5 text-[10px] px-1.5 h-5 font-normal">
                            {tag}
                        </Badge>
                    ))}
                    {location && (
                        <div className="flex items-center gap-1 text-[10px] text-gray-500 ml-auto pt-1">
                            <MapPin className="w-3 h-3" />
                            <span className="truncate max-w-[80px]">{location.split(',')[0]}</span>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-auto pt-3 border-t border-white/5">
                    <Button
                        onClick={() => onDraftMessage?.(investor)}
                        className="flex-1 h-8 text-xs bg-indigo-600 hover:bg-indigo-500 text-white"
                    >
                        Draft Message
                    </Button>

                    {linkedinUrl && (
                        <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 rounded-full hover:bg-white/10"
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

