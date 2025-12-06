import Hero from '@/components/wow/Hero';
import ProblemSection from '@/components/wow/ProblemSection';
import SolutionSection from '@/components/wow/SolutionSection';
import FeatureGrid from '@/components/wow/FeatureGrid';
import SocialProof from '@/components/wow/SocialProof';
import CTA from '@/components/wow/CTA';
import Footer from '@/components/wow/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <FeatureGrid />
      <SocialProof />
      <CTA />
      <Footer />
    </main>
  );
}
