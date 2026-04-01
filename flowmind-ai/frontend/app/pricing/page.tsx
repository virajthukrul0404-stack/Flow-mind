import { CtaBanner } from "@/components/marketing/cta-banner";
import { PricingSection } from "@/components/marketing/pricing";
import { FaqSection } from "@/components/marketing/faq";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";

export default function PricingPage() {
  return (
    <div>
      <SiteHeader />
      <main className="pt-10">
        <PricingSection />
        <FaqSection />
        <CtaBanner />
      </main>
      <SiteFooter />
    </div>
  );
}
