import { CtaBanner } from "@/components/marketing/cta-banner";
import { FaqSection } from "@/components/marketing/faq";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { HeroSection } from "@/components/marketing/hero";
import { HowItWorksSection } from "@/components/marketing/how-it-works";
import { PricingSection } from "@/components/marketing/pricing";
import { TestimonialsSection } from "@/components/marketing/testimonials";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";

export default function HomePage() {
  return (
    <div className="relative">
      <SiteHeader />
      <main>
        <HeroSection />
        <FeatureGrid />
        <HowItWorksSection />
        <TestimonialsSection />
        <PricingSection />
        <FaqSection />
        <CtaBanner />
      </main>
      <SiteFooter />
    </div>
  );
}
