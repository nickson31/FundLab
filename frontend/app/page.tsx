import Link from 'next/link';
import { ArrowRight, Search, Zap, Globe, ShieldCheck, BarChart3, Users, Building2, BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/wow/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30 selection:text-indigo-200">
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen pt-20 overflow-hidden">
        {/* Ambient Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] -z-10 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -z-10" />

        <div className="container mx-auto px-4 text-center z-10 relative max-w-5xl">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-[10px] font-bold text-indigo-300 tracking-widest uppercase">The AI Co-Pilot for Founders</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-6">
            Your First Round, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Faster.</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            FundLab is the intelligence layer for your fundraise. <br className="hidden md:block" />
            We use LLMs to match you with the perfect investors, turning weeks of research into seconds.
          </p>

          {/* Search Demo - Interactive Look */}
          <div className="w-full max-w-3xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
            <div className="relative bg-[#0A0A0A] border border-white/10 rounded-2xl p-2 md:p-4 shadow-2xl">

              {/* Fake Input */}
              <div className="flex items-center gap-4 bg-transparent px-4 py-3">
                <Search className="w-6 h-6 text-slate-500" />
                <span className="text-slate-200 text-lg md:text-xl font-medium truncate">Find Pre-Seed Fintech Angels in London...</span>
                <div className="ml-auto">
                  <Link href="/chat">
                    <Button size="icon" className="rounded-full bg-indigo-600 hover:bg-indigo-500 text-white w-10 h-10 flex items-center justify-center">
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* AI Reasoning Chips */}
              <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap gap-2 px-2">
                <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1 w-full sm:w-auto">
                  <BrainCircuit className="w-3 h-3" /> AI Reasoning
                </div>
                {['Vertical: Fintech', 'Stage: Pre-Seed', 'Geo: London', 'Cheque: £25k-£100k'].map((tag, i) => (
                  <span key={i} className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 text-xs">
                    {tag}
                  </span>
                ))}
              </div>

            </div>
          </div>

          {/* Footer / Trust */}
          <div className="mt-20 opacity-40">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Powering searches matching</p>
            <div className="flex items-center justify-center gap-3 text-2xl font-bold text-slate-600">
              <span>$2.5B+</span>
              <span className="text-sm font-normal text-slate-500">in capital deployment</span>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
