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
function RichLayout({ data, score, dynamicFields, breakdown, handlers, expanded }: { data: any, score: number, dynamicFields: DynamicField[], breakdown: any, handlers: any, expanded: boolean }) {
    const { investor, name, headline, location, categoryTags } = data;
    const { onExpand } = handlers;

    // Rich layout highlights the "Story"
    const thesis = dynamicFields.find(f => f.component === 'investment_thesis' || f.component === 'about')?.value;
    const portfolio = dynamicFields.find(f => f.component === 'portfolio_companies' || f.component === 'recent_investments');

    return (
        <div className="p-0">
            {/* Header / Banner */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 border-b border-indigo-100/50">
                <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                        <Avatar className="h-16 w-16 border-4 border-white shadow-lg bg-indigo-100">
                            <AvatarFallback className="bg-indigo-600 text-white text-xl">{getInitials(name)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="text-2xl font-bold text-indigo-950 tracking-tight">{name}</h3>
                            <p className="text-base text-indigo-600 font-medium mt-0.5">{headline}</p>
                            <div className="flex gap-2 mt-2">
                                {location && <Badge variant="outline" className="bg-white/50 text-indigo-700 border-indigo-200">{location}</Badge>}
                                <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200">{Math.round(score * 100)}% Match</Badge>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column: Thesis/Bio */}
                <div className="md:col-span-2 space-y-6">
                    {breakdown?.matched_keywords?.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {breakdown.matched_keywords.map((kw: string, i: number) => (
                                <span key={i} className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center gap-1">
                                    <Zap className="w-3 h-3" /> {kw}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="prose prose-indigo prose-sm">
                        <div className="relative pl-4 border-l-4 border-indigo-200">
                            <Quote className="absolute -top-2 -left-3 w-4 h-4 text-indigo-300 bg-white" />
                            <p className="text-indigo-900/80 italic text-lg leading-relaxed">
                                {thesis || "Expert investor focused on high-growth technology sectors with a proven track record of scaling startups."}
                            </p>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {dynamicFields.filter(f => ['ticket_size', 'stage_tags', 'category_tags'].includes(f.component)).slice(0, 4).map((f, i) => (
                            <div key={i} className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                <p className="text-[10px] uppercase font-bold text-slate-400">{f.label}</p>
                                <p className="font-semibold text-slate-700">{Array.isArray(f.value) ? f.value.join(', ') : f.value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Portfolio & Actions */}
                <div className="space-y-4">
                    <div className="bg-white rounded-xl border border-indigo-100 p-4 shadow-sm">
                        <h4 className="font-bold text-indigo-950 flex items-center gap-2 mb-3">
                            <Briefcase className="w-4 h-4 text-indigo-500" /> Recent Activity
                        </h4>
                        {portfolio ? (
                            <p className="text-sm text-slate-600">
                                {String(portfolio.value).split(',').map(p => p.trim()).slice(0, 5).join(', ')}...
                            </p>
                        ) : (
                            <p className="text-sm text-slate-400 italic">No public portfolio data available.</p>
                        )}
                        <Button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20" onClick={handlers.draft}>
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
