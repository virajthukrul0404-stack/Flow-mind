export type PaymentPlan = "PRO" | "TEAM";
export type BillingCycle = "monthly" | "annual";
export type PaymentProvider = "stripe" | "razorpay";

export const PLAN_CATALOG: Record<
  PaymentPlan,
  {
    name: string;
    description: string;
    monthly: { usd: number; inr: number };
    annual: { usd: number; inr: number };
  }
> = {
  PRO: {
    name: "Pro",
    description: "Unlimited tasks, GPT-4o chat, calendar sync, and daily briefings.",
    monthly: { usd: 12, inr: 999 },
    annual: { usd: 10, inr: 799 }
  },
  TEAM: {
    name: "Team",
    description: "Shared dashboards, analytics, admin controls, and team planning workflows.",
    monthly: { usd: 39, inr: 3299 },
    annual: { usd: 31, inr: 2599 }
  }
};

export function getPlanAmount(plan: PaymentPlan, billing: BillingCycle, currency: "USD" | "INR") {
  const planData = PLAN_CATALOG[plan];
  if (!planData) {
    return null;
  }

  return currency === "USD" ? planData[billing].usd : planData[billing].inr;
}
