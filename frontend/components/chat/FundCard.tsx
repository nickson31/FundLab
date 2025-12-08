'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Linkedin, MapPin, TrendingUp, Sparkles, ChevronDown, ChevronUp, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';

interface FundCardProps {
    fund: any;
    score: number;
    breakdown: any;
    onDraftMessage?: (fund: any) => void;
    onSave?: (fund: any) => void;
    isSaved?: boolean;
}

export default function FundCard({
    fund,
    score,
    breakdown,
    onDraftMessage,
    onSave,
    isSaved = false
}: FundCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [saved, setSaved] = useState(isSaved);
    const [showEmployees, setShowEmployees] = useState(false);
    const [employees, setEmployees] = useState<any[]>([]);
    const [loadingEmployees, setLoadingEmployees] = useState(false);

    // Map database columns
    const name = fund.name || fund.fullName || 'Unknown Fund';
    const description = fund.description || fund.short_description || '';
    const location = fund.hq_location || fund.location || 'Global';
    const linkedinUrl = fund.linkedin_url || fund.linkedinUrl || '';
    const websiteUrl = fund.website || fund.websiteUrl || '';
    const profilePic = fund.logo_url || fund.profilePic || '';

    // Parse categories and stages
    const categories = fund.categories || fund.categories_strong_es || '';
    const stages = fund.investment_stages || fund.stages_strong_es || '';

    const categoryTags = (typeof categories === 'string' ? categories.split(',') : [])
        .slice(0, 3)
        .map((c: string) => c.trim())
        .filter(Boolean);
    const stageTags = (typeof stages === 'string' ? stages.split(',') : [])
        .slice(0, 2)
        .map((s: string) => s.trim())
        .filter(Boolean);

    // Fetch employees when expanded
    useEffect(() => {
        if (showEmployees && !employees.length && fund.id) {
            fetchEmployees();
        }
    }, [showEmployees]);

    const fetchEmployees = async () => {
        setLoadingEmployees(true);
        try {
            const { data, error } = await supabase
                .from('employees')
                .select('*')
                .eq('fund_id', fund.id)
                .limit(5);

            if (!error && data) {
                setEmployees(data);
            }
        } catch (err) {
            console.error('Error fetching employees:', err);
        } finally {
            setLoadingEmployees(false);
        }
    };

    const handleSave = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSaved(!saved);
        if (onSave) onSave(fund);
    };

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
                    {/* Logo */}
                    <Avatar className="h-12 w-12 md:h-14 md:w-14 border-2 border-white/10 ring-2 ring-purple-500/20">
                        <AvatarImage src={profilePic} alt={name} />
                        <AvatarFallback className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-white font-semibold">
                            {getInitials(name)}
                        </AvatarFallback>
                    </Avatar>

                    {/* Name & Score */}
                    <div className="flex-1 min-w-0">
                        <h3 className="text-base md:text-lg font-bold text-white truncate mb-1">
                            {name}
                        </h3>
                        {description && (
                            <p className="text-xs md:text-sm text-gray-400 line-clamp-2">
                                {description}
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
                            {categoryTags.map((tag, i) => (
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
                            {stageTags.map((tag, i) => (
                                <Badge
                                    key={i}
                                    variant="outline"
                                    className="bg-purple-500/10 text-purple-300 border-purple-500/30 text-xs px-2 py-0.5"
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}
                </div>

                {/* Employee Toggle */}
                <button
                    onClick={() => setShowEmployees(!showEmployees)}
                    className="w-full flex items-center justify-between px-3 py-2 mb-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Users className="w-4 h-4" />
                        <span>Team Members</span>
                    </div>
                    {showEmployees ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {/* Employees List */}
                {showEmployees && (
                    <div className="mb-4 space-y-2">
                        {loadingEmployees ? (
                            <div className="text-center text-sm text-gray-400 py-2">Loading...</div>
                        ) : employees.length > 0 ? (
                            employees.map((emp, i) => (
                                <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={emp.profilePic || emp.photo_url} />
                                        <AvatarFallback className="text-xs bg-indigo-500/20">
                                            {getInitials(emp.fullName || emp.name || 'UN')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-white truncate">{emp.fullName || emp.name}</p>
                                        <p className="text-xs text-gray-400 truncate">{emp.title || emp.position}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-sm text-gray-400 py-2">No team members found</div>
                        )}
                    </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                    <Button
                        onClick={() => onDraftMessage && onDraftMessage(fund)}
                        className="flex-1 bg-purple-600 hover:bg-purple-500 text-white text-sm h-9 md:h-10"
                    >
                        Draft Message
                    </Button>

                    {(linkedinUrl || websiteUrl) && (
                        <Button
                            variant="outline"
                            size="icon"
                            className="border-white/10 hover:border-white/20 hover:bg-white/5 h-9 w-9 md:h-10 md:w-10"
                            onClick={() => window.open(linkedinUrl || websiteUrl, '_blank')}
                        >
                            {linkedinUrl ? (
                                <Linkedin className="w-4 h-4 text-blue-400" />
                            ) : (
                                <ExternalLink className="w-4 h-4 text-gray-400" />
                            )}
                        </Button>
                    )}
                </div>

                {/* Subtle bottom indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
        </motion.div>
    );
}
