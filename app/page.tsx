import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import FeatureHighlights from '@/components/sections/FeatureHighlights';
import HowToUse from '@/components/sections/HowToUse';
import DetailedFeatures from '@/components/sections/DetailedFeatures';
import FAQ from '@/components/sections/FAQ';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-white">
      <Navbar />
      <Hero />
      <FeatureHighlights />
      <HowToUse />
      <DetailedFeatures />
      <FAQ />
      <Footer />
    </main>
  );
}
