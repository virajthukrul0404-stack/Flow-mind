import { PLAN_CATALOG, type BillingCycle, type PaymentPlan } from "@/lib/payments";
import Stripe from "stripe";

export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-02-24.acacia"
    })
  : null;

export const PLANS = {
  PRO: {
    monthly: "price_pro_monthly_id",
    annual: "price_pro_annual_id"
  },
  TEAM: {
    monthly: "price_team_monthly_id",
    annual: "price_team_annual_id"
  }
} as const;

export function getStripeCheckoutMetadata(plan: PaymentPlan, billing: BillingCycle) {
  const planData = PLAN_CATALOG[plan];

  return {
    plan,
    billing,
    displayName: `${planData.name} ${billing === "annual" ? "Annual" : "Monthly"}`,
    unitAmountUsd: String(planData[billing].usd)
  };
}
