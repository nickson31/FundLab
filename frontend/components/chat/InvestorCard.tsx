'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Linkedin, Building2, MapPin, Maximize2 } from 'lucide-react';

interface InvestorCardProps {
    investor: any;
    type: 'angel' | 'fund';
    score: number;
    breakdown: any;
    onDraftMessage?: (investor: any) => void;
}

export default function InvestorCard({ investor, type, score, breakdown, onDraftMessage }: InvestorCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const name = investor.fullName || investor.name;
    const headline = investor.headline || investor.short_description;
    const about = investor.about || investor.description;
    const location = investor.addressWithCountry || (investor.location_identifiers || []).join(', ');

    return (
        <div
            className="group relative flex flex-col items-start gap-4 p-5 rounded-2xl glass-panel border border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-all cursor-pointer overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="flex items-start w-full gap-4 relative z-10">
                {/* Refined Picture Section */}
                <div className="relative shrink-0">
                    <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/10 shadow-lg group-hover:shadow-indigo-500/20 transition-all group-hover:scale-105 duration-300">
                        {investor.profilePic ? (
                            <img src={investor.profilePic} alt={name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-indigo-500/20 to-purple-600/20 flex items-center justify-center text-white font-bold text-lg">
                                {name?.charAt(0)}
                            </div>
                        )}
                    </div>
                    {score > 0 && (
                        <div className="absolute -bottom-2 -right-2 bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white px-2 py-0.5 rounded-full shadow-lg">
                            {Math.round(score)}%
                        </div>
                    )}
                </div>

                <div className="flex-1 min-w-0 pt-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="text-base font-semibold text-white tracking-tight truncate group-hover:text-indigo-400 transition-colors">
                            {name}
                        </h3>
                        {/* Action Buttons Overlay */}
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            {investor.linkedinUrl && (
                                <a
                                    href={investor.linkedinUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                                >
                                    <Linkedin className="w-3.5 h-3.5" />
                                </a>
                            )}
                            {investor.website && (
                                <a
                                    href={investor.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                                >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                            )}
                            {onDraftMessage && (
                                <button
                                    onClick={() => onDraftMessage(investor)}
                                    className="p-1.5 rounded-lg text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 transition-colors"
                                >
                                    <Maximize2 className="w-3.5 h-3.5" />
                                </button>
                            )}
                        </div>
                    </div>

                    <p className="text-sm text-gray-400 line-clamp-2 font-light leading-relaxed mb-3">
                        {headline || about || "No description available."}
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {(investor.location_identifiers || []).slice(0, 1).map((loc: string, i: number) => (
                            <span key={i} className="inline-flex items-center gap-1 text-[10px] uppercase font-medium tracking-wider text-gray-500 bg-white/5 px-2 py-1 rounded-md border border-white/5">
                                <MapPin className="w-3 h-3" />
                                {loc}
                            </span>
                        ))}
                        {type === 'angel' && investor.angel_score && (
                            <span className="inline-flex items-center gap-1 text-[10px] uppercase font-medium tracking-wider text-blue-400 bg-blue-500/10 px-2 py-1 rounded-md border border-blue-500/20">
                                Score: {investor.angel_score}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
