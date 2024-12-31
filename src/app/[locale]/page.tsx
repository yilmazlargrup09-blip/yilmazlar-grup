
import Hero from '@/components/Hero';
import { Services } from '@/components/Services';
import { Franchises } from '@/components/Franchises';
import PartnersSection from '@/components/PartnersSection';
import { MapSection } from '@/components/MapSection';

export default function IndexPage() {
  return (
    <main className="min-h-screen bg-gray-900">
      <Hero />
      <Franchises />
      <Services />
      <MapSection />
      <PartnersSection />
    </main>
  );
}

