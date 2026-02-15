import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import EverythingYouNeed from '@/components/sections/EverythingYouNeed';
import WhyDifferent from '@/components/sections/WhyDifferent';
import ExchangeIncidents from '@/components/sections/ExchangeIncidents';
import TrustSection from '@/components/sections/TrustSection';
import HowToUse from '@/components/sections/HowToUse';
import FAQ from '@/components/sections/FAQ';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-background">
      <Navbar />
      <Hero />
      <EverythingYouNeed />
      <WhyDifferent />
      <ExchangeIncidents />
      <TrustSection />
      <HowToUse />
      <FAQ />
      <Footer />
    </main>
  );
}
