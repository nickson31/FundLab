'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Linkedin, MapPin, TrendingUp, Sparkles, CheckCircle2, ChevronDown, ChevronUp, ExternalLink, Zap, Quote, GraduationCap, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Investor, MatchBreakdown, AngelInvestor, InvestmentFund } from '@/types/investor';
import { selectDynamicLayout, CardLayout, DynamicField } from '@/lib/dynamicCardLayouts';

// --- Shared Types & Helpers ---
interface InvestorCardProps {
    investor: Investor;
    score: number;
    breakdown: MatchBreakdown;
    onDraftMessage?: (investor: Investor) => void;
    onSave?: (investor: Investor) => void;
    isSaved?: boolean;
    query?: string;
}

const getInitials = (n: string) => n.split(' ').map(p => p[0]).join('').toUpperCase().slice(0, 2);

// --- 1. Compact Layout (List View, Minimal) ---
function CompactLayout({ data, score, handlers }: { data: any, score: number, handlers: any }) {
    const { investor, name, headline, location } = data;
    return (
        <div className="flex items-center gap-4 p-3 hover:bg-indigo-50/30 transition-colors rounded-xl border border-transparent hover:border-indigo-100">
            <Avatar className="h-10 w-10 border border-indigo-100 bg-white">
                <AvatarFallback className="text-indigo-600 font-bold text-xs">{getInitials(name)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                    <h3 className="text-sm font-bold text-indigo-950 truncate">{name}</h3>
                    <span className="text-xs text-indigo-400 truncate max-w-[150px]">{headline}</span>
                </div>
            </div>
            {/* Minimal Score */}
            <div className={`px-2 py-1 rounded-md text-xs font-bold ${score > 0.7 ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'}`}>
                {Math.round(score * 100)}%
            </div>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={handlers.draft}>
                <Sparkles className="w-4 h-4 text-indigo-500" />
            </Button>
        </div>
    );
}

// --- 2. Standard Layout (Classic Card) ---
function StandardLayout({ data, score, dynamicFields, breakdown, handlers, expanded }: { data: any, score: number, dynamicFields: DynamicField[], breakdown: any, handlers: any, expanded: boolean }) {
    const { investor, name, headline, location, categoryTags } = data;
    const { onExpand } = handlers;

    return (
        <div className="p-5">
            <div className="flex items-start gap-4">
                <Avatar className="h-14 w-14 border-2 border-white shadow-sm bg-indigo-50">
                    <AvatarFallback className="text-indigo-700 font-bold text-lg">{getInitials(name)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-indigo-950">{name}</h3>
                    <p className="text-sm text-indigo-900/60 line-clamp-1">{headline}</p>
                    {location && (
                        <div className="flex items-center gap-1 mt-1 text-xs text-indigo-400">
                            <MapPin className="w-3 h-3" /> {location.split(',')[0]}
                        </div>
                    )}
                </div>
                {/* Score Circle */}
                <div className="flex flex-col items-center justify-center w-14 h-14 rounded-full bg-indigo-50 border-2 border-indigo-100">
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

            {/* Dynamic "Best Field" */}
            {dynamicFields[0]?.priority > 30 && (
                <div className="mt-4 p-3 bg-indigo-50/50 rounded-lg border border-indigo-100">
                    <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">{dynamicFields[0].label}</p>
                    <p className="text-sm font-medium text-indigo-900 mt-0.5 line-clamp-2">
                        {dynamicFields[0].value}
                    </p>
                </div>
            )}

            <div className="mt-4 pt-4 border-t border-indigo-50 flex justify-between items-center">
                <Button variant="ghost" size="sm" onClick={onExpand} className="text-indigo-500 hover:bg-indigo-50">
                    {expanded ? "Collapse" : "View Details"}
                </Button>
                <Button size="sm" onClick={handlers.draft} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full">
                    <Sparkles className="w-3.5 h-3.5 mr-2" /> Draft Intro
                </Button>
            </div>
        </div>
    );
}

// --- 3. Rich Layout (Magazine Style, High Data) ---
function RichLayout({ data, score, dynamicFields, breakdown, handlers, expanded, smartData }: { data: any, score: number, dynamicFields: DynamicField[], breakdown: any, handlers: any, expanded: boolean, smartData?: any }) {
    const { investor, name, headline, location } = data;
    const { onExpand } = handlers;

    // Use Smart Data if available, otherwise fall back to best-effort dynamic fields
    const summary = smartData?.oneLineSummary || headline;
    const explanation = smartData?.generalExplanation || dynamicFields.find(f => f.component === 'investment_thesis')?.value;
    const expertise = smartData?.expertises || dynamicFields.filter(f => f.component === 'category_tags').slice(0, 3).map(f => f.value).flat();
    const nuggets = smartData?.goldenNuggets || [];

    // Colors for expertise chips
    const chipColors = [
        "bg-rose-100 text-rose-700 border-rose-200",
        "bg-blue-100 text-blue-700 border-blue-200",
        "bg-amber-100 text-amber-700 border-amber-200", // Amber is distinct from "Orange" allowed here? User said "No Orange" previously, let's substitute Amber for Violet/Emerald if risky.
        "bg-emerald-100 text-emerald-700 border-emerald-200"
    ];
    // Safe Palette avoids "Orange"
    const safeChipColors = [
        "bg-pink-100 text-pink-700 border-pink-200",
        "bg-indigo-100 text-indigo-700 border-indigo-200",
        "bg-purple-100 text-purple-700 border-purple-200",
        "bg-emerald-100 text-emerald-700 border-emerald-200"
    ];

    const linkedInUrl = investor.linkedinUrl || investor.website_url;

    return (
        <div className="p-0 flex flex-col h-full bg-white dark:bg-white/5">
            {/* 1. Header: Name & Score */}
            <div className="p-6 pb-2">
                <div className="flex justify-between items-start gap-4">
                    <div className="flex gap-4">
                        {/* No Photo, just sleek initials */}
                        <div className="w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-indigo-500/20">
                            {getInitials(name)}
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-indigo-950 dark:text-white tracking-tight leading-tight">{name}</h3>
                            {/* 3. Location */}
                            <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
                                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                {location}
                            </div>
                        </div>
                    </div>
                    {/* 4. Score Circle */}
                    <div className="flex flex-col items-center">
                        <div className="relative flex items-center justify-center w-14 h-14">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="28" cy="28" r="26" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-100 dark:text-white/10" />
                                <circle cx="28" cy="28" r="26" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray={163} strokeDashoffset={163 - (163 * score)} className="text-indigo-500 transition-all duration-1000 ease-out" />
                            </svg>
                            <span className="absolute text-lg font-bold text-indigo-600 dark:text-indigo-400">{Math.round(score * 100)}</span>
                        </div>
                        <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider mt-1">{smartData?.matchLabel || "Match"}</span>
                    </div>
                </div>

                {/* 2. One Liner Summary */}
                <p className="mt-4 text-base font-medium text-indigo-900/80 dark:text-indigo-200 leading-snug">
                    {summary}
                </p>
            </div>

            {/* 5. Expertise Chips (Colored) */}
            <div className="px-6 py-2 flex flex-wrap gap-2">
                {expertise && expertise.map((tag: string, i: number) => (
                    <span key={i} className={cn("px-3 py-1.5 rounded-lg text-xs font-bold border capitalize shadow-sm", safeChipColors[i % safeChipColors.length])}>
                        {tag}
                    </span>
                ))}
            </div>

            {/* Body Content */}
            <div className="p-6 pt-4 space-y-6">

                {/* 6. General Explanation */}
                <div className="bg-slate-50 dark:bg-black/20 p-4 rounded-xl border border-slate-100 dark:border-white/5">
                    <div className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                        <div>
                            <h4 className="text-xs font-bold text-indigo-900 dark:text-indigo-300 uppercase mb-1">Why this match?</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                {explanation || "This investor's thesis strongly aligns with your sector and stage."}
                            </p>
                        </div>
                    </div>
                </div>

                {/* 7. Golden Nuggets */}
                {nuggets.length > 0 && (
                    <div className="space-y-3">
                        <h4 className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
                            <Zap className="w-3 h-3" /> Key Insights
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {nuggets.map((nugget: any, i: number) => (
                                <div key={i} className="bg-white dark:bg-white/5 p-3 rounded-lg border border-indigo-50 dark:border-white/10 hover:border-indigo-200 transition-colors">
                                    <p className="text-[10px] font-bold text-indigo-500 uppercase mb-1">{nugget.title}</p>
                                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{nugget.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 8 & 9 Actions */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-white/5">
                    <Button
                        onClick={handlers.draft}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-6 rounded-xl shadow-lg shadow-indigo-500/20 active:scale-95 transition-all"
                    >
                        <span className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-indigo-200" />
                            Generate Message
                        </span>
                    </Button>

                    {linkedInUrl && (
                        <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className="shrink-0">
                            <Button variant="outline" className="h-14 w-14 rounded-xl border-2 border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-all p-0 flex items-center justify-center">
                                <Linkedin className="w-6 h-6" />
                            </Button>
                        </a>
                    )}
                </div>

            </div>
        </div>
    );
}

// --- Main Component ---
export default function InvestorCard(props: InvestorCardProps) {
    const { investor, query, onDraftMessage, onSave } = props;
    const [isExpanded, setIsExpanded] = useState(false);

    if (!investor) return null;

    // Use Dynamic Layout System
    const layout = selectDynamicLayout(investor, 'angel', query);
    const dynamicFields = layout.fields;

    // Data Preparation
    const isAngel = (inv: Investor): inv is AngelInvestor => 'angel_score' in inv;
    const isFund = (inv: Investor): inv is InvestmentFund => !isAngel(inv);

    const name = 'fullName' in investor ? investor.fullName : ('name' in investor ? investor.name : 'Unknown');
    const headline = 'headline' in investor ? investor.headline : '';
    const location = ('addressWithCountry' in investor ? investor.addressWithCountry : null) || ('location_city' in investor ? `${investor.location_city}, ${investor.location_country}` : 'Global');
    const profilePic = 'profilePic' in investor ? investor.profilePic : undefined;

    // Quick Category Extraction
    const categories = isAngel(investor)
        ? (investor.categories_strong_en || investor.categories_general_en || '').split(',')
        : (investor as any).category_keywords?.replace(/[\[\]'"]/g, '').split(',') || [];
    const categoryTags = categories.filter(Boolean).map((s: string) => s.trim()).slice(0, 3);

    // Handlers
    const handlers = {
        draft: (e: any) => { e.stopPropagation(); onDraftMessage && onDraftMessage(investor); },
        save: (e: any) => { e.stopPropagation(); onSave && onSave(investor); },
        onExpand: (e: any) => { e.stopPropagation(); setIsExpanded(!isExpanded); }
    };

    const data = { investor, name, headline, location, profilePic, categoryTags };

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
                    dynamicFields={dynamicFields} breakdown={props.breakdown}
                    handlers={handlers} expanded={isExpanded}
                />
            )}

            {layout.template === 'rich' && (
                <RichLayout
                    data={data} score={props.score}
                    dynamicFields={dynamicFields} breakdown={props.breakdown}
                    handlers={handlers} expanded={isExpanded}
                    smartData={layout.smartData}
                />
            )}

            {/* Expanded Content (Shared for Standard/Rich mostly) */}
            <AnimatePresence>
                {isExpanded && layout.template !== 'compact' && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-slate-50/50 dark:bg-black/20 border-t border-indigo-50 px-6 py-4"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {dynamicFields.slice(4).map((f, i) => (
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
