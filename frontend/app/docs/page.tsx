"use strict";
"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FileText,
    Lock,
    CheckCircle2,
    Clock,
    AlertCircle,
    ChevronRight,
    Shield,
    Smartphone,
    Loader2
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// --- DATA STRUCTURE WITH FLAGS & PREMIUM DETAILS ---
const DOC_PHASES = [
    {
        id: 'phaseRec',
        title: 'Personal Docs (Nikita)',
        description: 'Identity verification and work permits for non-resident executive.',
        locked: true,
        items: [
            { name: 'Management Fees Agreement', desc: 'Contract for service provision between Nikita and the HoldCo.', status: 'pending', priority: 'High', flag: '🇦🇩' },
            { name: 'Foreign Work Permit', desc: 'Application for non-resident work permit (Fronterizo).', status: 'pending', priority: 'Medium', flag: '🇦🇩' },
            { name: 'Criminal Record Certificate', desc: 'Apostilled document verifying no criminal history.', status: 'completed', priority: 'High', flag: '🇷🇺' },
            { name: 'Apostilled Degrees & CV', desc: 'University diplomas and CV formatted for immigration.', status: 'completed', priority: 'Medium', flag: '🇬🇧' },
        ]
    },
    {
        id: 'phase0',
        title: 'Phase 0: Incorporation & Legal',
        description: 'Structure, Partner Protection, and Fiscal Registration.',
        items: [
            { name: 'Solicitud de Reserva de Denominación Social', desc: 'Official reservation of the company name "FundLab".', status: 'completed', priority: 'Critical', flag: '🇦🇩' },
            { name: 'Pre-Constitution Expenses', desc: 'List of deductible expenses incurred before formation.', status: 'completed', priority: 'High', flag: '🇦🇩' },
            { name: 'Foreign Investment Request (SIE)', desc: 'Government approval for foreign investment.', status: 'pending', priority: 'Low', flag: '🇦🇩' },
            { name: 'Shareholders\' Agreement', desc: 'Private pact regulating partner relationships and exit strategies.', status: 'completed', priority: 'High', flag: '🇬🇧' },
            { name: 'By-Laws (Estatutos Sociales)', desc: 'Official rules governing the company\'s management.', status: 'completed', priority: 'High', flag: '🇦🇩' },
            { name: 'Bank Deposit Certificate', desc: 'Proof of share capital deposit (€3,000).', status: 'pending', priority: 'High', flag: '🇦🇩' },
            { name: 'Public Deed of Incorporation', desc: 'Notarial act formally creating the legal entity.', status: 'pending', priority: 'High', flag: '🇦🇩' },
            { name: 'Company Registry Inscription', desc: 'Final registration in the "Registre de Societats".', status: 'pending', priority: 'High', flag: '🇦🇩' },
            { name: 'Tax Register (NRT) Request', desc: 'Obtaining the Tax ID number.', status: 'pending', priority: 'High', flag: '🇦🇩' },
            { name: 'Commerce Register Inscription', desc: 'License to operate commercially.', status: 'pending', priority: 'High', flag: '🇦🇩' },
            { name: 'Social Security (CASS) Registration', desc: 'Company registration with social security.', status: 'pending', priority: 'Medium', flag: '🇦🇩' },
        ]
    },
    {
        id: 'phase1',
        title: 'Phase 1: Compliance & IP',
        description: 'GDPR/LQPD Compliance and Asset Protection.',
        items: [
            { name: 'Record of Processing Activities (RAT)', desc: 'Internal log of all data processing activities.', status: 'pending', priority: 'Critical', flag: '🇬🇧' },
            { name: 'Data Protection Impact Assessment (DPIA)', desc: 'Risk analysis for high-risk data processing.', status: 'pending', priority: 'Critical', flag: '🇬🇧' },
            { name: 'Legitimate Interest Assessment (LIA)', desc: 'Justification for data scraping activities.', status: 'pending', priority: 'High', flag: '🇬🇧' },
            { name: 'Privacy Policy (Web/App)', desc: 'Public document explaining data handling to users.', status: 'pending', priority: 'High', flag: '🇬🇧' },
            { name: 'Cookie Policy', desc: 'Consent management for tracker cookies.', status: 'pending', priority: 'Medium', flag: '🇬🇧' },
            { name: 'Compliance Check (External Sources)', desc: 'Legal verification of scraping LinkedIn/Crunchbase.', status: 'pending', priority: 'High', flag: '🇬🇧' },
            { name: 'Data Processing Agreements (DPA)', desc: 'Contracts with third-party vendors (AWS, Supabase).', status: 'pending', priority: 'High', flag: '🇬🇧' },
            { name: 'Intellectual Property Registry', desc: 'Registration of code and brand assets.', status: 'pending', priority: 'High', flag: '🇦🇩' },
            { name: 'Cybersecurity Strategy (Piotr)', desc: 'Defense plan against data breaches.', status: 'pending', priority: 'Critical', flag: '🇬🇧' },
            { name: 'NDA & IP Assignment (Team)', desc: 'Agreements for Pavel & Piotr transferring code rights.', status: 'completed', priority: 'Critical', flag: '🇬🇧' },
            { name: 'Third-Party NDAs', desc: 'Standard confidentiality agreements for partners.', status: 'completed', priority: 'Medium', flag: '🇬🇧' },
        ]
    },
    {
        id: 'phase2',
        title: 'Phase 2: Strategy & Business',
        description: 'Investor documentation and internal roadmap.',
        items: [
            { name: 'Business Model Canvas', desc: 'One-page strategic plan.', status: 'completed', priority: 'Medium', flag: '🇬🇧' },
            { name: 'Pitch Deck (Investor Ready)', desc: 'Presentation for fundraising rounds.', status: 'completed', priority: 'High', flag: '🇬🇧' },
            { name: 'Product Roadmap (12 Months)', desc: 'Timeline of features and milestones.', status: 'completed', priority: 'High', flag: '🇬🇧' },
            { name: 'Anti-Scraping Strategy (Piotr)', desc: 'Technical measures to prevent competitor scraping.', status: 'pending', priority: 'High', flag: '🇬🇧' },
            { name: 'Financial Projections (P&L)', desc: 'Profit and Loss forecast.', status: 'completed', priority: 'High', flag: '🇬🇧' },
            { name: 'Cashflow Forecast', desc: 'Detailed cash management plan.', status: 'completed', priority: 'Critical', flag: '🇬🇧' },
            { name: 'Unit Economics Analysis', desc: 'LTV, CAC, and margin analysis.', status: 'completed', priority: 'High', flag: '🇬🇧' },
            { name: 'Competitor Analysis Matrix', desc: 'Comparison with key market players.', status: 'completed', priority: 'Medium', flag: '🇬🇧' },
        ]
    },
    {
        id: 'phase3',
        title: 'Phase 3: Operations & Clients',
        description: 'Commercial relationships and legal security.',
        items: [
            { name: 'SaaS Terms & Conditions', desc: 'Contract governing user access to the platform.', status: 'completed', priority: 'Critical', flag: '🇬🇧' },
            { name: 'Service Level Agreement (SLA)', desc: 'Commitment to uptime and support response.', status: 'completed', priority: 'Medium', flag: '🇬🇧' },
            { name: 'Fundraising Mandate Contract', desc: 'Agreement for fundraising services.', status: 'completed', priority: 'High', flag: '🇬🇧' },
            { name: 'Onboarding Manual', desc: 'Guide for new clients.', status: 'completed', priority: 'Medium', flag: '🇬🇧' },
            { name: 'Acceptable Use Policy (AUP)', desc: 'Rules against misuse of the platform.', status: 'completed', priority: 'Low', flag: '🇬🇧' },
            { name: 'Phantom Shares Plan', desc: 'Incentive plan for key employees.', status: 'completed', priority: 'Low', flag: '🇬🇧' },
        ]
    }
];

export default function DocsPage() {
    const [simulatingAuth, setSimulatingAuth] = useState(false);

    const handleNikitaAuth = () => {
        setSimulatingAuth(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-black dark:via-[#050505] dark:to-indigo-950/20 p-6 md:p-12 font-sans overflow-x-hidden">

            {/* --- HEADER --- */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-7xl mx-auto mb-16 relative"
            >
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                    <Shield className="w-64 h-64 text-indigo-500" />
                </div>

                <div className="flex items-center gap-4 mb-6 relative z-10">
                    <div className="p-4 rounded-2xl bg-white/80 dark:bg-white/5 border border-white/20 shadow-xl backdrop-blur-xl">
                        <FileText className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                        <h1 className="text-5xl font-black text-indigo-950 dark:text-white tracking-tight mb-2">
                            Documentation <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">& Compliance</span>
                        </h1>
                        <p className="text-xl text-indigo-900/60 dark:text-zinc-400 font-medium">
                            Centralized secure vault for legal, fiscal, and operational assets.
                        </p>
                    </div>
                </div>

                <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 text-indigo-600 dark:text-indigo-300 transition-all font-semibold text-sm backdrop-blur-sm border border-indigo-100 dark:border-white/5 shadow-sm hover:shadow-md">
                    <ChevronRight className="w-4 h-4 rotate-180" /> Back to Dashboard
                </Link>
            </motion.div>

            {/* --- MAIN CONTENT GRID --- */}
            <div className="max-w-7xl mx-auto space-y-16">

                {DOC_PHASES.map((phase, index) => (
                    <motion.div
                        key={phase.id}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.15, duration: 0.6 }}
                        className="group"
                    >
                        {/* PHASE HEADER CARD */}
                        <div className={`
                            relative overflow-hidden rounded-[2rem] p-10 mb-8 transition-all duration-500
                            ${phase.id === 'phaseRec'
                                ? 'bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 text-white shadow-2xl shadow-indigo-900/30'
                                : 'bg-white/80 dark:bg-white/5 border border-indigo-100 dark:border-white/10 shadow-xl shadow-indigo-900/5 backdrop-blur-3xl'}
                        `}>
                            {/* Premium Texture for Nikita's Card */}
                            {phase.id === 'phaseRec' && (
                                <div className="absolute inset-0 opacity-20 mix-blend-overlay">
                                    <svg className="w-full h-full animate-pulse opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                                        <path d="M0 100 C 20 0 50 0 100 100 Z" fill="url(#grad1)" />
                                        <defs>
                                            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" style={{ stopColor: 'rgb(255,255,255,0)' }} />
                                                <stop offset="50%" style={{ stopColor: 'rgb(255,255,255,0.5)' }} />
                                                <stop offset="100%" style={{ stopColor: 'rgb(255,255,255,0)' }} />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                            )}

                            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                                <div>
                                    <h2 className={`text-3xl font-black mb-3 tracking-tight ${phase.id === 'phaseRec' ? 'text-white' : 'text-indigo-950 dark:text-white'}`}>
                                        {phase.title}
                                    </h2>
                                    <p className={`text-lg font-medium leading-relaxed max-w-2xl ${phase.id === 'phaseRec' ? 'text-indigo-100' : 'text-indigo-900/60 dark:text-zinc-400'}`}>
                                        {phase.description}
                                    </p>
                                </div>

                                {/* NIKITA AUTH SIMULATION BUTTON */}
                                {phase.id === 'phaseRec' && (
                                    <div className="flex-shrink-0">
                                        {!simulatingAuth ? (
                                            <Button
                                                onClick={handleNikitaAuth}
                                                className="h-12 px-8 bg-white text-indigo-700 hover:bg-indigo-50 border-none font-bold text-base shadow-lg shadow-black/10 transition-all hover:scale-105 active:scale-95 rounded-xl"
                                            >
                                                <Lock className="w-4 h-4 mr-2" /> Authenticate Nikita
                                            </Button>
                                        ) : (
                                            <div className="flex items-center gap-4 px-6 py-3 bg-black/20 backdrop-blur-md rounded-2xl border border-white/10 animate-pulse">
                                                <div className="p-2 bg-indigo-500/20 rounded-full">
                                                    <Smartphone className="w-6 h-6 text-white" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest mb-0.5">Mobile Confirmation</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm font-bold text-white">Check your device...</span>
                                                        <Loader2 className="w-3 h-3 text-indigo-300 animate-spin" />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* PREMIUM DOCUMENT GRID */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-1">
                            {phase.items.map((doc, i) => (
                                <div
                                    key={i}
                                    className={`
                                        relative group/card p-6 rounded-[1.5rem] border transition-all duration-300
                                        ${phase.id === 'phaseRec' && simulatingAuth
                                            ? 'opacity-40 blur-[2px] grayscale'
                                            : 'hover:shadow-2xl hover:-translate-y-1 hover:border-indigo-500/30 dark:hover:border-indigo-400/30'
                                        }
                                        bg-white/60 dark:bg-zinc-900/40 border-white/60 dark:border-white/5 backdrop-blur-xl shadow-sm
                                    `}
                                >
                                    {/* CARD HEADER */}
                                    <div className="flex justify-between items-start mb-5">
                                        <div className={`
                                            px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold uppercase tracking-wider
                                            ${doc.status === 'completed'
                                                ? 'bg-emerald-100/80 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                                                : 'bg-amber-100/80 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'}
                                        `}>
                                            {doc.status === 'completed' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                                            {doc.status === 'completed' ? 'Signed' : 'Pending'}
                                        </div>
                                        {doc.flag && (
                                            <span className="text-2xl filter drop-shadow-sm hover:scale-110 transition-transform cursor-help" title="Document Language">
                                                {doc.flag}
                                            </span>
                                        )}
                                    </div>

                                    {/* CONTENT */}
                                    <h3 className="text-lg font-bold text-indigo-950 dark:text-white mb-3 leading-snug group-hover/card:text-indigo-600 dark:group-hover/card:text-indigo-400 transition-colors">
                                        {doc.name}
                                    </h3>
                                    <p className="text-sm text-indigo-900/60 dark:text-zinc-500 mb-6 leading-relaxed font-medium">
                                        {doc.desc}
                                    </p>

                                    {/* FOOTER */}
                                    <div className="flex items-center justify-between mt-auto pt-5 border-t border-indigo-50/50 dark:border-white/5">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${doc.priority === 'Critical' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]' :
                                                    doc.priority === 'High' ? 'bg-orange-500' :
                                                        'bg-blue-400'
                                                }`} />
                                            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 dark:text-zinc-500/80">
                                                {doc.priority}
                                            </span>
                                        </div>
                                        <Lock className="w-4 h-4 text-indigo-200 dark:text-white/10 group-hover/card:text-indigo-300 transition-colors" />
                                    </div>

                                    {/* NIKITA LOCK OVERLAY */}
                                    {phase.id === 'phaseRec' && !simulatingAuth && (
                                        <div className="absolute inset-0 bg-white/20 dark:bg-black/60 backdrop-blur-[3px] rounded-[1.5rem] flex flex-col items-center justify-center z-10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                                            <Lock className="w-10 h-10 text-white drop-shadow-lg mb-2" />
                                            <span className="text-white font-bold text-sm bg-black/50 px-3 py-1 rounded-full backdrop-blur-md">Restricted Access</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}

            </div>
        </div>
    );
}
