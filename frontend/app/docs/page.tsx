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

// --- ENGLISH DATA STRUCTURE ---
const DOC_PHASES = [
    {
        id: 'phaseRec',
        title: 'Personal Docs (Nikita)',
        description: 'Identity verification and work permits for non-resident executive.',
        locked: true, // Special lock for Nikita
        items: [
            { name: 'Management Fees Agreement', desc: 'Contract for service provision between Nikita and the HoldCo.', status: 'pending', priority: 'High' },
            { name: 'Foreign Work Permit', desc: 'Application for non-resident work permit (Fronterizo).', status: 'pending', priority: 'Medium' },
            { name: 'Criminal Record Certificate', desc: 'Apostilled document verifying no criminal history.', status: 'completed', priority: 'High', flag: '🇷🇺' },
            { name: 'Apostilled Degrees & CV', desc: 'University diplomas and CV formatted for immigration.', status: 'completed', priority: 'Medium' },
        ]
    },
    {
        id: 'phase0',
        title: 'Phase 0: Incorporation & Legal',
        description: 'Structure, Partner Protection, and Fiscal Registration.',
        items: [
            { name: 'Solicitud de Reserva de Denominación Social', desc: 'Official reservation of the company name "FundLab".', status: 'completed', priority: 'Critical', flag: '🇦🇩' },
            { name: 'Pre-Constitution Expenses', desc: 'List of deductible expenses incurred before formation.', status: 'completed', priority: 'High' },
            { name: 'Foreign Investment Request (SIE)', desc: 'Government approval for foreign investment.', status: 'pending', priority: 'Low' },
            { name: 'Shareholders\' Agreement', desc: 'Private pact regulating partner relationships and exit strategies.', status: 'completed', priority: 'High' },
            { name: 'By-Laws (Estatutos Sociales)', desc: 'Official rules governing the company\'s management.', status: 'completed', priority: 'High' },
            { name: 'Bank Deposit Certificate', desc: 'Proof of share capital deposit (€3,000).', status: 'pending', priority: 'High' },
            { name: 'Public Deed of Incorporation', desc: 'Notarial act formally creating the legal entity.', status: 'pending', priority: 'High' },
            { name: 'Company Registry Inscription', desc: 'Final registration in the "Registre de Societats".', status: 'pending', priority: 'High' },
            { name: 'Tax Register (NRT) Request', desc: 'Obtaining the Tax ID number.', status: 'pending', priority: 'High' },
            { name: 'Commerce Register Inscription', desc: 'License to operate commercially.', status: 'pending', priority: 'High' },
            { name: 'Social Security (CASS) Registration', desc: 'Company registration with social security.', status: 'pending', priority: 'Medium' },
        ]
    },
    {
        id: 'phase1',
        title: 'Phase 1: Compliance & IP',
        description: 'GDPR/LQPD Compliance and Asset Protection.',
        items: [
            { name: 'Record of Processing Activities (RAT)', desc: 'Internal log of all data processing activities.', status: 'pending', priority: 'Critical' },
            { name: 'Data Protection Impact Assessment (DPIA)', desc: 'Risk analysis for high-risk data processing.', status: 'pending', priority: 'Critical' },
            { name: 'Legitimate Interest Assessment (LIA)', desc: 'Justification for data scraping activities.', status: 'pending', priority: 'High' },
            { name: 'Privacy Policy (Web/App)', desc: 'Public document explaining data handling to users.', status: 'pending', priority: 'High' },
            { name: 'Cookie Policy', desc: 'Consent management for tracker cookies.', status: 'pending', priority: 'Medium' },
            { name: 'Compliance Check (External Sources)', desc: 'Legal verification of scraping LinkedIn/Crunchbase.', status: 'pending', priority: 'High' },
            { name: 'Data Processing Agreements (DPA)', desc: 'Contracts with third-party vendors (AWS, Supabase).', status: 'pending', priority: 'High' },
            { name: 'Intellectual Property Registry', desc: 'Registration of code and brand assets.', status: 'pending', priority: 'High' },
            { name: 'Cybersecurity Strategy (Piotr)', desc: 'Defense plan against data breaches.', status: 'pending', priority: 'Critical' },
            { name: 'NDA & IP Assignment (Team)', desc: 'Agreements for Pavel & Piotr transferring code rights.', status: 'completed', priority: 'Critical' },
            { name: 'Third-Party NDAs', desc: 'Standard confidentiality agreements for partners.', status: 'completed', priority: 'Medium' },
        ]
    },
    {
        id: 'phase2',
        title: 'Phase 2: Strategy & Business',
        description: 'Investor documentation and internal roadmap.',
        items: [
            { name: 'Business Model Canvas', desc: 'One-page strategic plan.', status: 'completed', priority: 'Medium' },
            { name: 'Pitch Deck (Investor Ready)', desc: 'Presentation for fundraising rounds.', status: 'completed', priority: 'High' },
            { name: 'Product Roadmap (12 Months)', desc: 'Timeline of features and milestones.', status: 'completed', priority: 'High' },
            { name: 'Anti-Scraping Strategy (Piotr)', desc: 'Technical measures to prevent competitor scraping.', status: 'pending', priority: 'High' },
            { name: 'Financial Projections (P&L)', desc: 'Profit and Loss forecast.', status: 'completed', priority: 'High' },
            { name: 'Cashflow Forecast', desc: 'Detailed cash management plan.', status: 'completed', priority: 'Critical' },
            { name: 'Unit Economics Analysis', desc: 'LTV, CAC, and margin analysis.', status: 'completed', priority: 'High' },
            { name: 'Competitor Analysis Matrix', desc: 'Comparison with key market players.', status: 'completed', priority: 'Medium' },
        ]
    },
    {
        id: 'phase3',
        title: 'Phase 3: Operations & Clients',
        description: 'Commercial relationships and legal security.',
        items: [
            { name: 'SaaS Terms & Conditions', desc: 'Contract governing user access to the platform.', status: 'completed', priority: 'Critical' },
            { name: 'Service Level Agreement (SLA)', desc: 'Commitment to uptime and support response.', status: 'completed', priority: 'Medium' },
            { name: 'Fundraising Mandate Contract', desc: 'Agreement for fundraising services.', status: 'completed', priority: 'High' },
            { name: 'Onboarding Manual', desc: 'Guide for new clients.', status: 'completed', priority: 'Medium' },
            { name: 'Acceptable Use Policy (AUP)', desc: 'Rules against misuse of the platform.', status: 'completed', priority: 'Low' },
            { name: 'Phantom Shares Plan', desc: 'Incentive plan for key employees.', status: 'completed', priority: 'Low' },
        ]
    }
];

export default function DocsPage() {
    const [simulatingAuth, setSimulatingAuth] = useState(false);

    const handleNikitaAuth = () => {
        setSimulatingAuth(true);
        // Simulate "stuck" state - no timeout to turn it off automatically, 
        // effectively simulating the user being "stuck" pending mobile action.
    };

    return (
        <div className="min-h-screen bg-indigo-50/50 dark:bg-black p-6 md:p-12 font-sans overflow-x-hidden">

            {/* --- HEADER --- */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-7xl mx-auto mb-16"
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/30">
                        <FileText className="w-6 h-6" />
                    </div>
                    <h1 className="text-4xl font-black text-indigo-950 dark:text-white tracking-tight">
                        Documentation <span className="text-indigo-600 dark:text-indigo-400">& Compliance</span>
                    </h1>
                </div>
                <p className="text-lg text-indigo-900/60 dark:text-zinc-400 max-w-2xl ml-1">
                    Centralized repository for all legal, fiscal, and operational documents.
                    <span className="inline-flex items-center gap-1 ml-2 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
                        <Shield className="w-3 h-3" /> Secure Vault
                    </span>
                </p>
                <Link href="/" className="inline-block mt-4 text-indigo-500 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors font-medium text-sm">
                    ← Back to Dashboard
                </Link>
            </motion.div>

            {/* --- MAIN CONTENT GRID --- */}
            <div className="max-w-7xl mx-auto space-y-12">

                {DOC_PHASES.map((phase, index) => (
                    <motion.div
                        key={phase.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group"
                    >
                        {/* PHASE HEADER CARD */}
                        <div className={`
                            relative overflow-hidden rounded-3xl p-8 mb-6
                            ${phase.id === 'phaseRec'
                                ? 'bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-xl shadow-indigo-900/20'
                                : 'bg-white dark:bg-white/5 border border-indigo-100 dark:border-white/10 shadow-lg shadow-indigo-900/5'
                            }
                        `}>
                            {/* Texture for Nikita's Card */}
                            {phase.id === 'phaseRec' && (
                                <div className="absolute inset-0 opacity-10">
                                    <svg className="w-full h-full" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                                            <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="currentColor" strokeWidth="2" />
                                        </pattern>
                                        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                                    </svg>
                                </div>
                            )}

                            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                <div>
                                    <h2 className={`text-2xl font-bold mb-2 ${phase.id === 'phaseRec' ? 'text-white' : 'text-indigo-950 dark:text-white'}`}>
                                        {phase.title}
                                    </h2>
                                    <p className={`text-lg ${phase.id === 'phaseRec' ? 'text-indigo-100' : 'text-indigo-900/60 dark:text-zinc-400'}`}>
                                        {phase.description}
                                    </p>
                                </div>

                                {/* NIKITA AUTH SIMULATION BUTTON */}
                                {phase.id === 'phaseRec' && (
                                    <div className="flex-shrink-0">
                                        {!simulatingAuth ? (
                                            <Button
                                                onClick={handleNikitaAuth}
                                                className="bg-white text-indigo-600 hover:bg-indigo-50 border-none font-bold shadow-lg"
                                            >
                                                <Lock className="w-4 h-4 mr-2" /> Authenticate Nikita
                                            </Button>
                                        ) : (
                                            <div className="flex items-center gap-3 px-4 py-2 bg-indigo-900/30 rounded-lg border border-indigo-400/30 animate-pulse">
                                                <Smartphone className="w-5 h-5 text-indigo-200" />
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-bold text-indigo-200 uppercase tracking-wider">Check Mobile</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm font-medium text-white">Waiting for approval...</span>
                                                        <Loader2 className="w-3 h-3 text-indigo-300 animate-spin" />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* DOCUMENTS GRID */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-2">
                            {phase.items.map((doc, i) => (
                                <div
                                    key={i}
                                    className={`
                                        relative group/card p-5 rounded-2xl border transition-all duration-300
                                        ${phase.id === 'phaseRec' && simulatingAuth
                                            ? 'opacity-50 blur-[1px]' // Dimmed while waiting
                                            : 'hover:shadow-lg hover:-translate-y-1'
                                        }
                                        bg-white/60 dark:bg-white/5 border-white/40 dark:border-white/5 backdrop-blur-md
                                    `}
                                >
                                    {/* STATUS INDICATOR */}
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`
                                            p-2 rounded-lg 
                                            ${doc.status === 'completed'
                                                ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400'
                                                : 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400'}
                                        `}>
                                            {doc.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                                        </div>
                                        {doc.flag && <span className="text-xl" title="Original Language">{doc.flag}</span>}
                                    </div>

                                    {/* CONTENT */}
                                    <h3 className="font-bold text-indigo-950 dark:text-white mb-2 leading-tight">
                                        {doc.name}
                                    </h3>
                                    <p className="text-sm text-indigo-900/60 dark:text-zinc-500 mb-4 line-clamp-2">
                                        {doc.desc}
                                    </p>

                                    {/* BOTTOM META */}
                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-indigo-50 dark:border-white/5">
                                        <span className={`text-[10px] font-bold uppercase tracking-wider 
                                            ${doc.priority === 'Critical' ? 'text-red-500' : 'text-indigo-400'}
                                        `}>
                                            {doc.priority} Priority
                                        </span>
                                        <Lock className="w-4 h-4 text-indigo-200 dark:text-white/10" />
                                    </div>

                                    {/* NIKITA LOCK OVERLAY */}
                                    {phase.id === 'phaseRec' && !simulatingAuth && (
                                        <div className="absolute inset-0 bg-white/10 dark:bg-black/40 backdrop-blur-[2px] rounded-2xl flex items-center justify-center z-10">
                                            <Lock className="w-8 h-8 text-white drop-shadow-lg opacity-80" />
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
