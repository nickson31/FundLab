'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Search,
  ArrowRight,
  Bot,
  Database,
  BrainCircuit,
  ShieldCheck,
  Check,
  LayoutGrid,
  Users,
  MessageSquare,
  Settings,
  Plus
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden text-gray-400 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">

      {/* Background Gradients */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(99,102,241,0.15)_0%,rgba(0,0,0,0)_70%)] pointer-events-none z-0" />
        <div className="absolute bottom-[-10%] right-[20%] w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(99,102,241,0.15)_0%,rgba(0,0,0,0)_70%)] pointer-events-none z-0" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]">
              <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} />
            </div>
            <span className="text-white font-medium tracking-tight text-sm group-hover:text-gray-200 transition-colors">FundLab</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-medium text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#data" className="hover:text-white transition-colors">Data & Privacy</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-xs font-medium text-gray-400 hover:text-white transition-colors hidden sm:block">Log in</Link>
            <Link href="/chat" className="text-xs font-medium bg-white text-black px-3 py-1.5 rounded-full hover:bg-gray-200 transition-colors flex items-center gap-1.5">
              Get access
              <ArrowRight className="w-3 h-3" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="max-w-4xl mx-auto text-center relative z-10">

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-wider font-medium text-indigo-300 mb-8 animate-fade-in-up">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
            AI Copilot for Fundraising
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium text-white tracking-tight mb-6 leading-[1.1]">
            Connect with the perfect <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-500">investors for your startup.</span>
          </h1>

          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            FundLab is the AI agent that finds, vets, and connects you. Access 500k+ investor profiles with an intelligent matching algorithm designed for founders.
          </p>

          {/* Interactive Search Demo */}
          <div className="max-w-2xl mx-auto perspective-1000 group">
            <div className="relative glass-panel rounded-xl p-1.5 transition-all duration-500 group-hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.2)] group-hover:border-indigo-500/30">

              {/* Search Input Simulation */}
              <div className="relative bg-black rounded-lg border border-white/10 px-4 py-4 flex items-center gap-3 shadow-inner">
                <Search className="text-gray-500 w-[18px]" strokeWidth={1.5} />
                <div className="flex-1 flex flex-col items-start h-full justify-center">
                  <span className="text-sm text-gray-200 font-normal">Find fintech angels in Madrid</span>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <span className="text-[10px] text-gray-600 border border-white/10 rounded px-1.5 py-0.5">⌘ K</span>
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded-md transition-colors flex items-center justify-center">
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>

              {/* AI Expansion Result Simulation */}
              <div className="mt-2 px-4 py-3 bg-white/[0.02] rounded-lg border border-white/5 text-left">
                <div className="flex items-center gap-2 mb-3">
                  <Bot className="text-indigo-400 w-3.5 h-3.5" strokeWidth={1.5} />
                  <span className="text-xs text-indigo-300 font-medium">AI Query Expansion</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Fintech', 'Seed Stage', 'Angel Investor', 'Location: Madrid + 50km', 'Prior Exits > €10M'].map((tag) => (
                    <span key={tag} className="text-xs text-gray-400 bg-white/5 border border-white/5 px-2 py-1 rounded hover:bg-white/10 cursor-default transition-colors">{tag}</span>
                  ))}
                  <span className="text-xs text-gray-400 bg-white/5 border border-white/5 px-2 py-1 rounded hover:bg-white/10 cursor-default transition-colors opacity-60">High Activity</span>
                </div>
              </div>

              {/* Simulated Results List (Bottom Edge) */}
              <div className="mt-2 border-t border-white/5 pt-2">
                <div className="flex items-center justify-between px-2 py-2 hover:bg-white/5 rounded cursor-pointer group/item">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-semibold">JD</div>
                    <div className="text-left">
                      <div className="text-xs font-medium text-gray-200">Javier Delgado</div>
                      <div className="text-[10px] text-gray-500">Ex-Revolut VP, Angel</div>
                    </div>
                  </div>
                  <div className="text-[10px] text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded border border-green-500/20">98% Match</div>
                </div>
                <div className="flex items-center justify-between px-2 py-2 hover:bg-white/5 rounded cursor-pointer group/item">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-semibold">VC</div>
                    <div className="text-left">
                      <div className="text-xs font-medium text-gray-200">K-Fund</div>
                      <div className="text-[10px] text-gray-500">Early Stage VC, Madrid</div>
                    </div>
                  </div>
                  <div className="text-[10px] text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded border border-green-500/20">94% Match</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Social Proof */}
      <section className="border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <p className="text-center text-xs font-medium text-gray-500 mb-8 uppercase tracking-widest">Trusted by founders across Europe</p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 opacity-40 grayscale mix-blend-screen select-none">
            {/* Simple text logos for demo purposes */}
            <span className="text-lg font-semibold tracking-tighter">Acme<span className="font-light">Corp</span></span>
            <span className="text-lg font-bold tracking-tighter italic">Stark<span className="not-italic font-normal">Industries</span></span>
            <span className="text-lg font-medium tracking-tight">Wayne<span className="font-light">Enterprises</span></span>
            <span className="text-lg font-semibold tracking-tighter">Cyber<span className="text-indigo-400">dyne</span></span>
            <span className="text-lg font-bold tracking-tight font-mono">Massive</span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 md:text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-medium text-white tracking-tight mb-4">Intelligence at scale.</h2>
            <p className="text-gray-400 font-light">Stop manually searching LinkedIn. Our AI digests millions of data points to find the investors actually interested in your vertical.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="glass-panel p-6 rounded-xl relative overflow-hidden group hover:border-white/10 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-gray-900 border border-white/10 flex items-center justify-center mb-6 text-indigo-400 group-hover:text-indigo-300 transition-colors">
                <Database className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-medium text-gray-100 mb-2 tracking-tight">500k+ Investor Profiles</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Comprehensive database of Angels, VCs, and Family Offices. We track investment history, ticket sizes, and thesis shifts in real-time.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-panel p-6 rounded-xl relative overflow-hidden group hover:border-white/10 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[50px] rounded-full pointer-events-none"></div>
              <div className="w-10 h-10 rounded-lg bg-gray-900 border border-white/10 flex items-center justify-center mb-6 text-indigo-400 group-hover:text-indigo-300 transition-colors">
                <BrainCircuit className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-medium text-gray-100 mb-2 tracking-tight">Semantic Matching</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Don't rely on keywords. Type "Find me investors who like SaaS marketplaces in the Nordics" and let our LLM do the heavy lifting.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-panel p-6 rounded-xl relative overflow-hidden group hover:border-white/10 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-gray-900 border border-white/10 flex items-center justify-center mb-6 text-indigo-400 group-hover:text-indigo-300 transition-colors">
                <ShieldCheck className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-medium text-gray-100 mb-2 tracking-tight">GDPR Compliant</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Built in Europe, for Europe. Your data is secure, and our investor contact methods strictly adhere to privacy regulations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Workflow / UI Showcase */}
      <section className="py-24 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-medium text-white tracking-tight">From Query to Connection.</h2>
              <p className="text-gray-400 font-light leading-relaxed">
                FundLab isn't just a database; it's an active agent. It expands your search terms, vets the results against your startup's stage, and drafts personalized outreach.
              </p>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Check className="text-indigo-500 mt-1 w-4 h-4" strokeWidth={2} />
                <div>
                  <span className="block text-sm font-medium text-gray-200">Smart Term Expansion</span>
                  <span className="block text-xs text-gray-500 mt-1">Converts "Fintech" to "Payments," "Neobank," "DeFi," "Insurtech."</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Check className="text-indigo-500 mt-1 w-4 h-4" strokeWidth={2} />
                <div>
                  <span className="block text-sm font-medium text-gray-200">Warm Intro Pathing</span>
                  <span className="block text-xs text-gray-500 mt-1">Identifies mutual connections to turn cold calls into warm intros.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Check className="text-indigo-500 mt-1 w-4 h-4" strokeWidth={2} />
                <div>
                  <span className="block text-sm font-medium text-gray-200">Secure Data Room</span>
                  <span className="block text-xs text-gray-500 mt-1">Share decks securely with tracked links.</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="flex-1 w-full">
            {/* Dashboard UI */}
            <div className="relative w-full aspect-square md:aspect-[4/3] bg-gray-900 rounded-xl border border-white/10 overflow-hidden shadow-2xl">
              {/* Sidebar */}
              <div className="absolute left-0 top-0 bottom-0 w-16 border-r border-white/5 bg-black/50 flex flex-col items-center py-6 gap-6">
                <div className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center text-white"><LayoutGrid className="w-4 h-4" /></div>
                <Users className="text-gray-500 w-5 h-5" />
                <MessageSquare className="text-gray-500 w-5 h-5" />
                <Settings className="text-gray-500 mt-auto w-5 h-5" />
              </div>

              {/* Main Content */}
              <div className="absolute left-16 right-0 top-0 bottom-0 bg-gray-900/50 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-medium text-white">Matches for "SaaS in Berlin"</h3>
                  <div className="flex gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500/20 border border-red-500/50"></span>
                    <span className="w-2 h-2 rounded-full bg-yellow-500/20 border border-yellow-500/50"></span>
                    <span className="w-2 h-2 rounded-full bg-green-500/20 border border-green-500/50"></span>
                  </div>
                </div>

                {/* Card List */}
                <div className="space-y-3">
                  {/* Item 1 */}
                  <div className="bg-black/40 border border-white/5 rounded p-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-[10px] text-gray-400 border border-white/5">AB</div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-200 font-medium">Anna Braun</span>
                        <span className="text-[10px] text-indigo-400">Very High Interest</span>
                      </div>
                      <div className="text-[10px] text-gray-600 mt-0.5">Angel • Berlin • Ticket €25k-50k</div>
                    </div>
                    <button className="text-gray-400 hover:text-white"><Plus className="w-3.5 h-3.5" /></button>
                  </div>

                  {/* Item 2 */}
                  <div className="bg-black/40 border border-white/5 rounded p-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-[10px] text-gray-400 border border-white/5">PV</div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-200 font-medium">Point Nine</span>
                        <span className="text-[10px] text-indigo-400">High Interest</span>
                      </div>
                      <div className="text-[10px] text-gray-600 mt-0.5">VC • Early Stage • SaaS Focus</div>
                    </div>
                    <button className="text-gray-400 hover:text-white"><Plus className="w-3.5 h-3.5" /></button>
                  </div>

                  {/* Item 3 */}
                  <div className="bg-black/40 border border-white/5 rounded p-3 flex items-center gap-3 opacity-60">
                    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-[10px] text-gray-400 border border-white/5">CV</div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-200 font-medium">Cherry Ventures</span>
                        <span className="text-[10px] text-gray-500">Moderate Interest</span>
                      </div>
                      <div className="text-[10px] text-gray-600 mt-0.5">VC • Seed • Berlin</div>
                    </div>
                    <button className="text-gray-400 hover:text-white"><Plus className="w-3.5 h-3.5" /></button>
                  </div>
                </div>

                {/* AI Insight */}
                <div className="mt-4 p-3 rounded bg-indigo-500/10 border border-indigo-500/20 flex gap-2">
                  <Sparkles className="text-indigo-400 shrink-0 w-3.5 h-3.5 mt-0.5" />
                  <p className="text-[10px] text-indigo-200 leading-tight">
                    <span className="font-semibold">AI Insight:</span> Point Nine recently led a round in a similar vertical. Suggested outreach angle: Product-Led Growth metrics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/20 to-transparent pointer-events-none"></div>
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-medium text-white tracking-tight mb-6">Ready to close your round?</h2>
          <p className="text-gray-400 mb-8 font-light">Join thousands of European founders using AI to fundraise smarter, not harder.</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <input type="email" placeholder="Enter your email" className="w-full sm:w-64 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all" />
            <Link href="/chat" className="w-full sm:w-auto bg-white text-black px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center">
              Start Free Trial
            </Link>
          </div>
          <p className="text-[10px] text-gray-600 mt-4">14-day free trial. No credit card required. GDPR Compliant.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black pt-12 pb-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 rounded bg-indigo-600 flex items-center justify-center text-white text-[10px]">
                <Sparkles className="w-2.5 h-2.5" />
              </div>
              <span className="text-white font-medium tracking-tight text-sm">FundLab</span>
            </div>
            <p className="text-xs text-gray-500">© 2023 FundLab AI. Madrid, Spain.</p>
          </div>

          <div className="flex gap-8 text-xs text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
