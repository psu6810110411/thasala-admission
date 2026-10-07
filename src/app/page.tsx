import { HeroSection } from "@/components/landing/HeroSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { CtaBanner } from "@/components/landing/CtaBanner";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FaqSection />
      <CtaBanner />
    </div>
  );
}
