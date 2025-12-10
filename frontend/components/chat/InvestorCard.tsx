'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Linkedin, MapPin, TrendingUp, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Investor, MatchBreakdown } from '@/types/investor';

interface InvestorCardProps {
    investor: Investor;
    type: 'angel' | 'fund';
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
    const [isHovered, setIsHovered] = useState(false);
    const [saved, setSaved] = useState(isSaved);

    // Map database columns to display values
    const name = investor.fullName || investor.name || 'Unknown Investor';
    const headline = (investor.headline as string) || '';
    const location = (investor.addressWithCountry as string) || 'Global';
    const linkedinUrl = (investor.linkedinUrl as string) || '';
    const profilePic = (investor.profilePic as string) || '';
    const angelScore = investor.angel_score ? parseFloat(String(investor.angel_score)) : 0;

    // Parse categories and stages
    const categories = (investor.categories_strong_es as string) || (investor.categories_strong_en as string) || '';
    const stages = (investor.stages_strong_es as string) || (investor.stages_strong_en as string) || '';

    const categoryTags = categories.split(',').slice(0, 3).map((c: string) => c.trim()).filter(Boolean);
    const stageTags = stages.split(',').slice(0, 2).map((s: string) => s.trim()).filter(Boolean);

    // handleSave function removed as it's not used in the component

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const scoreColor = score >= 0.7 ? 'text-green-400' : score >= 0.5 ? 'text-yellow-400' : 'text-gray-400';
    const scoreBg = score >= 0.7 ? 'bg-green-500/10' : score >= 0.5 ? 'bg-yellow-500/10' : 'bg-gray-500/10';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative"
        >
            {/* Hover glow effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.07] to-white/[0.02] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Main card */}
            <div className="relative bg-black/40 backdrop-blur-sm border border-white/[0.08] rounded-2xl p-4 md:p-6 hover:border-white/[0.15] transition-all duration-500">

                {/* Header */}
                <div className="flex items-start gap-3 md:gap-4 mb-4">
                    {/* Avatar */}
                    <Avatar className="h-12 w-12 md:h-14 md:w-14 border-2 border-white/10 ring-2 ring-indigo-500/20">
                        <AvatarImage src={profilePic} alt={name} />
                        <AvatarFallback className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-white font-semibold">
                            {getInitials(name)}
                        </AvatarFallback>
                    </Avatar>

                    {/* Name & Score */}
                    <div className="flex-1 min-w-0">
                        <h3 className="text-base md:text-lg font-bold text-white truncate mb-1">
                            {name}
                        </h3>
                        {headline && (
                            <p className="text-xs md:text-sm text-gray-400 line-clamp-1">
                                {headline}
                            </p>
                        )}
                    </div>

                    {/* Match Score Badge */}
                    <div className={cn(
                        "flex items-center gap-1 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold",
                        scoreBg, scoreColor
                    )}>
                        <TrendingUp className="w-3 h-3 md:w-4 md:h-4" />
                        {Math.round(score * 100)}%
                    </div>
                </div>

                {/* Angel Score */}
                {angelScore > 0 && (
                    <div className="flex items-center gap-2 mb-3 px-3 py-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                        <Sparkles className="w-4 h-4 text-indigo-400" />
                        <span className="text-sm text-indigo-300 font-medium">
                            Angel Score: {angelScore}/100
                        </span>
                    </div>
                )}

                {/* Location */}
                {location && (
                    <div className="flex items-center gap-2 text-xs md:text-sm text-gray-400 mb-3">
                        <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                        <span className="truncate">{location}</span>
                    </div>
                )}

                {/* Tags */}
                <div className="space-y-2 mb-4">
                    {/* Category tags */}
                    {categoryTags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                            {categoryTags.map((tag: string, i: number) => (
                                <Badge
                                    key={i}
                                    variant="secondary"
                                    className="bg-white/5 text-gray-300 border-white/10 text-xs px-2 py-0.5"
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}

                    {/* Stage tags */}
                    {stageTags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                            {stageTags.map((tag: string, i: number) => (
                                <Badge
                                    key={i}
                                    variant="outline"
                                    className="bg-indigo-500/10 text-indigo-300 border-indigo-500/30 text-xs px-2 py-0.5"
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                    <Button
                        onClick={() => onDraftMessage && onDraftMessage(investor)}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white text-sm h-9 md:h-10"
                    >
                        Draft Message
                    </Button>

                    {linkedinUrl && (
                        <Button
                            variant="outline"
                            size="icon"
                            className="border-white/10 hover:border-white/20 hover:bg-white/5 h-9 w-9 md:h-10 md:w-10"
                            onClick={() => window.open(linkedinUrl, '_blank')}
                        >
                            <Linkedin className="w-4 h-4 text-blue-400" />
                        </Button>
                    )}
                </div>

                {/* Subtle bottom indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
        </motion.div>
    );
}
