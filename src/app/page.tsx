import { HeroSection } from "@/components/landing/HeroSection";
import { ProgramShowcase } from "@/components/landing/ProgramShowcase";
import { AdmissionTimeline } from "@/components/landing/AdmissionTimeline";
import { FaqSection } from "@/components/landing/FaqSection";
import { CtaBanner } from "@/components/landing/CtaBanner";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <ProgramShowcase />
      <AdmissionTimeline />
      <FaqSection />
      <CtaBanner />
    </div>
  );
}
