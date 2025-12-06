'use client';

import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Linkedin, Building2, MapPin } from 'lucide-react';

interface InvestorCardProps {
    investor: any;
    type: 'angel' | 'fund';
    score: number;
    breakdown: any;
    onDraftMessage?: (investor: any) => void;
}

export default function InvestorCard({ investor, type, score, breakdown, onDraftMessage }: InvestorCardProps) {
    const name = investor.fullName || investor.name;
    const headline = investor.headline || investor.short_description;
    const about = investor.about || investor.description;
    const location = investor.addressWithCountry || (investor.location_identifiers || []).join(', ');

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="group glass-panel border border-white/5 p-6 rounded-xl transition-all duration-300 relative overflow-hidden"
        >
            {/* Gradient Glow on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="flex items-start justify-between mb-5 relative z-10">
                <div className="flex items-center space-x-4">
                    <Avatar className="w-14 h-14 border-2 border-white/10 shadow-md">
                        <AvatarImage src={investor.profilePic} alt={name} />
                        <AvatarFallback className="bg-primary/10 text-primary font-bold">
                            {name?.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>

                    <div>
                        <h3 className="font-bold text-foreground text-lg leading-tight group-hover:text-primary transition-colors">
                            {name}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-1 mt-1">{headline}</p>
                    </div>
                </div>

                <div className="text-right">
                    <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                        {Math.round(score * 100)}%
                    </div>
                    <Badge variant="secondary" className="text-[10px] uppercase tracking-wider font-semibold bg-white/5 hover:bg-white/10 text-muted-foreground border-0">
                        Match
                    </Badge>
                </div>
            </div>

            <p className="text-sm text-foreground/80 mb-6 line-clamp-3 leading-relaxed relative z-10 min-h-[4.5em]">
                {about || "No description available."}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-white/5 relative z-10">
                <div className="flex items-center space-x-3 text-xs text-muted-foreground font-medium">
                    <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> {location || 'Global'}</span>
                    {type === 'angel' && (
                        <span className="flex items-center px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500">
                            Angel Score: {investor.angel_score}
                        </span>
                    )}
                </div>

                <div className="flex items-center space-x-2">
                    {investor.linkedinUrl && (
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-[#0077b5] hover:bg-white/5" asChild>
                            <a href={investor.linkedinUrl} target="_blank" rel="noopener noreferrer">
                                <Linkedin className="w-4 h-4" />
                            </a>
                        </Button>
                    )}
                    {investor.website && (
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-white/5" asChild>
                            <a href={investor.website} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </Button>
                    )}
                    {onDraftMessage && (
                        <Button
                            onClick={() => onDraftMessage(investor)}
                            size="sm"
                            className="ml-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20"
                        >
                            Draft
                        </Button>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
