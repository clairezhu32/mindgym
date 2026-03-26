import { Header, VideoSection } from "@/components/landing/ClientSections";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorks from "@/components/landing/HowItWorks";
import RoadmapPreview from "@/components/landing/RoadmapPreview";
import PricingSection from "@/components/landing/PricingSection";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <HowItWorks />
        <VideoSection />
        <RoadmapPreview />
        <PricingSection />
        <footer className="py-10 px-6 border-t border-[#164d4b] text-center text-[#c8e8e7] text-sm bg-[#1d5c5a]">
          <p>© 2026 MindGym · Backed by certified sports psychologists</p>
        </footer>
      </main>
    </>
  );
}
