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

      {/* Intelligence at Scale - Futuristic Redesign */}
      <section id="features" className="py-40 px-6 relative overflow-hidden">
        {/* Ambient Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-black to-black"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-24"
          >
            <h2 className="text-5xl md:text-7xl font-bold font-heading text-white tracking-tight mb-6 leading-[1.1]">
              Intelligence at Scale.
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed">
              Stop manually searching LinkedIn. Our AI digests millions of data points to find the investors actually interested in your vertical.
            </p>
          </motion.div>

          {/* Feature Cards - Minimalist Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Card 1: 500k+ Profiles */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.07] to-white/[0.02] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-black/40 backdrop-blur-sm border border-white/[0.08] rounded-2xl p-8 hover:border-white/[0.15] transition-all duration-500">

                {/* Icon Container */}
                <div className="mb-8">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center group-hover:scale-110 group-hover:border-indigo-400/50 transition-all duration-500">
                    <Database className="w-6 h-6 text-indigo-400" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold font-heading text-white mb-3 tracking-tight">
                  500k+ Profiles
                </h3>
                <p className="text-gray-400 leading-relaxed text-[15px]">
                  Access the world's most comprehensive database of Angels, VCs, and Family Offices.
                </p>

                {/* Subtle Hover Indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </motion.div>

            {/* Card 2: Semantic Matching */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.07] to-white/[0.02] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-black/40 backdrop-blur-sm border border-white/[0.08] rounded-2xl p-8 hover:border-white/[0.15] transition-all duration-500">

                {/* Icon Container */}
                <div className="mb-8">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center group-hover:scale-110 group-hover:border-indigo-400/50 transition-all duration-500">
                    <BrainCircuit className="w-6 h-6 text-indigo-400" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold font-heading text-white mb-3 tracking-tight">
                  Semantic Matching
                </h3>
                <p className="text-gray-400 leading-relaxed text-[15px]">
                  Don't rely on keywords. Describe your startup in plain English and let AI find the perfect thesis match.
                </p>

                {/* Subtle Hover Indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </motion.div>

            {/* Card 3: Privacy First */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.07] to-white/[0.02] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-black/40 backdrop-blur-sm border border-white/[0.08] rounded-2xl p-8 hover:border-white/[0.15] transition-all duration-500">

                {/* Icon Container */}
                <div className="mb-8">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center group-hover:scale-110 group-hover:border-indigo-400/50 transition-all duration-500">
                    <ShieldCheck className="w-6 h-6 text-indigo-400" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold font-heading text-white mb-3 tracking-tight">
                  Privacy First
                </h3>
                <p className="text-gray-400 leading-relaxed text-[15px]">
                  GDPR compliant. Your data is secure, and we never resell your contact info.
                </p>

                {/* Subtle Hover Indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* How It Works - Futuristic Minimalist */}
      <section className="py-40 px-6 relative overflow-hidden border-t border-white/[0.05]">
        {/* Subtle Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-indigo-950/5 to-black"></div>

        <div className="max-w-7xl mx-auto relative z-10">

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-32"
          >
            <h2 className="text-5xl md:text-7xl font-bold font-heading text-white tracking-tight mb-6 leading-[1.1]">
              How It Works.
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed">
              From AI-powered matching to hyper-personalized outreach—automate your entire fundraising pipeline.
            </p>
          </motion.div>

          {/* Process Steps - Horizontal Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">

            {/* Step 1: Match */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="relative group"
            >
              {/* Step Number */}
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-bold text-sm group-hover:bg-indigo-500/20 group-hover:border-indigo-400/50 transition-all duration-500">
                  01
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold font-heading text-white mb-3 tracking-tight">
                AI Matching
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                Describe your startup. Our AI analyzes 500k+ profiles to find investors with matching thesis and portfolio.
              </p>

              {/* Connection Line (hidden on mobile) */}
              <div className="hidden md:block absolute top-5 left-full w-full h-[1px] bg-gradient-to-r from-indigo-500/30 to-transparent"></div>
            </motion.div>

            {/* Step 2: Draft */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative group"
            >
              {/* Step Number */}
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-bold text-sm group-hover:bg-indigo-500/20 group-hover:border-indigo-400/50 transition-all duration-500">
                  02
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold font-heading text-white mb-3 tracking-tight">
                Draft Messages
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                Generate hyper-personalized LinkedIn and email messages tailored to each investor's history and interests.
              </p>

              {/* Connection Line */}
              <div className="hidden md:block absolute top-5 left-full w-full h-[1px] bg-gradient-to-r from-indigo-500/30 to-transparent"></div>
            </motion.div>

            {/* Step 3: Send */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="relative group"
            >
              {/* Step Number */}
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-bold text-sm group-hover:bg-indigo-500/20 group-hover:border-indigo-400/50 transition-all duration-500">
                  03
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold font-heading text-white mb-3 tracking-tight">
                Automate Outreach
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                Send 1,000+ messages per week. Track opens, responses, and schedule automated follow-ups.
              </p>

              {/* Connection Line */}
              <div className="hidden md:block absolute top-5 left-full w-full h-[1px] bg-gradient-to-r from-indigo-500/30 to-transparent"></div>
            </motion.div>

            {/* Step 4: Close */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="relative group"
            >
              {/* Step Number */}
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-bold text-sm group-hover:bg-indigo-500/20 group-hover:border-indigo-400/50 transition-all duration-500">
                  04
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold font-heading text-white mb-3 tracking-tight">
                Track & Close
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                Monitor your pipeline in real-time. See response rates, schedule meetings, and close your round faster.
              </p>
            </motion.div>

          </div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
          >
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold font-heading text-white mb-2">500k+</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">Investor Profiles</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold font-heading text-white mb-2">1,000+</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">Messages/Week</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold font-heading text-white mb-2">3x</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">Faster Fundraising</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold font-heading text-white mb-2">25%</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">Response Rate</div>
            </div>
          </motion.div>

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
