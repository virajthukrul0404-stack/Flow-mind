import { CtaBanner } from "@/components/marketing/cta-banner";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { HowItWorksSection } from "@/components/marketing/how-it-works";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";
import { SectionHeading } from "@/components/shared/section-heading";

export default function FeaturesPage() {
  return (
    <div>
      <SiteHeader />
      <main className="pt-16">
        <section className="container-shell py-12">
          <SectionHeading
            align="left"
            description="Capture, prioritize, schedule, and review your work in one AI-native workspace."
            eyebrow="Features"
            title="Everything FlowMind does to move your day forward"
          />
        </section>
        <FeatureGrid />
        <HowItWorksSection />
        <CtaBanner />
      </main>
      <SiteFooter />
    </div>
  );
}
