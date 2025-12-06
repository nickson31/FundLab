'use client';

import MacShell from '@/components/layout/MacShell';
import { FileText } from 'lucide-react';

export default function DocsPage() {
    return (
        <MacShell>
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent flex items-center justify-center p-8">
                <div className="text-center glass-panel p-12 rounded-2xl border border-white/5 shadow-2xl max-w-lg w-full">
                    <div className="w-16 h-16 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/5">
                        <FileText className="w-8 h-8 text-indigo-400" />
                    </div>
                    <h1 className="text-3xl font-medium text-white mb-4 tracking-tight">Documentation</h1>
                    <p className="text-gray-400 font-light leading-relaxed">
                        Comprehensive guides and API references for the FundLab platform are currently being written.
                    </p>
                    <div className="mt-8">
                        <span className="text-xs font-medium bg-white/5 text-gray-500 px-3 py-1 rounded-full border border-white/5">Coming Soon</span>
                    </div>
                </div>
            </div>
        </MacShell>
    );
}
