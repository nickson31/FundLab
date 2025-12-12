import Link from 'next/link';
import { ArrowRight, Search, Zap, Globe, ShieldCheck, BarChart3, Users, Building2, BrainCircuit, Database, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/wow/Navbar';

export default function Home() {
  return (
    // Global: White background in light mode, Black in dark mode
    <div className="min-h-screen bg-white dark:bg-black text-indigo-950 dark:text-white selection:bg-indigo-500/30 selection:text-indigo-200">
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen pt-20 overflow-hidden">
        {/* Ambient Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-200/40 dark:bg-indigo-600/20 rounded-full blur-[120px] -z-10 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-200/40 dark:bg-purple-600/10 rounded-full blur-[120px] -z-10" />

        <div className="container mx-auto px-4 text-center z-10 relative max-w-5xl">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-white/5 border border-indigo-100 dark:border-white/10 mb-8 animate-fade-in shadow-sm">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-300 tracking-widest uppercase">The AI Co-Pilot for Founders</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-indigo-950 dark:text-white mb-6">
            Your First Round, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-400">Faster.</span>
          </h1>

          {/* Subheading - NO GRAYS */}
          <p className="text-xl md:text-2xl text-indigo-900/70 dark:text-indigo-200/70 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
            FundLab is the intelligence layer for your fundraise. <br className="hidden md:block" />
            We use LLMs to match you with the perfect investors, turning weeks of research into seconds.
          </p>

          {/* HERO SEARCH INTERFACE (Matches Image 0) */}
          <div className="w-full max-w-4xl mx-auto mt-12 mb-20">
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/50 to-purple-600/50 rounded-2xl opacity-75 blur-xl group-hover:opacity-100 transition duration-1000"></div>

              {/* Main Card */}
              <div className="relative rounded-2xl bg-[#0A0A0A] border border-indigo-500/30 p-8 shadow-2xl">
                {/* Search Input Visual */}
                <div className="flex items-center gap-4 text-white/50 text-xl font-medium mb-8">
                  <Search className="w-6 h-6 text-white/50" />
                  <span>Find Pre-Seed Fintech Angels in London...</span>
                  <div className="ml-auto bg-indigo-600 rounded-full p-2 text-white">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>

                {/* AI Reasoning Chips */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider mr-2">
                    <Sparkles className="w-3 h-3" /> AI Reasoning
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/70">Vertical: Fintech</span>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/70">Stage: Pre-Seed</span>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/70">Geo: London</span>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/70">Cheque: £25k-£100k</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer / Trust */}
          <div className="mt-12 opacity-60">
            <p className="text-xs font-bold text-indigo-300 dark:text-indigo-700/50 uppercase tracking-widest mb-4">Powering searches matching</p>
            <div className="flex items-center justify-center gap-3 text-2xl font-bold text-indigo-900 dark:text-indigo-200/50">
              <span>$2.5B+</span>
              <span className="text-sm font-normal text-indigo-400 dark:text-indigo-500/50">in capital deployment</span>
            </div>
          </div>
        </div>
      </section>

      {/* Intelligence at Scale (Matches Image 2) */}
      <section className="py-24 bg-black relative border-t border-white/10">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Intelligence at <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Scale.</span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Stop manually searching LinkedIn. Our AI digests millions of data points to find the investors actually interested in your vertical.
            </p>
          </div>

          {/* 3 GRID CARDS (Image 2) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Card 1 */}
            <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-8 hover:border-indigo-500/50 transition-colors">
              <div className="w-12 h-12 bg-indigo-900/20 rounded-xl flex items-center justify-center text-indigo-400 mb-6 border border-indigo-500/20">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">500k+ Profiles</h3>
              <p className="text-zinc-500 leading-relaxed text-sm">
                Access the world's most comprehensive database of Angels, VCs, and Family Offices.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-8 hover:border-purple-500/50 transition-colors">
              <div className="w-12 h-12 bg-purple-900/20 rounded-xl flex items-center justify-center text-purple-400 mb-6 border border-purple-500/20">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Semantic Matching</h3>
              <p className="text-zinc-500 leading-relaxed text-sm">
                Don't rely on keywords. Describe your startup in plain English and let AI find the perfect thesis match.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-8 hover:border-emerald-500/50 transition-colors">
              <div className="w-12 h-12 bg-emerald-900/20 rounded-xl flex items-center justify-center text-emerald-400 mb-6 border border-emerald-500/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Privacy First</h3>
              <p className="text-zinc-500 leading-relaxed text-sm">
                GDPR compliant. Your data is secure, and we never resell your contact info.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BUILT FOR EVERY STAGE (Features - Image 1) */}
      <section className="py-24 bg-black border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Built for Every Stage.</h2>
            <p className="text-zinc-400 text-lg">Whether you're raising your first check or closing a Series A, FundLab adapts to your needs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {/* Card 1: PRE-SEED */}
            <div className="rounded-2xl border border-emerald-900/50 bg-[#0A0A0A] p-8 hover:border-emerald-500/50 transition-all duration-300 group">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Pre-Seed</span>
                <span className="text-xs font-medium text-emerald-900/60 dark:text-emerald-500/30">€50k - €500k</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Find Your First Angels</h3>
              <p className="text-zinc-500 text-sm mb-8 min-h-[60px]">
                Access 50,000+ angel investors actively looking for early-stage deals. Perfect for first-time founders.
              </p>
              <ul className="space-y-3">
                {["Angel investor database", "Warm intro suggestions", "Pitch deck review AI"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-zinc-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 2: SEED */}
            <div className="rounded-2xl border border-indigo-900/50 bg-[#0A0A0A] p-8 hover:border-indigo-500/50 transition-all duration-300 group">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest">Seed</span>
                <span className="text-xs font-medium text-indigo-900/60 dark:text-indigo-500/30">€500k - €3M</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Connect with Early VCs</h3>
              <p className="text-zinc-500 text-sm mb-8 min-h-[60px]">
                Match with seed-stage VCs who've invested in your vertical. Get personalized outreach that converts.
              </p>
              <ul className="space-y-3">
                {["VC fund matching", "LP network access", "Due diligence prep"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-zinc-400">
                    <Check className="w-4 h-4 text-indigo-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 3: SERIES A+ */}
            <div className="rounded-2xl border border-orange-900/50 bg-[#0A0A0A] p-8 hover:border-orange-500/50 transition-all duration-300 group">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">Series A+</span>
                <span className="text-xs font-medium text-orange-900/60 dark:text-orange-500/30">€3M+</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Scale Your Round</h3>
              <p className="text-zinc-500 text-sm mb-8 min-h-[60px]">
                Reach institutional investors and growth funds. Manage complex cap tables and syndicate deals.
              </p>
              <ul className="space-y-3">
                {["Institutional access", "Syndicate builder", "Term sheet analyzer"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-zinc-400">
                    <Check className="w-4 h-4 text-orange-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-indigo-50 dark:border-white/5 bg-slate-50 dark:bg-black">
        <div className="container mx-auto px-4">
          {/* CTA VISUAL (Coded) */}
          <div className="rounded-[3rem] overflow-hidden shadow-2xl shadow-indigo-600/30 max-w-6xl mx-auto relative bg-indigo-900 dark:bg-white/5">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-800 opacity-90"></div>
            <div className="relative z-10 p-16 md:p-24 text-center">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8">Ready to close your round?</h2>
              <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">Join 500+ founders who have accelerated their fundraising with FundLab.</p>
              <Link href="/chat">
                <Button size="lg" className="h-16 px-10 rounded-full text-lg font-bold bg-white text-indigo-600 hover:bg-indigo-50 shadow-xl transition-all hover:scale-105">
                  Find Investors Now <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
