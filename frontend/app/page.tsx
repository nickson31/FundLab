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

      {/* Social Proof - Premium */}
      <section className="py-24 px-6 relative overflow-hidden border-y border-white/[0.05]">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/10 via-transparent to-transparent"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm font-medium text-gray-500 uppercase tracking-[0.25em] mb-2">
              Trusted by 500+ Founders Worldwide
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-20">
            {[
              { value: "€50M+", label: "Capital Raised", sublabel: "by our users" },
              { value: "500+", label: "Active Founders", sublabel: "on the platform" },
              { value: "25%", label: "Response Rate", sublabel: "avg. from investors" },
              { value: "3x", label: "Faster", sublabel: "than manual outreach" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center group"
              >
                <div className="text-4xl md:text-5xl font-bold font-heading text-white mb-2 group-hover:text-indigo-400 transition-colors duration-500">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-400">{stat.label}</div>
                <div className="text-xs text-gray-600">{stat.sublabel}</div>
              </motion.div>
            ))}
          </div>

          {/* Company Logos */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6"
          >
            <p className="text-xs text-gray-600 uppercase tracking-widest mr-4">Alumni from</p>
            {["Y Combinator", "Techstars", "500 Startups", "Seedcamp", "Antler"].map((company, i) => (
              <span
                key={i}
                className="text-lg font-bold font-heading text-gray-500 hover:text-white transition-colors duration-300 cursor-default"
              >
                {company}
              </span>
            ))}
          </motion.div>
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

      {/* Use Cases Section */}
      <section className="py-40 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-indigo-950/5 to-black"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-bold font-heading text-white tracking-tight mb-6">
              Built for Every Stage.
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Whether you're raising your first check or closing a Series A, FundLab adapts to your needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                stage: "Pre-Seed",
                amount: "€50k - €500k",
                title: "Find Your First Angels",
                description: "Access 50,000+ angel investors actively looking for early-stage deals. Perfect for first-time founders.",
                features: ["Angel investor database", "Warm intro suggestions", "Pitch deck review AI"],
                gradient: "from-emerald-500/20 to-teal-500/20",
                border: "border-emerald-500/30",
                accent: "text-emerald-400"
              },
              {
                stage: "Seed",
                amount: "€500k - €3M",
                title: "Connect with Early VCs",
                description: "Match with seed-stage VCs who've invested in your vertical. Get personalized outreach that converts.",
                features: ["VC fund matching", "LP network access", "Due diligence prep"],
                gradient: "from-indigo-500/20 to-purple-500/20",
                border: "border-indigo-500/30",
                accent: "text-indigo-400"
              },
              {
                stage: "Series A+",
                amount: "€3M+",
                title: "Scale Your Round",
                description: "Reach institutional investors and growth funds. Manage complex cap tables and syndicate deals.",
                features: ["Institutional access", "Syndicate builder", "Term sheet analyzer"],
                gradient: "from-orange-500/20 to-rose-500/20",
                border: "border-orange-500/30",
                accent: "text-orange-400"
              }
            ].map((useCase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-b ${useCase.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <div className={`relative bg-black/60 backdrop-blur-sm border ${useCase.border} rounded-3xl p-8 hover:border-white/20 transition-all duration-500 h-full`}>

                  <div className="flex items-center justify-between mb-6">
                    <span className={`text-xs font-bold uppercase tracking-wider ${useCase.accent}`}>{useCase.stage}</span>
                    <span className="text-xs text-gray-500">{useCase.amount}</span>
                  </div>

                  <h3 className="text-2xl font-bold font-heading text-white mb-3">{useCase.title}</h3>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">{useCase.description}</p>

                  <ul className="space-y-2">
                    {useCase.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-gray-500">
                        <Check className="w-4 h-4 text-gray-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-40 px-6 relative overflow-hidden border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-bold font-heading text-white tracking-tight mb-6">
              Founders Love Us.
            </h2>
            <p className="text-xl text-gray-400">
              Join hundreds of founders who've closed their rounds with FundLab.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "FundLab helped us find 47 perfectly matched angels in under an hour. We closed our pre-seed in 3 weeks instead of 3 months.",
                name: "Sarah Chen",
                role: "CEO, Finova",
                raised: "€650k Pre-Seed"
              },
              {
                quote: "The AI-generated messages had a 35% response rate. That's unheard of for cold outreach. Game changer for our seed round.",
                name: "Marcus Rodriguez",
                role: "Founder, DataStack",
                raised: "€2.1M Seed"
              },
              {
                quote: "I was spending 20 hours a week on investor research. Now it's 2 hours. FundLab is like having a full-time fundraising associate.",
                name: "Elena Kowalski",
                role: "Co-founder, HealthTech AI",
                raised: "€1.5M Seed"
              }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group"
              >
                <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 hover:border-white/[0.15] transition-all duration-500 h-full flex flex-col">
                  <div className="flex gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Sparkles key={star} className="w-4 h-4 text-yellow-500" />
                    ))}
                  </div>

                  <p className="text-white/80 leading-relaxed mb-8 flex-grow italic">
                    "{testimonial.quote}"
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-bold text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                      <div className="text-xs text-indigo-400 font-medium">{testimonial.raised}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-40 px-6 relative overflow-hidden border-t border-white/[0.05]">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-bold font-heading text-white tracking-tight mb-6">
              Questions?
            </h2>
            <p className="text-xl text-gray-400">
              Everything you need to know about FundLab.
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                q: "How does the AI matching work?",
                a: "Our AI analyzes your startup description, industry, stage, and location against 500,000+ investor profiles. We use semantic matching to find investors whose thesis and portfolio align with your company—not just keyword matching."
              },
              {
                q: "Is my data secure?",
                a: "Absolutely. We're GDPR compliant and SOC 2 certified. Your data is encrypted at rest and in transit. We never sell your information or share it with third parties."
              },
              {
                q: "How much does FundLab cost?",
                a: "We offer a free tier with 10 investor matches per month. Pro plans start at €49/month for unlimited matches, personalized outreach, and analytics. Enterprise plans are custom-priced."
              },
              {
                q: "Can I export my investor list?",
                a: "Yes! Export your matched investors, messages, and analytics to CSV, Excel, or directly to your CRM. Pro and Enterprise users get unlimited exports."
              },
              {
                q: "What types of investors are in your database?",
                a: "We have 300,000+ angel investors, 150,000+ VC professionals, and 50,000+ family office contacts. Our data is refreshed weekly from LinkedIn, Crunchbase, and proprietary sources."
              }
            ].map((faq, i) => (
              <motion.details
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group bg-white/[0.02] border border-white/[0.08] rounded-2xl overflow-hidden hover:border-white/[0.12] transition-colors"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="font-bold text-white pr-8">{faq.q}</span>
                  <Plus className="w-5 h-5 text-gray-500 group-open:rotate-45 transition-transform duration-300" />
                </summary>
                <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                  {faq.a}
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-40 px-6 relative overflow-hidden border-t border-white/[0.05]">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/10 via-transparent to-transparent"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-bold font-heading text-white tracking-tight mb-6">
              Simple Pricing.
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Start free. Upgrade when you're ready to scale your fundraise.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Free",
                price: "€0",
                period: "forever",
                description: "Perfect for exploring the platform",
                features: ["10 investor matches/month", "Basic AI search", "5 message drafts", "Email support"],
                cta: "Get Started",
                popular: false
              },
              {
                name: "Pro",
                price: "€49",
                period: "/month",
                description: "For serious fundraisers",
                features: ["Unlimited matches", "Advanced AI matching", "Unlimited messages", "CRM export", "Response tracking", "Priority support"],
                cta: "Start Pro Trial",
                popular: true
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "",
                description: "For teams and accelerators",
                features: ["Everything in Pro", "Team collaboration", "Custom integrations", "Dedicated success manager", "SLA guarantee", "White-label options"],
                cta: "Contact Sales",
                popular: false
              }
            ].map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider rounded-full">
                    Most Popular
                  </div>
                )}
                <div className={`h-full bg-black/60 backdrop-blur-sm border rounded-3xl p-8 ${plan.popular ? 'border-indigo-500/50 ring-1 ring-indigo-500/20' : 'border-white/[0.08]'}`}>
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold font-heading text-white">{plan.price}</span>
                      <span className="text-gray-500">{plan.period}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">{plan.description}</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm text-gray-400">
                        <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full rounded-full font-bold ${plan.popular ? 'bg-white text-black hover:bg-gray-100' : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'}`}
                    asChild
                  >
                    <Link href="/chat">{plan.cta}</Link>
                  </Button>
                </div>
              </motion.div>
            ))}
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
