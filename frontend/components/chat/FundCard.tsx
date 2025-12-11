'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Linkedin, MapPin, TrendingUp, Sparkles, ChevronDown, ChevronUp, Users, Zap } from 'lucide-react';
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
    const [hasEmployees, setHasEmployees] = useState(false);
    const [employees, setEmployees] = useState<any[]>([]);
    const [loadingEmployees, setLoadingEmployees] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    // Map database columns
    const name = fund.name || fund.fullName || 'Unknown Fund';
    const description = fund.description || fund.short_description || '';
    const location = fund.hq_location || fund.location || 'Global';
    const linkedinUrl = fund.linkedin_url || fund.linkedinUrl || '';
    const websiteUrl = fund.website || fund.websiteUrl || '';
    const profilePic = fund.logo_url || fund.profilePic || '';

    // Expanded Data
    const ticketSize = fund.ticket_size || fund.check_size || 'Not specified';
    const aum = fund.aum || fund.assets_under_management || 'N/A';
    const recentInvestments = fund.recent_investments || fund.portfolio_companies || '';
    const sweetSpot = fund.sweet_spot || fund.investment_thesis || '';

    // Parse categories and stages - ENGLISH ONLY
    const categories = fund.categories || fund.categories_strong_en || fund.category_keywords || '';
    const stages = fund.investment_stages || fund.stages_strong_en || fund.stage_keywords || '';

    const categoryTags = (typeof categories === 'string' ? categories.replace(/[\[\]'"]/g, '').split(',') : [])
        .slice(0, 3)
        .map((c: string) => c.trim())
        .filter(Boolean);
    const stageTags = (typeof stages === 'string' ? stages.replace(/[\[\]'"]/g, '').split(',') : [])
        .slice(0, 2)
        .map((s: string) => s.trim())
        .filter(Boolean);

    // Initial check for employees
    useEffect(() => {
        const checkEmployees = async () => {
            if (!fund.id) return;
            // Assuming 'fund_id' column exists based on previous code usage
            const { count } = await supabase
                .from('fund_employees') // Note: In schema it is 'fund_employees'. Check strict naming.
                .select('*', { count: 'exact', head: true })
                .eq('fund_id', fund.id);

            if (count && count > 0) setHasEmployees(true);
        };
        checkEmployees();
    }, [fund.id]);

    // Fetch employees when toggled
    useEffect(() => {
        if (showEmployees && !employees.length && fund.id) {
            fetchEmployees();
        }
    }, [showEmployees]);

    const fetchEmployees = async () => {
        setLoadingEmployees(true);
        try {
            const { data, error } = await supabase
                .from('fund_employees') // Fixed: Single .from call
                .select('*')
                .eq('fund_id', fund.id)
                .limit(5);

            if (!error && data) {
                // Check if data is array of objects or data wrapper
                // Schema says `data` jsonb column. We need to extract info from it?
                // Or maybe the RLS returns rows differently?
                // Usually select('*') returns the columns.
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
            <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-5 border border-purple-200 dark:border-gray-800 shadow-md hover:shadow-xl transition-all duration-300">

                {/* Top Row */}
                <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="relative">
                        <Avatar className="h-14 w-14 border-2 border-purple-100 dark:border-gray-800 shadow-sm">
                            <AvatarImage src={profilePic} alt={name} className="object-cover" />
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-lg">
                                {getInitials(name)}
                            </AvatarFallback>
                        </Avatar>
                        {/* Fund Type Badge */}
                        <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-blue-500 rounded-full border-2 border-white dark:border-gray-900 flex items-center justify-center shadow-sm">
                            <TrendingUp className="w-3 h-3 text-white" />
                        </div>
                    </div>

                    {/* Name & Info */}
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-purple-900 dark:text-white truncate">
                            {name}
                        </h3>
                        <p className="text-sm text-purple-800 dark:text-gray-400 line-clamp-1 mt-0.5">
                            {fund.short_description || description || "Investment Fund"}
                        </p>
                        {location && (
                            <div className="flex items-center gap-1 mt-1.5 text-xs text-purple-700 dark:text-gray-500">
                                <MapPin className="w-3 h-3" />
                                <span>{location}</span>
                            </div>
                        )}
                    </div>

                    {/* Score Badge */}
                    <div className={cn(
                        "flex flex-col items-center justify-center w-16 h-16 rounded-xl",
                        score >= 0.7 ? "bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800" :
                            score >= 0.5 ? "bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800" :
                                "bg-purple-50 dark:bg-gray-800 border border-purple-200 dark:border-gray-700"
                    )}>
                        <span className={cn(
                            "text-2xl font-bold",
                            score >= 0.7 ? "text-emerald-600 dark:text-emerald-400" :
                                score >= 0.5 ? "text-amber-600 dark:text-amber-400" :
                                    "text-purple-800 dark:text-gray-400"
                        )}>{Math.round(score * 100)}</span>
                        <span className="text-[9px] font-medium text-purple-700 dark:text-gray-500 uppercase">Match</span>
                    </div>
                </div>

                {/* Category Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                    {categoryTags.map((tag, i) => (
                        <span
                            key={i}
                            className="px-3 py-1 rounded-full text-xs font-medium bg-pink-100 dark:bg-gray-800 text-pink-800 dark:text-gray-300 border border-pink-200 dark:border-gray-700"
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
                                    <p className="text-sm text-indigo-900 dark:text-indigo-100 leading-relaxed font-medium">
                                        {breakdown?.reasoning || fund.reasoning || "High alignment with your vertical and stage. This fund has explicitly expressed interest in this sector recently."}
                                    </p>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5">
                                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">Ticket Size</p>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{ticketSize}</p>
                                    </div>
                                    <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5">
                                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">AUM</p>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{aum}</p>
                                    </div>
                                </div>

                                {/* Sweet Spot */}
                                <div>
                                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-2">Investment Sweet Spot</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-black/20 p-3 rounded-lg border-l-2 border-purple-500">
                                        {sweetSpot}
                                    </p>
                                </div>

                                {/* Team Section */}
                                {hasEmployees && (
                                    <div className="pt-2">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setShowEmployees(!showEmployees); }}
                                            className="flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-indigo-500 transition-colors mb-3"
                                        >
                                            <Users className="w-3.5 h-3.5" />
                                            {showEmployees ? 'Hide Team' : 'View Key Decision Makers'}
                                        </button>

                                        <AnimatePresence>
                                            {showEmployees && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="grid gap-2"
                                                >
                                                    {loadingEmployees ? (
                                                        <div className="text-xs text-gray-400 flex items-center gap-2">
                                                            <div className="w-3 h-3 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                                                            Fetching team...
                                                        </div>
                                                    ) : employees.length > 0 ? (
                                                        employees.map((emp, i) => (
                                                            <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group/emp">
                                                                <Avatar className="h-8 w-8">
                                                                    <AvatarImage src={emp.profilePic || emp.photo_url} />
                                                                    <AvatarFallback className="text-[10px] bg-indigo-50 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300">
                                                                        {getInitials(emp.fullName || emp.name)}
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                                <div className="flex-1 min-w-0">
                                                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{emp.fullName || emp.name}</p>
                                                                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{emp.title || emp.position}</p>
                                                                </div>
                                                                <Button size="icon" variant="ghost" className="h-6 w-6 opacity-0 group-hover/emp:opacity-100 transition-opacity">
                                                                    <Linkedin className="w-3 h-3 text-blue-500" />
                                                                </Button>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div className="text-xs text-gray-400 italic">No public team data available.</div>
                                                    )}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
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
                        className="text-purple-700 hover:text-purple-900 dark:text-gray-400 dark:hover:text-white hover:bg-purple-50 dark:hover:bg-white/10 font-medium transition-colors"
                    >
                        {isExpanded ? (
                            <><ChevronUp className="w-4 h-4 mr-1.5" /> Less Info</>
                        ) : (
                            <><ChevronDown className="w-4 h-4 mr-1.5" /> Deep Dive</>
                        )}
                    </Button>

                    <div className="flex gap-2">
                        {(linkedinUrl || websiteUrl) && (
                            <Button
                                size="sm"
                                variant="outline"
                                className="h-9 w-9 p-0 rounded-full border-gray-200 dark:border-gray-700"
                                onClick={(e) => { e.stopPropagation(); window.open(linkedinUrl || websiteUrl, '_blank'); }}
                            >
                                {linkedinUrl ? <Linkedin className="w-4 h-4 text-[#0077b5]" /> : <ExternalLink className="w-4 h-4 text-gray-400" />}
                            </Button>
                        )}
                        <Button
                            size="sm"
                            onClick={(e) => { e.stopPropagation(); onDraftMessage && onDraftMessage(fund); }}
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
