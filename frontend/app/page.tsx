import Link from 'next/link';
import { ArrowRight, Search, Zap, Globe, ShieldCheck, BarChart3, Users, Building2, BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/wow/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30 selection:text-indigo-200">
      <Navbar />

      {/* Hero Section (Search Centric - The "New" Preferred Look) */}
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

      {/* Feature Grid / Value Prop (Restored from Legacy) */}
      <section className="py-24 bg-white/5 border-t border-white/10 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Intelligence, not just Data.</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Legacy databases give you spreadsheets. FundLab gives you answers. Our neural engine analyzes investment patterns to find matches human researchers miss.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={BrainCircuit}
              title="Semantic Matching"
              desc="Don't search for keyword matches. Search for 'Investors who like B2B marketplaces in LatAm' and get semantic results."
            />
            <FeatureCard
              icon={Globe}
              title="Global Coverage"
              desc="Real-time data on 15,000+ Funds and 35,000+ Angels across North America, Europe, and emerging markets."
            />
            <FeatureCard
              icon={Zap}
              title="Instant Outreach"
              desc="Generate hyper-personalized cold emails referencing the investor's specific recent deals and thesis."
            />
          </div>
        </div>
      </section>

      {/* Deep Dive / SEO Section (Restored) */}
      <section className="py-24 bg-black border-t border-white/5">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl transform rotate-2"></div>
            <div className="relative rounded-xl border border-white/10 bg-white/5 p-8 aspect-video flex items-center justify-center">
              <span className="text-slate-500 italic">Dashboard Visualization</span>
            </div>
          </div>
          <div>
            <div className="inline-block p-2 bg-indigo-500/10 rounded-lg mb-4">
              <BarChart3 className="w-6 h-6 text-indigo-400" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Stop guessing. Start closing.</h2>
            <div className="space-y-6 text-lg text-slate-400">
              <p>
                Fundraising is a sales funnel. The quality of your leads determines your conversion rate.
              </p>
              <p>
                Most founders waste months pitching investors who never invest in their sector. FundLab's <strong>Content Scoring Engine</strong> analyzes millions of data points—from ticket sizes to board seat requirements—to ensure you only pitch high-probability targets.
              </p>
              <ul className="space-y-3 mt-4">
                <li className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span>Verified email addresses</span>
                </li>
                <li className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span>Thesis-aligned matching</span>
                </li>
                <li className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span>Warm intro pathfinding</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section (Restored) */}
      <section className="py-20 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="bg-indigo-950/50 border border-indigo-500/20 rounded-3xl p-12 lg:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>

            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 relative z-10">Ready to fund your vision?</h2>
            <p className="text-indigo-200 text-lg max-w-xl mx-auto mb-10 relative z-10">
              Join 2,000+ founders using FundLab to close their rounds faster. No credit card required for search.
            </p>
            <Link href="/chat">
              <Button size="lg" className="h-16 px-10 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-lg font-bold shadow-2xl relative z-10 transition-transform hover:scale-105">
                Launch FundLab AI
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="group p-8 bg-white/5 rounded-2xl border border-white/5 hover:border-indigo-500/30 hover:bg-white/10 transition-all duration-300">
      <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}
