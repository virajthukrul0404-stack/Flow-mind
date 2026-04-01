import { NextResponse } from "next/server";

import { type BillingCycle, type PaymentPlan } from "@/lib/payments";
import { stripe, PLANS } from "@/lib/stripe";
import { getStripeCheckoutMetadata } from "@/lib/stripe";
import { featureFlags } from "@/lib/utils";

export async function POST(request: Request) {
  if (!featureFlags.payments) {
    return NextResponse.json(
      {
        error: "Payments are coming soon. Add your production payment keys and set NEXT_PUBLIC_ENABLE_PAYMENTS=true to enable checkout."
      },
      { status: 503 }
    );
  }

  const body = (await request.json().catch(() => ({}))) as {
    plan?: PaymentPlan;
    billing?: BillingCycle;
    customer?: {
      name?: string;
      email?: string;
    };
  };

  if (!stripe) {
    return NextResponse.json({
      checkoutUrl: "https://dashboard.stripe.com/test/payments",
      message: "Stripe keys are missing, so this is a demo checkout response."
    });
  }

  const plan = body.plan || "PRO";
  const billing = body.billing || "monthly";
  const price = PLANS[plan]?.[billing];

  if (!price) {
    return NextResponse.json({ error: "Unknown plan" }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price, quantity: 1 }],
    customer_email: body.customer?.email,
    metadata: getStripeCheckoutMetadata(plan, billing),
    success_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard/settings`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/pricing`
  });

  return NextResponse.json({ checkoutUrl: session.url });
}
