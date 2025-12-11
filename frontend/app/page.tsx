import Link from 'next/link';
import { ArrowRight, Search, Zap, Globe, ShieldCheck, BarChart3, Users, Building2, BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/wow/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-lg from-indigo-500/20 via-purple-500/20 to-transparent blur-3xl rounded-full opacity-50 -z-10 animate-pulse" />

        <div className="container mx-auto px-4 text-center z-10 relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-md border border-indigo-100 shadow-sm mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-indigo-900 tracking-wide uppercase">AI Engine v2.0 Live</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-indigo-950 mb-6 max-w-4xl mx-auto leading-[1.1]">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">Operating System</span> for Modern Fundraising
          </h1>

          <p className="text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            FundLab replaces weeks of manual research with milliseconds of AI precision.
            Access detailed intelligence on 50,000+ Angels and VCs globally.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/chat">
              <Button size="lg" className="h-14 px-8 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold shadow-xl shadow-indigo-600/20 transition-all hover:scale-105 group">
                Start Free Search
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline" className="h-14 px-8 rounded-full border-2 border-indigo-100 text-indigo-700 hover:bg-indigo-50 text-lg font-semibold transition-all">
                View Live Demo
              </Button>
            </Link>
          </div>

          {/* Social Proof Strip */}
          <div className="mt-16 pt-8 border-t border-indigo-50/50 flex flex-col items-center">
            <p className="text-xs font-bold text-indigo-300 uppercase tracking-widest mb-6">Trusted by Founders from</p>
            <div className="flex gap-8 lg:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
              {['Y Combinator', 'Techstars', 'Antler', 'Sequoia', 'a16z'].map((name) => (
                <span key={name} className="text-lg font-bold font-serif text-indigo-900">{name}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid / Value Prop */}
      <section className="py-24 bg-indigo-50/30 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-indigo-950 mb-4">Intelligence, not just Data.</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
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

      {/* Deep Dive / SEO Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl transform rotate-2"></div>
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
              alt="Data Dashboard"
              className="relative rounded-xl shadow-2xl border border-white/20"
            />
          </div>
          <div>
            <div className="inline-block p-2 bg-indigo-100 rounded-lg mb-4">
              <BarChart3 className="w-6 h-6 text-indigo-600" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-indigo-950 mb-6">Stop guessing. Start closing.</h2>
            <div className="space-y-6 text-lg text-slate-600">
              <p>
                Fundraising is a sales funnel. The quality of your leads determines your conversion rate.
              </p>
              <p>
                Most founders waste months pitching investors who never invest in their sector. FundLab's <strong>Content Scoring Engine</strong> analyzes millions of data points—from ticket sizes to board seat requirements—to ensure you only pitch high-probability targets.
              </p>
              <ul className="space-y-3 mt-4">
                <li className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  <span>Verified email addresses</span>
                </li>
                <li className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  <span>Thesis-aligned matching</span>
                </li>
                <li className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  <span>Warm intro pathfinding</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-indigo-950 rounded-3xl p-12 lg:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-800/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>

            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 relative z-10">Ready to fund your vision?</h2>
            <p className="text-indigo-200 text-lg max-w-xl mx-auto mb-10 relative z-10">
              Join 2,000+ founders using FundLab to close their rounds faster. No credit card required for search.
            </p>
            <Link href="/chat">
              <Button size="lg" className="h-16 px-10 rounded-full bg-white text-indigo-950 hover:bg-slate-100 text-lg font-bold shadow-2xl relative z-10 transition-transform hover:scale-105">
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
    <div className="group p-8 bg-white rounded-2xl border border-indigo-50 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300">
      <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-6 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold text-indigo-950 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{desc}</p>
    </div>
  );
}
