'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Linkedin, MapPin, TrendingUp, Sparkles, Building2, Quote, Zap, ExternalLink, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { selectDynamicLayout, DynamicField } from '@/lib/dynamicCardLayouts';

interface FundCardProps {
    fund: any;
    score: number;
    breakdown: any;
    onDraftMessage?: (fund: any) => void;
    onSave?: (fund: any) => void;
    isSaved?: boolean;
    query?: string;
}

const getInitials = (n: string) => n.split(' ').map(p => p[0]).join('').toUpperCase().slice(0, 2);

// --- 1. Compact Layout ---
function CompactLayout({ data, score, handlers }: { data: any, score: number, handlers: any }) {
    const { name, headline } = data;
    return (
        <div className="flex items-center gap-4 p-3 hover:bg-indigo-50/30 transition-colors rounded-xl border border-transparent hover:border-indigo-100">
            <Avatar className="h-10 w-10 border border-indigo-100 rounded-lg bg-white">
                <AvatarFallback className="rounded-lg text-indigo-600 font-bold text-xs">{getInitials(name)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                    <h3 className="text-sm font-bold text-indigo-950 truncate">{name}</h3>
                    <Badge variant="outline" className="text-[10px] text-indigo-400 border-indigo-100">Fund</Badge>
                </div>
            </div>
            <div className={`px-2 py-1 rounded-md text-xs font-bold ${score > 0.7 ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'}`}>
                {Math.round(score * 100)}%
            </div>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={handlers.draft}>
                <Sparkles className="w-4 h-4 text-indigo-500" />
            </Button>
        </div>
    );
}

// --- 2. Standard Layout ---
function StandardLayout({ data, score, dynamicFields, handlers, expanded }: { data: any, score: number, dynamicFields: DynamicField[], handlers: any, expanded: boolean }) {
    const { name, headline, location, profilePic, categoryTags } = data;
    const { onExpand } = handlers;

    return (
        <div className="p-5">
            <div className="flex items-start gap-4">
                <Avatar className="h-14 w-14 border-2 border-white shadow-sm rounded-xl">
                    <AvatarImage src={profilePic} />
                    <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-cyan-500 text-white font-bold rounded-xl">{getInitials(name)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-indigo-950 flex items-center gap-2">
                        {name}
                        <TrendingUp className="w-4 h-4 text-emerald-500" />
                    </h3>
                    <p className="text-sm text-indigo-900/60 line-clamp-1">{headline}</p>
                    {location && (
                        <div className="flex items-center gap-1 mt-1 text-xs text-indigo-400">
                            <MapPin className="w-3 h-3" /> {location.split(',')[0]}
                        </div>
                    )}
                </div>
                <div className="flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-indigo-50 border-2 border-indigo-100">
                    <span className="text-xl font-bold text-indigo-600">{Math.round(score * 100)}</span>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
                {categoryTags.map((tag: string, i: number) => (
                    <Badge key={i} variant="secondary" className="bg-white border-indigo-100 text-indigo-600 hover:bg-indigo-50">
                        {tag}
                    </Badge>
                ))}
            </div>

            {/* Smart Thesis Preview */}
            {dynamicFields.find(f => f.component === 'investment_thesis') && (
                <div className="mt-4 p-3 bg-indigo-50/30 rounded-lg border border-indigo-50">
                    <div className="flex gap-2">
                        <Quote className="w-4 h-4 text-indigo-300 shrink-0" />
                        <p className="text-xs font-medium text-indigo-900 italic line-clamp-2">
                            {dynamicFields.find(f => f.component === 'investment_thesis')?.value}
                        </p>
                    </div>
                </div>
            )}

            <div className="mt-4 pt-4 border-t border-indigo-50 flex justify-between items-center">
                <Button variant="ghost" size="sm" onClick={onExpand} className="text-indigo-500 hover:bg-indigo-50">
                    {expanded ? "Collapse" : "View Details"}
                </Button>
                <Button size="sm" onClick={handlers.draft} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg">
                    <Sparkles className="w-3.5 h-3.5 mr-2" /> Intro
                </Button>
            </div>
        </div>
    );
}

// --- 3. Rich Layout ---
function RichLayout({ data, score, dynamicFields, breakdown, handlers, expanded }: { data: any, score: number, dynamicFields: DynamicField[], breakdown: any, handlers: any, expanded: boolean }) {
    const { name, headline, location, categoryTags } = data;
    const { onExpand } = handlers;

    const thesis = dynamicFields.find(f => f.component === 'investment_thesis')?.value;
    const sweetSpot = dynamicFields.find(f => f.component === 'ticket_size')?.value;

    return (
        <div className="p-0">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-indigo-100/50">
                <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                        <Avatar className="h-16 w-16 border-4 border-white shadow-lg rounded-xl bg-white">
                            <AvatarFallback className="bg-blue-600 text-white text-xl rounded-xl">{getInitials(name)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="text-2xl font-bold text-indigo-950 tracking-tight flex items-center gap-2">
                                {name} <Building2 className="w-5 h-5 text-indigo-400" />
                            </h3>
                            <p className="text-base text-indigo-600 font-medium mt-0.5">{headline}</p>
                            <div className="flex gap-2 mt-2">
                                {location && <Badge variant="outline" className="bg-white/50 text-indigo-700 border-indigo-200">{location}</Badge>}
                                <Badge className="bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200">{Math.round(score * 100)}% Match</Badge>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {categoryTags.map((tag: string, i: number) => (
                            <span key={i} className="px-3 py-1 rounded-md bg-white border border-indigo-100 text-indigo-600 text-xs font-bold shadow-sm">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="prose prose-indigo prose-sm">
                        <h4 className="text-indigo-950 font-bold mb-2 flex items-center gap-2">
                            <Zap className="w-4 h-4 text-amber-500" /> Investment Thesis
                        </h4>
                        <p className="text-slate-600 leading-relaxed">
                            {thesis || "No specific thesis available."}
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-indigo-50/30 rounded-xl border border-indigo-50">
                            <p className="text-xs font-bold text-indigo-400 uppercase">Sweet Spot</p>
                            <p className="text-lg font-bold text-indigo-900">{sweetSpot || "N/A"}</p>
                        </div>
                        {dynamicFields.filter(f => f.component === 'focused_round' || f.component === 'stage_tags').slice(0, 1).map((f, i) => (
                            <div key={i} className="p-4 bg-indigo-50/30 rounded-xl border border-indigo-50">
                                <p className="text-xs font-bold text-indigo-400 uppercase">{f.label}</p>
                                <p className="text-lg font-bold text-indigo-900">{f.value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="bg-white rounded-xl border border-indigo-100 p-4 shadow-sm">
                        <h4 className="font-bold text-indigo-950 mb-3">Analysis</h4>
                        <p className="text-sm text-slate-500 italic mb-4">
                            {breakdown?.reasoning || "Strong sector alignment detected based on recent fund activity."}
                        </p>
                        <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20" onClick={handlers.draft}>
                            Draft Outreach
                        </Button>
                        <Button variant="ghost" className="w-full mt-2 text-indigo-500" onClick={onExpand}>
                            {expanded ? "Collapse Info" : "View Full Profile"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- Main Component ---
export default function FundCard(props: FundCardProps) {
    const { fund, query, onDraftMessage, onSave } = props;
    const [isExpanded, setIsExpanded] = useState(false);

    if (!fund) return null;

    // Use Dynamic Layout System
    const layout = selectDynamicLayout(fund, 'fund', query);
    const dynamicFields = layout.fields;

    const name = fund.name || fund.fullName || 'Unknown Fund';
    const headline = fund.short_description || fund.description || '';
    const location = fund.hq_location || fund.location || 'Global';
    const profilePic = fund.logo_url || fund.profilePic || '';

    // Quick Category Extraction
    const categories = (fund.categories || fund.categories_strong_en || fund.category_keywords || '');
    const categoryTags = (typeof categories === 'string' ? categories.replace(/[\[\]'"]/g, '').split(',') : [])
        .slice(0, 3)
        .map((c: string) => c.trim())
        .filter(Boolean);

    // Handlers
    const handlers = {
        draft: (e: any) => { e.stopPropagation(); onDraftMessage && onDraftMessage(fund); },
        save: (e: any) => { e.stopPropagation(); onSave && onSave(fund); },
        onExpand: (e: any) => { e.stopPropagation(); setIsExpanded(!isExpanded); }
    };

    const data = { name, headline, location, profilePic, categoryTags };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                "group relative bg-white dark:bg-white/5 rounded-2xl overflow-hidden transition-all duration-300",
                layout.template === 'compact' ? "hover:shadow-md" : "hover:shadow-2xl hover:shadow-indigo-500/10 border border-indigo-50 dark:border-white/10"
            )}
        >
            {/* Template Switch */}
            {layout.template === 'compact' && (
                <CompactLayout data={data} score={props.score} handlers={handlers} />
            )}

            {layout.template === 'standard' && (
                <StandardLayout
                    data={data} score={props.score}
                    dynamicFields={dynamicFields} handlers={handlers} expanded={isExpanded}
                />
            )}

            {layout.template === 'rich' && (
                <RichLayout
                    data={data} score={props.score}
                    dynamicFields={dynamicFields} breakdown={props.breakdown}
                    handlers={handlers} expanded={isExpanded}
                />
            )}

            {/* Expanded Content */}
            <AnimatePresence>
                {isExpanded && layout.template !== 'compact' && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-slate-50/50 dark:bg-black/20 border-t border-indigo-50 px-6 py-4"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {dynamicFields.map((f, i) => (
                                <div key={i}>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">{f.label}</p>
                                    <p className="text-sm text-slate-700">{Array.isArray(f.value) ? f.value.join(', ') : f.value}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
