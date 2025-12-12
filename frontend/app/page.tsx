import Link from 'next/link';
import { ArrowRight, Search, Zap, Globe, ShieldCheck, BarChart3, Users, Building2, BrainCircuit, Database } from 'lucide-react';
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

          {/* Search Demo - Interactive Look */}
          <div className="w-full max-w-3xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl opacity-20 group-hover:opacity-40 transition duration-500 blur-lg"></div>
            <div className="relative bg-white dark:bg-[#0A0A0A] border border-indigo-100 dark:border-white/10 rounded-2xl p-2 md:p-4 shadow-2xl shadow-indigo-500/10 dark:shadow-black/50">

              {/* Fake Input */}
              <div className="flex items-center gap-4 bg-transparent px-4 py-3">
                <Search className="w-6 h-6 text-indigo-400 dark:text-indigo-500" />
                <span className="text-indigo-300 dark:text-slate-500 text-lg md:text-xl font-medium truncate">Find Pre-Seed Fintech Angels in London...</span>
                <div className="ml-auto">
                  <Link href="/chat">
                    <Button size="icon" className="rounded-full bg-indigo-600 hover:bg-indigo-500 text-white w-12 h-12 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                      <ArrowRight className="w-6 h-6" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* AI Reasoning Chips */}
              <div className="mt-4 pt-4 border-t border-indigo-50 dark:border-white/5 flex flex-wrap gap-2 px-2">
                <div className="flex items-center gap-2 text-indigo-500 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1 w-full sm:w-auto">
                  <BrainCircuit className="w-4 h-4" /> AI Reasoning
                </div>
                {['Vertical: Fintech', 'Stage: Pre-Seed', 'Geo: London', 'Cheque: £25k-£100k'].map((tag, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-white/5 border border-indigo-100 dark:border-white/10 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
                    {tag}
                  </span>
                ))}
              </div>

            </div>
          </div>

          {/* Footer / Trust */}
          <div className="mt-20 opacity-60">
            <p className="text-xs font-bold text-indigo-300 dark:text-indigo-700/50 uppercase tracking-widest mb-4">Powering searches matching</p>
            <div className="flex items-center justify-center gap-3 text-2xl font-bold text-indigo-900 dark:text-indigo-200/50">
              <span>$2.5B+</span>
              <span className="text-sm font-normal text-indigo-400 dark:text-indigo-500/50">in capital deployment</span>
            </div>
          </div>

        </div>
      </section>

      {/* Intelligence at Scale (Redesigned - Emblematic, Colorful) */}
      <section className="py-32 bg-slate-50 dark:bg-black relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-indigo-950 dark:text-white mb-6 tracking-tight">
              Intelligence at <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Scale.</span>
            </h2>
            <p className="text-xl text-indigo-800/60 dark:text-indigo-200/60 max-w-2xl mx-auto leading-relaxed">
              Stop manually searching LinkedIn. Our AI digests millions of data points to find the investors actually interested in your vertical.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <PremiumFeatureCard
              icon={Database}
              title="500k+ Profiles"
              desc="Access the world's most comprehensive database of Angels, VCs, and Family Offices."
              gradient="from-blue-500 to-indigo-500" // More vibrant
            />
            <PremiumFeatureCard
              icon={BrainCircuit}
              title="Semantic Matching"
              desc="Don't rely on keywords. Describe your startup in plain English and let AI find the perfect thesis match."
              gradient="from-purple-500 to-pink-500"
            />
            <PremiumFeatureCard
              icon={ShieldCheck}
              title="Privacy First"
              desc="GDPR compliant. Your data is secure, and we never resell your contact info."
              gradient="from-emerald-500 to-teal-500"
            />
          </div>
        </div>
      </section>

      {/* Deep Dive / SEO Section (Restored) */}
      <section className="py-24 bg-white dark:bg-black border-t border-indigo-50 dark:border-white/5">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl transform rotate-2"></div>
            <div className="relative rounded-2xl border border-indigo-100 dark:border-white/10 bg-white dark:bg-white/5 p-8 aspect-video flex items-center justify-center shadow-xl">
              <span className="text-indigo-400 dark:text-indigo-500/50 font-medium italic">Dashboard Visualization</span>
            </div>
          </div>
          <div>
            <div className="inline-block p-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl mb-6">
              <BarChart3 className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-indigo-950 dark:text-white mb-8">Stop guessing. <br />Start closing.</h2>
            <div className="space-y-6 text-lg text-indigo-900/70 dark:text-indigo-200/60">
              <p>
                Fundraising is a sales funnel. The quality of your leads determines your conversion rate.
              </p>
              <p>
                Most founders waste months pitching investors who never invest in their sector. FundLab's <strong>Content Scoring Engine</strong> analyzes millions of data points—from ticket sizes to board seat requirements—to ensure you only pitch high-probability targets.
              </p>
              <ul className="space-y-4 mt-8">
                <li className="flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-emerald-500" />
                  <span className="font-semibold text-indigo-950 dark:text-white">Verified email addresses</span>
                </li>
                <li className="flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-emerald-500" />
                  <span className="font-semibold text-indigo-950 dark:text-white">Thesis-aligned matching</span>
                </li>
                <li className="flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-emerald-500" />
                  <span className="font-semibold text-indigo-950 dark:text-white">Warm intro pathfinding</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section (Restored) */}
      <section className="py-20 border-t border-indigo-50 dark:border-white/5 bg-slate-50 dark:bg-black">
        <div className="container mx-auto px-4">
          <div className="bg-indigo-600 dark:bg-indigo-950/50 border border-indigo-500/20 rounded-[3rem] p-12 lg:p-24 text-center relative overflow-hidden shadow-2xl shadow-indigo-600/30">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

            <h2 className="text-3xl lg:text-6xl font-black text-white mb-8 relative z-10">Ready to fund your vision?</h2>
            <p className="text-indigo-100 text-xl max-w-2xl mx-auto mb-12 relative z-10 font-medium">
              Join 2,000+ founders using FundLab to close their rounds faster. No credit card required for search.
            </p>
            <Link href="/chat">
              <Button size="lg" className="h-20 px-12 rounded-full bg-white text-indigo-600 hover:bg-indigo-50 text-xl font-bold shadow-2xl relative z-10 transition-transform hover:scale-105">
                Launch FundLab AI
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function PremiumFeatureCard({ icon: Icon, title, desc, gradient }: { icon: any, title: string, desc: string, gradient: string }) {
  return (
    <div className="group relative p-1 rounded-[2rem] bg-gradient-to-br from-indigo-500/5 to-purple-500/5 hover:from-indigo-500/20 hover:to-purple-500/20 transition-all duration-500">
      {/* Card Content - White Glass in Light Mode, Dark Glass in Dark Mode */}
      <div className="relative h-full bg-white dark:bg-[#0A0A0A] border border-indigo-100 dark:border-white/5 rounded-[1.8rem] p-10 overflow-hidden shadow-lg shadow-indigo-100/50 dark:shadow-none transition-shadow hover:shadow-2xl hover:shadow-indigo-500/10">

        {/* Hover Glow */}
        <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${gradient} opacity-20 dark:opacity-40 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-700`} />

        <div className="relative z-10">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-8 h-8 text-white relative z-10" />
            <div className="absolute inset-0 bg-white/20 blur-sm rounded-2xl"></div>
          </div>
          <h3 className="text-3xl font-bold text-indigo-950 dark:text-white mb-4">{title}</h3>
          <p className="text-indigo-900/60 dark:text-slate-400 leading-relaxed text-lg font-medium">{desc}</p>
        </div>
      </div>
    </div>
  );
}
