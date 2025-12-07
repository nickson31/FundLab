'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
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
  Plus,
  Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="min-h-screen relative overflow-hidden text-gray-400 font-body selection:bg-indigo-500/30 selection:text-indigo-200">

      {/* Navigation */}
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

      {/* Hero Section */}
      <main className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <motion.div
          style={{ y: y1, opacity }}
          className="absolute top-0 inset-x-0 h-screen w-full -z-10 pointer-events-none"
        >
          <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[150px] mix-blend-screen" />
        </motion.div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-[11px] uppercase tracking-wider font-bold text-indigo-300 mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(99,102,241,0.3)]">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
              The AI Co-Pilot for Founders
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading text-white tracking-tight mb-8 leading-[1.1] drop-shadow-2xl">
              Your First Round, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-white animate-gradient-x">Faster.</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 font-medium leading-relaxed text-balance">
              FundLab is the intelligence layer for your fundraise. We use LLMs to match you with the perfect investors, turning months of research into seconds.
            </p>
          </motion.div>

          {/* Interactive Search Demo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1, delay: 0.3, type: "spring" }}
            className="max-w-3xl mx-auto perspective-1000 group relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

            <div className="relative glass-premium rounded-2xl p-2 transition-all duration-500 ring-1 ring-white/10 shadow-2xl">

              {/* Search Mockup */}
              <div className="relative bg-[#0A0A0A] rounded-xl border border-white/5 px-6 py-5 flex items-center gap-4 shadow-inner">
                <Search className="text-indigo-400 w-5 h-5" strokeWidth={2} />
                <div className="flex-1 text-left">
                  <span className="text-lg text-gray-200 font-medium font-heading">Find Pre-Seed Fintech Angels in London...</span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <ArrowRight className="text-white w-4 h-4" />
                </div>
              </div>

              {/* AI Logic Visual */}
              <div className="mt-3 px-6 py-4 bg-white/[0.02] rounded-xl border border-white/5 text-left flex gap-4 overflow-hidden">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Bot className="text-indigo-400 w-4 h-4" />
                    <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest">AI Reasoning</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Vertical: Fintech", "Stage: Pre-Seed", "Geo: London", "Cheque: £25k-£100k"].map((tag, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + (i * 0.1) }}
                        className="text-xs font-medium text-gray-300 bg-white/5 border border-white/5 px-3 py-1.5 rounded-lg"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </main>

      {/* Social Proof */}
      <section className="border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <p className="text-center text-xs font-bold text-indigo-200/50 mb-8 uppercase tracking-[0.2em]">Powering Founders At</p>
          <div className="flex flex-wrap justify-center gap-x-16 gap-y-8 opacity-50 grayscale mix-blend-screen select-none">
            {["Stripe", "Revolut", "Monzo", "Wise", "N26"].map((company, i) => (
              <span key={i} className="text-xl font-bold font-heading text-white tracking-tighter">{company}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 md:text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-white tracking-tight mb-6">Intelligence at Scale.</h2>
            <p className="text-xl text-gray-400 font-light text-balance">
              Stop manually searching LinkedIn. Our AI digests millions of data points to find the investors actually interested in your vertical.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Database, title: "500k+ Profiles", desc: "Access the world's most comprehensive database of Angels, VCs, and Family Offices." },
              { icon: BrainCircuit, title: "Semantic Matching", desc: "Don't rely on keywords. Describe your startup in plain English and let AI find the perfect thesis match." },
              { icon: ShieldCheck, title: "Privacy First", desc: "GDPR compliant. Your data is secure, and we never resell your contact info." }
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="glass-premium p-8 rounded-3xl relative overflow-hidden group"
              >
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 text-indigo-400 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold font-heading text-white mb-3">{feature.title}</h3>
                <p className="text-base text-gray-400 leading-relaxed font-body">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlights - Interactive Cards */}
      <section className="py-32 px-6 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto">

          {/* Section Header */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
              <Sparkles className="h-4 w-4 text-indigo-300" strokeWidth={2} />
              <span className="text-sm font-bold text-indigo-200/90 uppercase tracking-wider">Feature Highlights</span>
            </div>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold font-heading text-center text-white tracking-tight mb-6">
            Everything You Need to
            <span className="block mt-2">Close Your Round</span>
          </h2>
          <p className="mx-auto max-w-2xl text-center text-lg text-gray-400 font-light mb-16">
            From AI-powered matching to hyper-personalized outreach—FundLab automates your fundraising pipeline so you can focus on building relationships.
          </p>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Card 1: AI Matching */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group relative overflow-hidden rounded-3xl bg-white/[0.04] ring-1 ring-white/10 p-6"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl"></div>

              <div className="rounded-2xl bg-gradient-to-b from-white/5 to-white/[0.03] p-5 ring-1 ring-white/10 backdrop-blur mb-6">
                <div className="flex items-center gap-2 text-white/80 text-sm mb-4">
                  <BrainCircuit className="h-5 w-5 text-sky-300" strokeWidth={1.5} />
                  <span className="font-bold">AI Semantic Matching</span>
                </div>

                <div className="space-y-3">
                  <div className="rounded-xl bg-white/[0.04] p-4 ring-1 ring-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-bold text-white/90">Your Startup</p>
                      <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">Fintech SaaS</span>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed">B2B payments platform for SMEs in Europe</p>
                  </div>

                  <div className="flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-indigo-400 animate-pulse" />
                  </div>

                  <div className="rounded-xl bg-white/[0.04] p-4 ring-1 ring-white/10">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                        JD
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-white/90">Javier Delgado</p>
                        <p className="text-xs text-white/60">Ex-Revolut VP • 12 Fintech Exits</p>
                      </div>
                      <span className="text-xs font-bold text-green-400">98%</span>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold font-heading text-white tracking-tight mb-3">Intelligent Investor Matching</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Our AI analyzes 500k+ investor profiles to find perfect thesis matches. No more manual LinkedIn searches—just describe your startup and we'll find the right angels and VCs.
              </p>
            </motion.div>

            {/* Card 2: Outreach Automation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group relative overflow-hidden rounded-3xl bg-white/[0.04] ring-1 ring-white/10 p-6"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl"></div>

              <div className="rounded-2xl bg-gradient-to-b from-white/5 to-white/[0.03] p-5 ring-1 ring-white/10 backdrop-blur mb-6">
                <div className="flex items-center gap-2 text-white/80 text-sm mb-4">
                  <MessageSquare className="h-5 w-5 text-purple-300" strokeWidth={1.5} />
                  <span className="font-bold">Hyper-Personalized Outreach</span>
                </div>

                <div className="space-y-3">
                  <div className="rounded-xl bg-white/[0.04] p-4 ring-1 ring-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-purple-300">LinkedIn Message</span>
                      <span className="text-xs text-white/50">Generated in 2.3s</span>
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed italic">
                      "Hi Anna, I noticed you led the Series A for PayFlow in 2022. We're building similar infrastructure for SMEs in the Nordics..."
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-white/60">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Personalized with investor history</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/60">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Optimized for response rate</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between rounded-xl bg-indigo-500/10 border border-indigo-500/20 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-300" />
                    <span className="text-xs font-bold text-indigo-200">1,000+ messages/week</span>
                  </div>
                  <span className="text-xs text-indigo-300/70">Automated</span>
                </div>
              </div>

              <h3 className="text-2xl font-bold font-heading text-white tracking-tight mb-3">Outreach at Scale</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Draft and send 1,000+ hyper-personalized LinkedIn and email messages every week. Our AI tailors each message based on the investor's portfolio, thesis, and recent activity.
              </p>
            </motion.div>

            {/* Card 3: Real-Time Dashboard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="group relative overflow-hidden rounded-3xl bg-white/[0.04] ring-1 ring-white/10 p-6"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl"></div>

              <div className="rounded-2xl bg-gradient-to-b from-white/5 to-white/[0.03] p-5 ring-1 ring-white/10 backdrop-blur mb-6">
                <div className="flex items-center gap-2 text-white/80 text-sm mb-4">
                  <LayoutGrid className="h-5 w-5 text-emerald-300" strokeWidth={1.5} />
                  <span className="font-bold">Pipeline Dashboard</span>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-xl bg-white/[0.04] p-3 ring-1 ring-white/10 text-center">
                      <p className="text-2xl font-bold text-white">47</p>
                      <p className="text-xs text-white/60 mt-1">Contacted</p>
                    </div>
                    <div className="rounded-xl bg-white/[0.04] p-3 ring-1 ring-white/10 text-center">
                      <p className="text-2xl font-bold text-emerald-400">12</p>
                      <p className="text-xs text-white/60 mt-1">Responded</p>
                    </div>
                    <div className="rounded-xl bg-white/[0.04] p-3 ring-1 ring-white/10 text-center">
                      <p className="text-2xl font-bold text-indigo-400">3</p>
                      <p className="text-xs text-white/60 mt-1">Meetings</p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-white/[0.04] p-3 ring-1 ring-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-white/80">Response Rate</span>
                      <span className="text-xs text-emerald-400 font-bold">25.5%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500" style={{ width: '25.5%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold font-heading text-white tracking-tight mb-3">Track Every Interaction</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Monitor your entire fundraising pipeline in real-time. See who opened your messages, track response rates, and get AI insights on when to follow up.
              </p>
            </motion.div>

            {/* Card 4: Global Collaboration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="group relative overflow-hidden rounded-3xl bg-white/[0.04] ring-1 ring-white/10 p-6"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl"></div>

              <div className="rounded-2xl bg-gradient-to-b from-white/5 to-white/[0.03] p-5 ring-1 ring-white/10 backdrop-blur mb-6">
                <div className="flex items-center gap-2 text-white/80 text-sm mb-4">
                  <Users className="h-5 w-5 text-fuchsia-300" strokeWidth={1.5} />
                  <span className="font-bold">Team Workspace</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 rounded-xl bg-white/[0.04] p-3 ring-1 ring-white/10">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop" className="h-8 w-8 rounded-full ring-1 ring-white/20" alt="team" />
                    <div className="flex-1">
                      <p className="text-sm font-bold text-white/90">Sarah Chen</p>
                      <p className="text-xs text-white/60">Assigned 12 investors</p>
                    </div>
                    <Check className="w-4 h-4 text-emerald-400" />
                  </div>

                  <div className="flex items-center gap-3 rounded-xl bg-white/[0.04] p-3 ring-1 ring-white/10">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop" className="h-8 w-8 rounded-full ring-1 ring-white/20" alt="team" />
                    <div className="flex-1">
                      <p className="text-sm font-bold text-white/90">Marcus Liu</p>
                      <p className="text-xs text-white/60">Following up with VCs</p>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-white/60">
                  <ShieldCheck className="w-4 h-4 text-indigo-300" />
                  <span>Synced across your entire team</span>
                </div>
              </div>

              <h3 className="text-2xl font-bold font-heading text-white tracking-tight mb-3">Collaborate Seamlessly</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Keep your founding team aligned with shared dashboards, task assignments, and automated handoffs. Everyone sees the same pipeline in real-time.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 to-transparent pointer-events-none"></div>
        <div className="relative z-10 container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto glass-premium rounded-[3rem] p-16 border border-white/10 shadow-2xl"
          >
            <div className="inline-block p-4 rounded-full bg-indigo-500/20 mb-6">
              <Sparkles className="w-8 h-8 text-indigo-400" />
            </div>
            <h2 className="text-5xl md:text-7xl font-bold font-heading text-white tracking-tight mb-8">
              Ready to Raise?
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Join high-growth founders closing their rounds 3x faster with FundLab.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-white text-black hover:bg-gray-100 font-bold shadow-xl shadow-indigo-500/20" asChild>
                <Link href="/chat">
                  Start Free Trial
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-white/10 text-white hover:bg-white/5 font-medium" asChild>
                <Link href="#pricing">
                  View Pricing
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#030303] pt-12 pb-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center text-white text-[10px]">
              <Sparkles className="w-3 h-3" />
            </div>
            <span className="text-white font-bold tracking-tight text-sm font-heading">FundLab</span>
          </div>
          <p className="text-xs text-gray-600 font-medium">© 2024 FundLab Inc. Crafted with precision.</p>
        </div>
      </footer>

    </div>
  );
}
