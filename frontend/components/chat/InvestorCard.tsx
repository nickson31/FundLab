'use client';

import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // Need to create UI components or use raw
import { Badge } from '@/components/ui/badge'; // Need to create UI components or use raw
import { Button } from '@/components/ui/button'; // Need to create UI components or use raw
import { ExternalLink, Linkedin } from 'lucide-react';

// Simplified UI components for now if they don't exist
function SimpleAvatar({ src, name }: { src?: string, name: string }) {
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    return (
        <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold overflow-hidden shrink-0">
            {src ? <img src={src} alt={name} className="w-full h-full object-cover" /> : initials}
        </div>
    );
}

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
            whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.1)" }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm transition-all"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                    <SimpleAvatar src={investor.profilePic} name={name} />
                    <div>
                        <h3 className="font-bold text-gray-900 dark:text-white text-lg">{name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{headline}</p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-bold text-indigo-600">{Math.round(score * 100)}%</div>
                    <div className="text-xs text-gray-400 uppercase">Match</div>
                </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                {about}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-700">
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span>{location}</span>
                    {type === 'angel' && <span>• Angel Score: {investor.angel_score}</span>}
                </div>

                <div className="flex space-x-2">
                    {investor.linkedinUrl && (
                        <a href={investor.linkedinUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                            <Linkedin className="w-4 h-4" />
                        </a>
                    )}
                    {investor.website && (
                        <a href={investor.website} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-gray-900 transition-colors">
                        </a>
                    )}
                    {onDraftMessage && (
                        <button
                            onClick={() => onDraftMessage(investor)}
                            className="ml-2 px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-lg hover:bg-indigo-100 transition-colors"
                        >
                            Draft
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
