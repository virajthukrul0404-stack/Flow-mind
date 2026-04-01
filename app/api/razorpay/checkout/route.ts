import { NextResponse } from "next/server";

import { getPlanAmount, PLAN_CATALOG, type BillingCycle, type PaymentPlan } from "@/lib/payments";
import { razorpay } from "@/lib/razorpay";
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
      contact?: string;
    };
  };

  const plan = body.plan || "PRO";
  const billing = body.billing || "monthly";
  const amountInInr = getPlanAmount(plan, billing, "INR");
  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID;

  if (!amountInInr) {
    return NextResponse.json({ error: "Unknown plan" }, { status: 400 });
  }

  if (!razorpay || !keyId) {
    return NextResponse.json({
      demo: true,
      provider: "razorpay",
      message: "Razorpay keys are missing, so this is a demo checkout response.",
      checkout: {
        key: "rzp_test_demo",
        amount: amountInInr * 100,
        currency: "INR",
        name: "FlowMind AI",
        description: `${PLAN_CATALOG[plan].name} ${billing} plan`,
        order_id: `demo_order_${plan.toLowerCase()}_${billing}`,
        prefill: body.customer || {}
      }
    });
  }

  const order = await razorpay.orders.create({
    amount: amountInInr * 100,
    currency: "INR",
    receipt: `flowmind_${plan.toLowerCase()}_${Date.now()}`,
    notes: {
      provider: "razorpay",
      plan,
      billing,
      customerEmail: body.customer?.email || "",
      customerName: body.customer?.name || ""
    }
  });

  return NextResponse.json({
    provider: "razorpay",
    checkout: {
      key: keyId,
      amount: order.amount,
      currency: order.currency,
      name: "FlowMind AI",
      description: `${PLAN_CATALOG[plan].name} ${billing} plan`,
      order_id: order.id,
      prefill: {
        name: body.customer?.name,
        email: body.customer?.email,
        contact: body.customer?.contact
      },
      notes: {
        plan,
        billing
      }
    }
  });
}
