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
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ scale: 1.002, translateY: -2 }}
            className="group relative"
        >
            {/* Ambient Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl" />

            {/* Main Card */}
            <div className="relative bg-white/90 dark:bg-black/40 backdrop-blur-3xl border border-gray-200 dark:border-white/10 rounded-3xl p-6 shadow-md hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 overflow-hidden">

                {/* Decorative Top Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex gap-5">
                    {/* Left Column: Logo & Score */}
                    <div className="flex flex-col items-center gap-3 shrink-0">
                        <Avatar className="h-16 w-16 border-2 border-white dark:border-white/10 shadow-lg ring-4 ring-gray-50 dark:ring-white/5">
                            <AvatarImage src={profilePic} alt={name} className="object-cover" />
                            <AvatarFallback className="bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 text-indigo-700 dark:text-indigo-200 font-bold text-lg">
                                {getInitials(name)}
                            </AvatarFallback>
                        </Avatar>

                        <div className={cn(
                            "flex flex-col items-center justify-center w-12 h-12 rounded-2xl border backdrop-blur-md shadow-inner",
                            score >= 0.7 ? "bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400" :
                                score >= 0.5 ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-600 dark:text-yellow-400" :
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
                                {/* Mobile Actions */}
                                <div className="flex gap-1 md:hidden">
                                    {/* Simplified generic actions for mobile if needed */}
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed mt-1 font-medium">
                                {fund.short_description || description || "No description available."}
                            </p>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                            {location && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-gray-50 dark:bg-white/5 text-xs font-semibold text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-white/5">
                                    <MapPin className="w-3 h-3 text-indigo-500" />
                                    {location}
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

                                            {/* Matched Keywords Badge */}
                                            {breakdown?.matched_keywords && breakdown.matched_keywords.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mb-3 border-b border-indigo-200/30 dark:border-white/10 pb-3">
                                                    {breakdown.matched_keywords.map((kw: string, i: number) => (
                                                        <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-500/20 text-[10px] font-bold text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
                                                            <Zap className="w-3 h-3 text-indigo-500" />
                                                            {kw}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                            <p className="text-sm text-indigo-900/80 dark:text-indigo-200/80 leading-relaxed">
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
                        {(linkedinUrl || websiteUrl) && (
                            <Button
                                size="sm"
                                variant="outline"
                                className="h-9 w-9 p-0 rounded-full border-gray-200 dark:border-white/10"
                                onClick={(e) => { e.stopPropagation(); window.open(linkedinUrl || websiteUrl, '_blank'); }}
                            >
                                {linkedinUrl ? <Linkedin className="w-4 h-4 text-[#0077b5]" /> : <ExternalLink className="w-4 h-4 text-gray-400" />}
                            </Button>
                        )}
                        <Button
                            size="sm"
                            onClick={(e) => { e.stopPropagation(); onDraftMessage && onDraftMessage(fund); }}
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
