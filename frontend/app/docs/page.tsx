'use client';

import React, { useState } from 'react';
import MacShell from '@/components/layout/MacShell';
import { Lock, Shield, CheckCircle2, Clock, Globe, Fingerprint, Smartphone, AlertTriangle, FileText, ChevronDown, ChevronRight, Flag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// --- DATA STRUCTURE FROM ROADMAP ---
const DOC_PHASES = [
    {
        id: 'phase0',
        title: 'Fase 0: Constitución y Legal Andorra',
        description: 'Legalidad, Protección de Socios y Estructura Fiscal.',
        items: [
            { name: 'Solicitud de Reserva de Denominación Social', status: 'completed', priority: 'Critical' },
            { name: 'Gastos Pre-Constitución (Socios)', status: 'completed', priority: 'High', isNew: true },
            { name: 'Solicitud de Inversión Extranjera (SIE)', status: 'pending', priority: 'Low' },
            { name: 'Pacto de Socios (Shareholders\' Agreement)', status: 'completed', priority: 'High' },
            { name: 'Estatutos Sociales (By-Laws)', status: 'completed', priority: 'High' },
            { name: 'Certificado Bancario de Desembolso', status: 'pending', priority: 'High' },
            { name: 'Escritura Pública de Constitución', status: 'pending', priority: 'High' },
            { name: 'Inscripción en el Registre de Societats', status: 'pending', priority: 'High' },
            { name: 'Solicitud de NRT', status: 'pending', priority: 'High' },
            { name: 'Inscripción en el Registre de Comerç', status: 'pending', priority: 'High' },
            { name: 'Alta en la CASS', status: 'pending', priority: 'Medium' },
        ]
    },
    {
        id: 'phaseRec',
        title: 'Fase Rec: Documentación Personal',
        description: 'Permisos y Contratación (Ejecutivo No Residente).',
        items: [
            { name: 'Contrato de Prestación de Servicios', status: 'pending', priority: 'High' },
            { name: 'Permiso de Trabajo (Fronterizo/Extranjero)', status: 'pending', priority: 'Media' },
            { name: 'Antecedentes Penales (Apostillado)', status: 'completed', priority: 'High' },
            { name: 'CV y Títulos Apostillados', status: 'completed', priority: 'Media' },
        ]
    },
    {
        id: 'phase1',
        title: 'Fase 1: Data Compliance & IP',
        description: 'Cumplimiento LQPD/GDPR y Protección del Activo.',
        items: [
            { name: 'Registro de Actividades de Tratamiento (RAT)', status: 'pending', priority: 'Critical' },
            { name: 'Evaluación de Impacto (AIPD / DPIA)', status: 'pending', priority: 'Critical' },
            { name: 'Test de Legitimidad (LIA)', status: 'pending', priority: 'High' },
            { name: 'Política de Privacidad (Web/App)', status: 'pending', priority: 'High' },
            { name: 'Política de Cookies', status: 'pending', priority: 'Medium' },
            { name: 'Compliance Check (LinkedIn/Crunchbase)', status: 'pending', priority: 'High' },
            { name: 'Contratos de Encargado (DPA)', status: 'pending', priority: 'High' },
            { name: 'Registro de Propiedad Intelectual', status: 'pending', priority: 'High' },
            { name: 'Estrategia de Ciberseguridad (Piotr)', status: 'pending', priority: 'Critical' },
            { name: 'NDA y Cesión IP - Pavel & Piotr', status: 'completed', priority: 'Critical' },
            { name: 'NDAs Inversores/Terceros', status: 'completed', priority: 'Media' },
        ]
    },
    {
        id: 'phase2',
        title: 'Fase 2: Estrategia y Negocio',
        description: 'Documentación para inversores y hoja de ruta interna.',
        items: [
            { name: 'Business Model Canvas', status: 'completed', priority: 'Medium' },
            { name: 'Pitch Deck (Investor Ready)', status: 'completed', priority: 'High' },
            { name: 'Product Roadmap (12 Meses)', status: 'completed', priority: 'High' },
            { name: 'Estrategia Anti-Scraping (Piotr)', status: 'pending', priority: 'High' },
            { name: 'Proyecciones Financieras (P&L)', status: 'completed', priority: 'High' },
            { name: 'Proyecciones Financieras (Cashflow)', status: 'completed', priority: 'Critical' },
            { name: 'Unit Economics Analysis', status: 'completed', priority: 'High' },
            { name: 'Competitor Analysis Matrix', status: 'completed', priority: 'Medium' },
        ]
    },
    {
        id: 'phase3',
        title: 'Fase 3: Operaciones y Clientes',
        description: 'Relación comercial y seguridad jurídica del servicio.',
        items: [
            { name: 'Términos y Condiciones (SaaS T&C)', status: 'completed', priority: 'Critical' },
            { name: 'Acuerdo de Nivel de Servicio (SLA)', status: 'completed', priority: 'Medium' },
            { name: 'Contrato de Mandato de Fundraising', status: 'completed', priority: 'High' },
            { name: 'Manual de Onboarding', status: 'completed', priority: 'Medium' },
            { name: 'Política de Acceptable Use (AUP)', status: 'completed', priority: 'Low' },
            { name: 'Plan de Incentivos (Phantom Shares)', status: 'completed', priority: 'Low' },
        ]
    }
];

export default function DocsPage() {
    const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>({
        phase0: true,
        phaseRec: true,
        phase1: false,
        phase2: false,
        phase3: false
    });

    const togglePhase = (id: string) => {
        setExpandedPhases(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleDocClick = () => {
        // Show simple browser alert or just do nothing but visuals since it's "locked"
        // User requested: "Quiero decirle que estan bloqueados..."
        // We will show a toast-like overlay or something visually clearer ?
        // Let's use a subtle state to show a "Access Denied" badge nearby or shake animation.
    };

    return (
        <MacShell>
            <div className="flex-1 h-full overflow-hidden bg-slate-50 dark:bg-black/20 flex flex-col relative">

                {/* HEADER: Security Status */}
                <div className="bg-white/80 dark:bg-slate-900/60 border-b border-indigo-100 dark:border-white/5 p-6 backdrop-blur-md z-10 sticky top-0">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-indigo-950 dark:text-white mb-1 flex items-center gap-2">
                                <FileText className="w-6 h-6 text-indigo-600" />
                                Corporate Documentation
                            </h1>
                            <p className="text-sm text-indigo-400 dark:text-slate-400">Legal, IP, and Strategic Assets Registry</p>
                        </div>

                        {/* Security Badge */}
                        <div className="flex items-center gap-3 px-4 py-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 rounded-lg">
                            <div className="relative">
                                <Shield className="w-5 h-5 text-amber-600 dark:text-amber-500" />
                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-amber-800 dark:text-amber-200 uppercase tracking-wider">Vault Locked</span>
                                <span className="text-[10px] text-amber-600/80 dark:text-amber-400">Waiting for 2FA (Ignasi's Device)</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CONTENT */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-20">

                    {/* SECURITY WARNING BANNER */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-xl border border-red-100 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10 p-4 flex items-start gap-4"
                    >
                        <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full text-red-600 dark:text-red-400 mt-1">
                            <Smartphone className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-red-900 dark:text-red-200 mb-1">Security Verification Required</h3>
                            <p className="text-sm text-red-800/80 dark:text-red-300/70 leading-relaxed">
                                Adhering to our Cybersec Policy v2.0 (Piotr's Protocol), document encryption keys are rotated hourly.
                                <br />
                                <strong>Action Required:</strong> Please approve the push notification sent to Ignasi's authorized device to decrypt the file contents.
                            </p>
                        </div>
                    </motion.div>

                    {/* PHASES GRID */}
                    <div className="grid grid-cols-1 gap-6 max-w-5xl mx-auto">
                        {DOC_PHASES.map((phase) => (
                            <motion.div
                                key={phase.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white dark:bg-[#0A0A0A] border border-indigo-100 dark:border-white/5 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all"
                            >
                                {/* Phase Header */}
                                <button
                                    onClick={() => togglePhase(phase.id)}
                                    className="w-full flex items-center justify-between p-6 bg-slate-50/50 dark:bg-white/5 border-b border-indigo-50 dark:border-white/5 transition-colors hover:bg-slate-100/50 dark:hover:bg-white/10"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={cn(
                                            "w-10 h-10 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 bg-indigo-100/50 dark:bg-white/10",
                                            phase.id === 'phase0' && "text-emerald-600 bg-emerald-100/50",
                                            phase.id === 'phase3' && "text-purple-600 bg-purple-100/50"
                                        )}>
                                            {phase.id === 'phase0' ? <Building2Icon /> :
                                                phase.id === 'phase1' ? <Fingerprint className="w-5 h-5" /> :
                                                    phase.id === 'phase2' ? <Clock className="w-5 h-5" /> :
                                                        <CheckCircle2 className="w-5 h-5" />}
                                        </div>
                                        <div className="text-left">
                                            <h3 className="text-lg font-bold text-indigo-950 dark:text-white">{phase.title}</h3>
                                            <p className="text-sm text-indigo-400 dark:text-slate-500">{phase.description}</p>
                                        </div>
                                    </div>
                                    {expandedPhases[phase.id] ? <ChevronDown className="w-5 h-5 text-indigo-300" /> : <ChevronRight className="w-5 h-5 text-indigo-300" />}
                                </button>

                                {/* Phase Items */}
                                <AnimatePresence>
                                    {expandedPhases[phase.id] && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="border-t border-indigo-50 dark:border-white/5"
                                        >
                                            <div className="divide-y divide-indigo-50 dark:divide-white/5">
                                                {phase.items.map((item, idx) => (
                                                    <div
                                                        key={idx}
                                                        onClick={handleDocClick}
                                                        className={cn(
                                                            "group flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-not-allowed relative overflow-hidden",
                                                            item.status === 'completed' ? "bg-white dark:bg-transparent" : "bg-slate-50/30 dark:bg-black/20"
                                                        )}
                                                    >
                                                        <div className="flex items-center gap-4 relative z-10">
                                                            <div className={cn(
                                                                "w-2 h-2 rounded-full",
                                                                item.status === 'completed' ? "bg-emerald-500" : "bg-amber-500"
                                                            )} />
                                                            <div className="flex flex-col">
                                                                <span className={cn(
                                                                    "text-sm font-medium",
                                                                    item.status === 'completed' ? "text-indigo-950 dark:text-slate-200" : "text-slate-500 dark:text-slate-500"
                                                                )}>
                                                                    {item.name}
                                                                </span>
                                                                <div className="flex items-center gap-2 mt-1">
                                                                    <span className={cn(
                                                                        "text-[10px] px-1.5 py-0.5 rounded border uppercase tracking-wider",
                                                                        item.priority === 'Critical' ? "bg-red-50 text-red-600 border-red-100 dark:bg-red-900/20 dark:border-red-900/50" :
                                                                            item.priority === 'High' ? "bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-900/20 dark:border-orange-900/50" :
                                                                                "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:border-blue-900/50"
                                                                    )}>
                                                                        {item.priority}
                                                                    </span>
                                                                    {item.status === 'completed' && (
                                                                        <div className="flex items-center gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                                                                            <span title="English" className="text-xs grayscale group-hover:grayscale-0 transition-all">🇬🇧</span>
                                                                            <span title="Español" className="text-xs grayscale group-hover:grayscale-0 transition-all">🇪🇸</span>
                                                                            <span title="Català" className="text-xs grayscale group-hover:grayscale-0 transition-all font-mono text-[9px] border border-slate-200 px-0.5 rounded">CAT</span>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Lock Icon */}
                                                        <div className="flex items-center gap-3 relative z-10">
                                                            {item.status === 'completed' ? (
                                                                <div className="flex items-center text-indigo-300 dark:text-slate-600 gap-2">
                                                                    <span className="text-xs font-medium">Encrypted</span>
                                                                    <Lock className="w-4 h-4" />
                                                                </div>
                                                            ) : (
                                                                <div className="flex items-center text-slate-300 dark:text-slate-700 gap-2">
                                                                    <span className="text-xs">Pending</span>
                                                                    <Clock className="w-4 h-4" />
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Disabled Overlay on Click */}
                                                        <div className="absolute inset-0 z-0 bg-transparent" />
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </MacShell>
    );
}

// Icon Helper
function Building2Icon() { return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" /><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" /><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" /><path d="M10 6h4" /><path d="M10 10h4" /><path d="M10 14h4" /><path d="M10 18h4" /></svg> }
