'use client';

import React from 'react';
import Navbar from '@/components/wow/Navbar';
import Hero from '@/components/wow/Hero';
// import SocialProof from '@/components/wow/SocialProof';
import IntelligenceSection from '@/components/wow/IntelligenceSection';
// import HowItWorks from '@/components/wow/HowItWorks';
import UseCases from '@/components/wow/UseCases';
// import Testimonials from '@/components/wow/Testimonials';
// import FAQ from '@/components/wow/FAQ';
// import Pricing from '@/components/wow/Pricing';
// import CTA from '@/components/wow/CTA';
import Footer from '@/components/wow/Footer';

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden text-blue-600 font-body selection:bg-indigo-500/30 selection:text-indigo-200">

      <Navbar />

      <main className="relative">
        <Hero />
        {/* <SocialProof /> */}
        <IntelligenceSection />
        {/* <HowItWorks /> */}
        <UseCases />
        {/* <Testimonials /> */}
        {/* <FAQ /> */}
        {/* <Pricing /> */}
      </main>

      {/* <CTA /> */}
      <Footer />
    </div>
  );
}
