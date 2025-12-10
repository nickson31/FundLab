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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative"
        >
            {/* Hover glow effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/[0.02] to-black/[0.01] dark:from-white/[0.07] dark:to-white/[0.02] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Main card */}
            <div className="relative bg-white/80 dark:bg-black/40 backdrop-blur-md border border-gray-200/50 dark:border-white/[0.08] rounded-2xl p-4 md:p-6 hover:border-gray-300 dark:hover:border-white/[0.15] transition-all duration-500 overflow-hidden shadow-sm dark:shadow-none">

                {/* Header */}
                <div className="flex items-start gap-4 mb-4 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                    {/* Logo */}
                    <Avatar className="h-12 w-12 md:h-14 md:w-14 border-2 border-gray-200 dark:border-white/10 ring-2 ring-purple-500/10 dark:ring-purple-500/20 shrink-0">
                        <AvatarImage src={profilePic} alt={name} />
                        <AvatarFallback className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-500/20 dark:to-pink-500/20 text-purple-700 dark:text-white font-semibold">
                            {getInitials(name)}
                        </AvatarFallback>
                    </Avatar>

                    {/* Name & Score */}
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

                        {/* Summary / Short Description */}
                        <p className={cn("text-xs md:text-sm text-gray-500 dark:text-gray-400 transition-all", isExpanded ? "" : "line-clamp-2")}>
                            {(fund.short_description) || description}
                        </p>
                    </div>
                </div>

                {/* Location & Tags (Always visible) */}
                <div className="mb-4">
                    {location && (
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
                            <MapPin className="w-3 h-3" />
                            <span className="truncate">{location}</span>
                        </div>
                    )}
                    <div className="flex flex-wrap gap-1.5">
                        {categoryTags.map((tag, i) => (
                            <Badge key={i} variant="secondary" className="bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-white/10 text-xs px-2 py-0.5">{tag}</Badge>
                        ))}
                    </div>
                </div>

                {/* Expanded Content */}
                <div className={cn("grid transition-all duration-300 ease-in-out", isExpanded ? "grid-rows-[1fr] opacity-100 mb-4" : "grid-rows-[0fr] opacity-0")}>
                    <div className="overflow-hidden space-y-3">
                        <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
                            <div>
                                <p className="text-[10px] uppercase tracking-wider text-gray-500 font-medium mb-1">Ticket Size</p>
                                <p className="text-sm text-gray-900 dark:text-white font-medium">{ticketSize}</p>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-wider text-gray-500 font-medium mb-1">AUM</p>
                                <p className="text-sm text-gray-900 dark:text-white font-medium">{aum}</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-[10px] uppercase tracking-wider text-gray-500 font-medium mb-1">Sweet Spot</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{sweetSpot}</p>
                            </div>

                            {/* Contact Info */}
                            {(fund.contact_email || fund.phone_number) && (
                                <div className="col-span-2 pt-2 border-t border-gray-200 dark:border-white/10 mt-1">
                                    <p className="text-[10px] uppercase tracking-wider text-gray-500 font-medium mb-1">Contact</p>
                                    <div className="flex flex-col gap-1">
                                        {fund.contact_email && (
                                            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium select-text">{fund.contact_email}</span>
                                        )}
                                        {fund.phone_number && (
                                            <span className="text-xs text-gray-500 dark:text-gray-400 select-text">{fund.phone_number}</span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Employee Toggle (Conditional) */}
                {hasEmployees && (
                    <>
                        <button
                            onClick={() => setShowEmployees(!showEmployees)}
                            className="w-full flex items-center justify-between px-3 py-2 mb-3 rounded-lg bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 transition-colors"
                        >
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                <Users className="w-4 h-4" />
                                <span>Team Members</span>
                            </div>
                            {showEmployees ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>

                        {/* Employees List */}
                        {showEmployees && (
                            <div className="mb-4 space-y-2 animate-[fadeIn_0.3s_ease-out]">
                                {loadingEmployees ? (
                                    <div className="text-center text-sm text-gray-400 py-2">Loading...</div>
                                ) : employees.length > 0 ? (
                                    employees.map((emp, i) => (
                                        <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 dark:bg-white/5">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={emp.profilePic || emp.photo_url || (emp.data && emp.data.profilePic)} />
                                                <AvatarFallback className="text-xs bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-200">
                                                    {getInitials(emp.fullName || emp.name || (emp.data && emp.data.name) || 'UN')}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm text-gray-900 dark:text-white truncate">{emp.fullName || emp.name || (emp.data && emp.data.name)}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{emp.title || emp.position || (emp.data && emp.data.headline)}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center text-sm text-gray-400 py-2">No team members found</div>
                                )}
                            </div>
                        )}
                    </>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2 border-t border-gray-100 dark:border-white/5 mt-auto">
                    <Button
                        onClick={() => onDraftMessage && onDraftMessage(fund)}
                        className="flex-1 bg-purple-600 hover:bg-purple-500 text-white text-sm h-9 md:h-10 shadow-lg shadow-purple-900/20"
                    >
                        Draft Message
                    </Button>

                    <Button
                        variant="ghost"
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 h-9 md:h-10 px-4"
                    >
                        {isExpanded ? 'Less' : 'More'}
                    </Button>

                    {(linkedinUrl || websiteUrl) && (
                        <Button
                            variant="outline"
                            size="icon"
                            className="border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 hover:bg-gray-100 dark:hover:bg-white/5 h-9 w-9 md:h-10 md:w-10 shrink-0"
                            onClick={() => window.open(linkedinUrl || websiteUrl, '_blank')}
                        >
                            {linkedinUrl ? (
                                <Linkedin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
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
