"use strict";
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FileText,
    Lock,
    CheckCircle2,
    Clock,
    Shield,
    Smartphone,
    Loader2,
    ChevronLeft,
    HardDrive,
    Terminal,
    FileCheck,
    Cpu
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// --- DATA STRUCTURE: VAULT FILE SYSTEM ---
type DocItem = {
    name: string;
    desc: string;
    status: 'pending' | 'completed' | 'locked';
    priority: 'Critical' | 'High' | 'Medium' | 'Low';
    flags: string[];
    size: string;
    type: string;
    date: string;
};

const VAULT_DATA: Record<string, { title: string; desc: string; locked: boolean; items: DocItem[] }> = {
    'folder_nikita': {
        title: 'PERSONAL_VAULT_NIKITA',
        desc: 'Identity verification & Work Permits (Non-Resident)',
        locked: true,
        items: [
            { name: 'Management Fees Agreement', desc: 'Service provision contract (HoldCo <-> Nikita).', status: 'pending', priority: 'High', flags: ['🇦🇩', '🇬🇧', '🇪🇸'], size: '1.2 MB', type: 'PDF', date: '2025-12-10' },
            { name: 'Foreign Work Permit Application', desc: 'Immigration paperwork for Fronterizo status.', status: 'pending', priority: 'Medium', flags: ['🇦🇩', '🇬🇧', '🇪🇸'], size: '3.4 MB', type: 'PDF', date: '2025-12-11' },
            { name: 'Criminal Record (Antecedentes)', desc: 'Official Spanish Ministry of Justice Certificate (Apostilled).', status: 'completed', priority: 'High', flags: ['🇪🇸'], size: '850 KB', type: 'PDF', date: '2025-11-20' },
            { name: 'University Degrees & CV', desc: 'Certified copies formatted for Immigration.', status: 'completed', priority: 'Medium', flags: ['🇬🇧', '🇪🇸'], size: '4.1 MB', type: 'PDF', date: '2025-11-15' },
        ]
    },
    'folder_legal': {
        title: 'CORP_STRUCTURE_LEGAL',
        desc: 'Incorporation, By-Laws & Notarial Deeds',
        locked: false,
        items: [
            { name: 'Reserva Denominación Social', desc: 'Government approval of "FundLab" trademark.', status: 'completed', priority: 'Critical', flags: ['🇦🇩', '🇬🇧', '🇪🇸'], size: '420 KB', type: 'PDF', date: '2025-12-01' },
            { name: 'Pre-Constitution Expenses', desc: 'Deductible invoices audit trail.', status: 'completed', priority: 'High', flags: ['🇦🇩', '🇬🇧', '🇪🇸'], size: '2.1 MB', type: 'XLSX', date: '2025-12-05' },
            { name: 'Foreign Investment (SIE)', desc: 'Government authorization decree.', status: 'pending', priority: 'High', flags: ['🇦🇩', '🇬🇧', '🇪🇸'], size: '---', type: 'PENDING', date: '---' },
            { name: 'Shareholders Agreement', desc: 'Partner cap table and exit clauses.', status: 'completed', priority: 'High', flags: ['🇦🇩', '🇬🇧', '🇪🇸'], size: '5.6 MB', type: 'PDF', date: '2025-12-08' },
            { name: 'By-Laws (Estatutos Sociales)', desc: 'Official rules governing the company management.', status: 'completed', priority: 'High', flags: ['🇦🇩', '🇬🇧', '🇪🇸'], size: '1.8 MB', type: 'DOCX', date: '2025-12-09' },
            { name: 'Bank Deposit Certificate', desc: 'Andorran Bank capital proof (€3,000).', status: 'pending', priority: 'High', flags: ['🇦🇩', '🇬🇧', '🇪🇸'], size: '---', type: 'QUEUED', date: '---' },
            { name: 'Public Deed of Incorporation', desc: 'Notarial act formally creating the legal entity.', status: 'pending', priority: 'High', flags: ['🇦🇩', '🇬🇧', '🇪🇸'], size: '---', type: 'PENDING', date: '---' },
            { name: 'Company Registry Inscription', desc: 'Final registration in the "Registre de Societats".', status: 'pending', priority: 'High', flags: ['🇦🇩', '🇬🇧', '🇪🇸'], size: '---', type: 'PENDING', date: '---' },
            { name: 'Tax Register (NRT) Request', desc: 'Obtaining the Tax ID number (F-1).', status: 'pending', priority: 'High', flags: ['🇦🇩', '🇬🇧', '🇪🇸'], size: '---', type: 'PENDING', date: '---' },
            { name: 'Commerce Register Inscription', desc: 'License to operate commercially.', status: 'pending', priority: 'High', flags: ['🇦🇩', '🇬🇧', '🇪🇸'], size: '---', type: 'PENDING', date: '---' },
            { name: 'Social Security (CASS)', desc: 'Company & Director registration.', status: 'pending', priority: 'Medium', flags: ['🇦🇩', '🇬🇧', '🇪🇸'], size: '---', type: 'PENDING', date: '---' },
        ]
    },
    'folder_compliance': {
        title: 'DATA_COMPLIANCE_IP',
        desc: 'GDPR, Privacy Policy & Scraping Legality',
        locked: false,
        items: [
            { name: 'Record of Processing (RAT)', desc: 'Internal data flow audit log.', status: 'pending', priority: 'Critical', flags: ['🇦🇩', '🇬🇧', '🇪🇸'], size: '---', type: 'DRAFT', date: '---' },
            { name: 'DPIA (Impact Assessment)', desc: 'Risk analysis for investor data scraping.', status: 'pending', priority: 'Critical', flags: ['🇦🇩', '🇬🇧', '🇪🇸'], size: '---', type: 'DRAFT', date: '---' },
            { name: 'LIA (Legitimate Interest)', desc: 'Legal justification for public data indexing.', status: 'pending', priority: 'High', flags: ['🇦🇩', '🇬🇧', '🇪🇸'], size: '---', type: 'DRAFT', date: '---' },
            { name: 'Privacy Policy', desc: 'Public website T&Cs and Privacy.', status: 'pending', priority: 'High', flags: ['🇦🇩', '🇬🇧', '🇪🇸'], size: '---', type: 'DRAFT', date: '---' },
            { name: 'Cookie Policy', desc: 'Consent management for trackers.', status: 'pending', priority: 'Medium', flags: ['🇦🇩', '🇬🇧', '🇪🇸'], size: '---', type: 'DRAFT', date: '---' },
            { name: 'Compliance Check (External)', desc: 'Validation of LinkedIn/Crunchbase T&Cs.', status: 'pending', priority: 'High', flags: ['🇬🇧', '🇪🇸'], size: '---', type: 'DRAFT', date: '---' },
            { name: 'Data Processing Agreements (DPA)', desc: 'Contracts with vendors (AWS, Supabase).', status: 'pending', priority: 'High', flags: ['🇬🇧', '🇪🇸'], size: '---', type: 'DRAFT', date: '---' },
            { name: 'Intellectual Property Registry', desc: 'Software Escrow or IP Registration.', status: 'pending', priority: 'High', flags: ['🇦🇩', '🇪🇸', '🇬🇧'], size: '---', type: 'PENDING', date: '---' },
            { name: 'Cybersecurity Manual (Piotr)', desc: 'Internal security protocols and breach response.', status: 'pending', priority: 'Critical', flags: ['🇬🇧'], size: '---', type: 'ENCRYPTED', date: '---' },
            { name: 'NDA (Team - Pavel & Piotr)', desc: 'Protection of secrets & algorithm.', status: 'completed', priority: 'Critical', flags: ['🇬🇧', '🇪🇸'], size: '2.5 MB', type: 'PDF', date: '2025-11-01' },
            { name: 'NDA (Investors/Third Party)', desc: 'Standard agreements for sharing metrics.', status: 'completed', priority: 'Medium', flags: ['🇬🇧', '🇪🇸'], size: '150 KB', type: 'DOCX', date: '2025-12-01' },
        ]
    },
    'folder_biz': {
        title: 'STRATEGY_BUSINESS_DOCS',
        desc: 'Investor Deck, Roadmap & Financials',
        locked: false,
        items: [
            { name: 'Business Model Canvas', desc: 'Strategic plan on a page.', status: 'completed', priority: 'Medium', flags: ['🇬🇧', '🇪🇸'], size: '1.1 MB', type: 'PDF', date: '2025-12-12' },
            { name: 'Pitch Deck (Master)', desc: 'Investor ready presentation.', status: 'completed', priority: 'High', flags: ['🇬🇧', '🇪🇸'], size: '12.4 MB', type: 'PDF', date: '2025-12-15' },
            { name: 'Product Roadmap (12 Months)', desc: 'Feature planning (V1, V2, V3).', status: 'completed', priority: 'High', flags: ['🇬🇧', '🇪🇸'], size: '4.2 MB', type: 'PDF', date: '2025-12-14' },
            { name: 'Financial Projections (P&L)', desc: '5-year forecast.', status: 'completed', priority: 'High', flags: ['🇬🇧', '🇪🇸'], size: '3.2 MB', type: 'XLSX', date: '2025-12-14' },
            { name: 'Cashflow Forecast (3 Months)', desc: 'Treasury & Oxygen plan.', status: 'completed', priority: 'Critical', flags: ['🇬🇧', '🇪🇸'], size: '1.8 MB', type: 'XLSX', date: '2025-12-16' },
            { name: 'Unit Economics Analysis', desc: 'LTV, CAC, Churn metrics.', status: 'completed', priority: 'High', flags: ['🇬🇧', '🇪🇸'], size: '2.1 MB', type: 'PDF', date: '2025-12-13' },
            { name: 'Competitor Analysis Matrix', desc: 'Benchmark vs Signal/NFX.', status: 'completed', priority: 'Medium', flags: ['🇬🇧', '🇪🇸'], size: '3.5 MB', type: 'PDF', date: '2025-12-10' },
            { name: 'Anti-Scraping Strategy', desc: 'Counter-intelligence tech specification.', status: 'pending', priority: 'High', flags: ['🇬🇧'], size: '---', type: 'WIP', date: '---' },
        ]
    },
    'folder_ops': {
        title: 'OPERATIONS_CLIENTS',
        desc: 'SaaS Contracts, SLAs & Onboarding',
        locked: false,
        items: [
            { name: 'SaaS Terms & Conditions', desc: 'Main client service contract.', status: 'completed', priority: 'Critical', flags: ['🇦🇩', '🇬🇧', '🇪🇸'], size: '450 KB', type: 'PDF', date: '2025-12-05' },
            { name: 'Service Level Agreement (SLA)', desc: 'Uptime & support guarantees.', status: 'completed', priority: 'Medium', flags: ['🇦🇩', '🇬🇧', '🇪🇸'], size: '320 KB', type: 'PDF', date: '2025-12-05' },
            { name: 'Client Onboarding Manual', desc: 'Step-by-step setup guide.', status: 'completed', priority: 'Medium', flags: ['🇬🇧', '🇪🇸'], size: '5.5 MB', type: 'PDF', date: '2025-12-15' },
            { name: 'Acceptable Use Policy (AUP)', desc: 'Anti-spam & usage rules.', status: 'completed', priority: 'Low', flags: ['🇦🇩', '🇬🇧', '🇪🇸'], size: '220 KB', type: 'PDF', date: '2025-12-05' },
            { name: 'Phantom Shares Plan', desc: 'Employee incentive scheme.', status: 'completed', priority: 'Low', flags: ['🇦🇩', '🇬🇧', '🇪🇸'], size: '1.4 MB', type: 'PDF', date: '2025-12-01' },
        ]
    }
};

export default function DocsPage() {
    const [terminalState, setTerminalState] = useState<'idle' | 'connecting' | 'awaiting' | 'verified'>('idle');
    const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

    // Terminal Log Simulation
    const addLog = (msg: string) => setTerminalLogs(prev => [...prev.slice(-8), `> ${msg}`]);

    const handleAuth = () => {
        if (terminalState !== 'idle') return;
        setTerminalState('connecting');
        setTerminalLogs(['> ESTABLISHING_SECURE_uplink...']);

        const sequence = [
            { t: 800, msg: 'Resolving host: secure.fundlab.internal... [OK]' },
            { t: 1400, msg: 'Handshake: SYN_ACK received from 192.168.x.x' },
            { t: 2000, msg: 'Encrypting channel (AES-256-GCM)... DONE' },
            { t: 2600, msg: 'Verifying Identity_Token... [VALID]' },
            { t: 3200, msg: 'Initiating Biometric_Challenge...' },
            { t: 3800, msg: 'Scanning local devices for AUTHORIZED_KEY...' },
            { t: 4500, msg: 'Found device: "Nikita_Redmi_13C" (ID: #RD-13C-99X)' },
            { t: 5200, msg: 'Sending PUSH_NOTIFICATION (Priority: CRITICAL)...' },
        ];

        sequence.forEach(({ t, msg }) => {
            setTimeout(() => addLog(msg), t);
        });

        setTimeout(() => {
            setTerminalState('awaiting');
            addLog('WARN: Device feedback latency > 200ms');
            addLog('STATUS: AWAITING__PHYSICAL__CONFIRMATION...');
        }, 5500);
    };

    return (
        <div className="min-h-screen bg-[#050505] text-indigo-100 font-sans selection:bg-indigo-500/30 overflow-x-hidden pb-32">

            {/* --- TOP BAR (File Manager Style) --- */}
            <div className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/chat" className="p-2 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-indigo-900/20 border border-indigo-500/30 flex items-center justify-center">
                            <Shield className="w-4 h-4 text-indigo-400" />
                        </div>
                        <div>
                            <h1 className="text-sm font-bold text-white tracking-widest uppercase">FundLab<span className="text-indigo-500">_Vault</span></h1>
                            <p className="text-[10px] font-mono text-emerald-500/70 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                ENCRYPTED_CONNECTION_SECURE
                            </p>
                        </div>
                    </div>
                </div>
                <div className="hidden md:flex items-center gap-6 text-xs font-mono text-zinc-500">
                    <span className="flex items-center gap-2">
                        <HardDrive className="w-3 h-3" />
                        STORAGE: 45% USED
                    </span>
                    <span className="flex items-center gap-2">
                        <Cpu className="w-3 h-3" />
                        PING: 12ms
                    </span>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">

                {Object.entries(VAULT_DATA).map(([key, section]) => (
                    <div key={key} className="relative group">

                        {/* SECTION HEADER */}
                        <div className="flex items-end gap-4 mb-6 border-b border-white/5 pb-2">
                            <h2 className="text-2xl font-mono text-white/90">
                                /{section.title}
                            </h2>
                            <span className="text-sm text-zinc-500 font-mono mb-1">// {section.desc}</span>
                        </div>

                        {/* AUTH WALL FOR NIKITA SECTION */}
                        {section.locked && terminalState !== 'verified' ? (
                            <div className="relative rounded-xl overflow-hidden border border-red-900/30 bg-red-950/5 p-1">
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />

                                {/* PIOTR'S TERMINAL COMPONENT */}
                                <div className="bg-[#0a0a0a] rounded-lg p-6 md:p-8 font-mono border border-green-900/20 shadow-2xl relative overflow-hidden">
                                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 z-10 relative">

                                        {/* TERMINAL OUTPUT */}
                                        <div className="flex-1 w-full space-y-2">
                                            <div className="flex items-center gap-2 text-red-500 mb-4">
                                                <Lock className="w-5 h-5" />
                                                <span className="text-sm font-bold tracking-widest">ACCESS_RESTRICTED: Biometric Required</span>
                                            </div>

                                            <div className="bg-black/80 rounded border border-white/10 p-4 h-48 overflow-hidden flex flex-col justify-end">
                                                {terminalLogs.length === 0 && <span className="text-zinc-600 text-xs animate-pulse">_System Idle. Waiting for input...</span>}
                                                {terminalLogs.map((log, i) => (
                                                    <div key={i} className="text-xs text-green-400 font-mono">
                                                        {log}
                                                    </div>
                                                ))}
                                                {terminalState === 'awaiting' && (
                                                    <div className="text-xs text-yellow-500 font-mono animate-pulse mt-1">
                                                        [!] WAITING_FOR_DEVICE_APPROVAL...
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* INTERACTION PANEL */}
                                        <div className="flex flex-col items-center gap-4 min-w-[200px]">
                                            {terminalState === 'idle' ? (
                                                <button
                                                    onClick={handleAuth}
                                                    className="group relative px-6 py-3 bg-green-900/20 hover:bg-green-900/30 text-green-400 border border-green-800 rounded transition-all active:scale-95"
                                                >
                                                    <span className="absolute inset-0 bg-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
                                                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
                                                        <Terminal className="w-4 h-4" />
                                                        Initiate_Handshake
                                                    </div>
                                                </button>
                                            ) : (
                                                <div className="flex flex-col items-center justify-center p-6 border border-yellow-900/30 bg-yellow-900/5 rounded-lg w-full">
                                                    <Smartphone className="w-8 h-8 text-yellow-500 mb-3 animate-bounce" />
                                                    <span className="text-xs text-yellow-200 font-bold uppercase tracking-widest text-center">Check Mobile Device</span>
                                                    <span className="text-[10px] text-yellow-500/60 mt-1">Found: Redmi 13C</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* FILE LIST VIEW */
                            <div className="bg-white/5 border border-white/5 rounded-xl overflow-hidden backdrop-blur-sm">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-white/5 text-zinc-400 font-mono text-xs uppercase tracking-wider border-b border-white/5">
                                        <tr>
                                            <th className="px-6 py-4 font-medium w-12">St.</th>
                                            <th className="px-6 py-4 font-medium">Filename / Document</th>
                                            <th className="px-6 py-4 font-medium">Languages</th>
                                            <th className="px-6 py-4 font-medium hidden md:table-cell">Type</th>
                                            <th className="px-6 py-4 font-medium hidden md:table-cell">Size</th>
                                            <th className="px-6 py-4 font-medium text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {section.items.map((doc, i) => (
                                            <tr key={i} className="group hover:bg-white/5 transition-colors">
                                                <td className="px-6 py-4">
                                                    {doc.status === 'completed' ? (
                                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                                    ) : (
                                                        <Clock className="w-4 h-4 text-amber-500" />
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col">
                                                        <span className="font-medium text-indigo-100 group-hover:text-indigo-400 transition-colors">
                                                            {doc.name}
                                                        </span>
                                                        <span className="text-xs text-zinc-500 line-clamp-1">{doc.desc}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex -space-x-1">
                                                        {doc.flags.map((f, fi) => (
                                                            <span key={fi} className="text-lg filter drop-shadow hover:scale-125 transition-transform z-0 hover:z-10 bg-black/50 rounded-full" title="Language">
                                                                {f}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-zinc-500 font-mono text-xs hidden md:table-cell">
                                                    {doc.type}
                                                </td>
                                                <td className="px-6 py-4 text-zinc-500 font-mono text-xs hidden md:table-cell">
                                                    {doc.size}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button className="p-2 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition-colors">
                                                        <FileCheck className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* AMBIENT BACKGROUND */}
            <div className="fixed inset-0 pointer-events-none z-[-1]">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-emerald-900/5 blur-[150px] rounded-full" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay" />
            </div>
        </div>
    );
}
