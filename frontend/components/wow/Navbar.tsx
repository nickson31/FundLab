'use client';

import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-[0_0_20px_rgba(99,102,241,0.5)] group-hover:shadow-[0_0_30px_rgba(99,102,241,0.8)] transition-all duration-500">
                        <Sparkles className="w-4 h-4" strokeWidth={2} />
                    </div>
                    <span className="text-white font-bold tracking-tight text-lg font-heading group-hover:text-gray-200 transition-colors">FundLab</span>
                </div>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
                    <a href="#features" className="hover:text-white transition-colors">Features</a>
                    <a href="#data" className="hover:text-white transition-colors">Data & Privacy</a>
                    <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/login" className="text-sm font-medium text-gray-400 hover:text-white transition-colors hidden sm:block">Log in</Link>
                    <Button size="sm" className="bg-white text-black hover:bg-gray-200 font-bold rounded-full px-6 shadow-xl shadow-white/5" asChild>
                        <Link href="/chat">
                            Get Access <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </nav>
    );
}
