'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Linkedin, Building2, MapPin, Maximize2, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InvestorCardProps {
    investor: any;
    type: 'angel' | 'fund';
    score: number;
    breakdown: any;
    onDraftMessage?: (investor: any) => void;
    onSave?: (investor: any) => void;
    isSaved?: boolean;
}

export default function InvestorCard({ investor, type, score, breakdown, onDraftMessage, onSave, isSaved = false }: InvestorCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [saved, setSaved] = useState(isSaved);

    const name = investor.fullName || investor.name || 'Unknown Investor';
    const headline = investor.headline || investor.short_description || investor.description || '';
    const about = investor.about || investor.description || '';

    // Handle "messy" raw keys for funds/angels
    const rawLocation = investor['location_identifiers/0/value'] ?
        [investor['location_identifiers/0/value'], investor['location_identifiers/1/value'], investor['location_identifiers/2/value']].filter(Boolean).join(', ') :
        null;

    const location = investor.addressWithCountry || rawLocation || (investor.location_identifiers || []).join(', ') || 'Global';

    const linkedinUrl = investor.linkedinUrl || investor['linkedin/value'] || '';
    const websiteUrl = investor.websiteUrl || investor['website/value'] || '';
    const email = investor.email || investor.contact_email || '';
    const profilePic = investor.profilePic;

    const handleSave = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSaved(!saved);
        if (onSave) onSave(investor);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group relative flex flex-col items-start gap-4 p-6 rounded-3xl glass-premium hover:border-white/20 hover:bg-white/[0.04] transition-all cursor-pointer overflow-hidden shadow-2xl shadow-indigo-500/5 ring-1 ring-white/5"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Cinematic Gradient Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out" />

            {/* Noise Texture */}
            <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay" />

            {/* Header Section */}
            <div className="flex items-start w-full gap-5 relative z-10">
                {/* Avatar with Glow for High Match */}
                <div className="relative shrink-0">
                    <div className={cn(
                        "w-16 h-16 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:scale-105",
                        score > 85 ? "ring-2 ring-indigo-500/50 shadow-indigo-500/20" : "border border-white/10"
                    )}>
                        {profilePic ? (
                            <img src={profilePic} alt={name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center text-white/50 font-bold text-xl font-heading">
                                {name?.charAt(0)}
                            </div>
                        )}
                    </div>
                    {/* Floating Match Score */}
                    {score > 0 && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="absolute -bottom-3 -right-3 bg-[#0A0A0A] border border-white/10 text-[11px] font-bold text-white px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1"
                        >
                            <span className={score > 80 ? "text-green-400" : "text-indigo-400"}>
                                {Math.round(score)}%
                            </span>
                        </motion.div>
                    )}
                </div>

                <div className="flex-1 min-w-0 pt-0.5">
                    <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="text-lg font-bold font-heading text-white tracking-tight truncate group-hover:text-indigo-300 transition-colors">
                            {name}
                        </h3>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-1">
                            {/* Save Button */}
                            {onSave && (
                                <motion.button
                                    whileTap={{ scale: 0.8 }}
                                    onClick={handleSave}
                                    className={cn(
                                        "p-2 rounded-xl transition-all duration-300",
                                        saved ? "text-red-500 bg-red-500/10" : "text-gray-500 hover:text-red-400 hover:bg-white/5"
                                    )}
                                >
                                    <Heart className={cn("w-4 h-4", saved && "fill-current")} />
                                </motion.button>
                            )}

                            {/* External Links */}
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                                {linkedinUrl && (
                                    <a
                                        href={linkedinUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-xl text-gray-400 hover:text-blue-400 hover:bg-white/5 transition-colors"
                                    >
                                        <Linkedin className="w-4 h-4" />
                                    </a>
                                )}
                                {websiteUrl && (
                                    <a
                                        href={websiteUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-xl text-gray-400 hover:text-emerald-400 hover:bg-white/5 transition-colors"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    <p className="text-sm text-gray-400 line-clamp-2 font-normal leading-relaxed mb-4 text-balance">
                        {headline || about || "No description available."}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {/* Thesis Tags */}
                        {((investor.categories_strong_en || investor.categories_general_en || "").split(',').slice(0, 3) || []).map((tag: string, i: number) => (
                            <span key={`thesis-${i}`} className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-indigo-300 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20">
                                <Building2 className="w-3 h-3 text-indigo-400" />
                                {tag.trim()}
                            </span>
                        ))}
                        {/* Location Tags */}
                        {(investor.location_identifiers || []).slice(0, 1).map((loc: string, i: number) => (
                            <span key={`loc-${i}`} className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-gray-400 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
                                <MapPin className="w-3 h-3 text-gray-500" />
                                {loc}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Action Overlay (Draft Message) */}
            {onDraftMessage && (
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <Button
                        size="sm"
                        onClick={(e) => { e.stopPropagation(); onDraftMessage(investor); }}
                        className="bg-white text-black hover:bg-indigo-50 font-bold rounded-xl shadow-lg shadow-white/5"
                    >
                        <Maximize2 className="w-4 h-4 mr-2" />
                        Draft
                    </Button>
                </div>
            )}
        </motion.div>
    );
}
