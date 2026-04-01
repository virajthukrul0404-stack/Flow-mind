"use client";

import { useState } from "react";
import Script from "next/script";
import { CreditCard, IndianRupee, Loader2, WalletCards } from "lucide-react";

import { PLAN_CATALOG, type BillingCycle, type PaymentPlan } from "@/lib/payments";
import { ComingSoonCard } from "@/components/shared/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { featureFlags } from "@/lib/utils";

type CheckoutProvider = "stripe" | "razorpay";

type RazorpayCheckoutOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  handler?: (response: { razorpay_payment_id: string; razorpay_order_id: string }) => void;
  modal?: {
    ondismiss?: () => void;
  };
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayCheckoutOptions) => {
      open: () => void;
    };
  }
}

export function BillingPanel() {
  const [plan, setPlan] = useState<PaymentPlan>("PRO");
  const [billing, setBilling] = useState<BillingCycle>("monthly");
  const [loadingProvider, setLoadingProvider] = useState<CheckoutProvider | null>(null);
  const [status, setStatus] = useState<string>("Choose Stripe or Razorpay to launch checkout.");

  if (!featureFlags.payments) {
    return (
      <ComingSoonCard
        badge="Payments disabled"
        description="Stripe and Razorpay code is still wired in, but checkout is intentionally blocked until your production payment keys are ready."
        details="When you are ready, add the live payment keys and set NEXT_PUBLIC_ENABLE_PAYMENTS=true to reveal the billing actions again."
        title="Payments are coming soon"
      />
    );
  }

  async function startCheckout(provider: CheckoutProvider) {
    setLoadingProvider(provider);
    setStatus(`Preparing ${provider === "stripe" ? "Stripe" : "Razorpay"} checkout...`);

    try {
      const response = await fetch(`/api/${provider}/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          plan,
          billing,
          customer: {
            name: "Avery Chen",
            email: "avery@flowmind.ai",
            contact: "+919999999999"
          }
        })
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "Checkout failed");
      }

      if (provider === "stripe") {
        if (payload.checkoutUrl) {
          window.location.href = payload.checkoutUrl;
          return;
        }

        setStatus(payload.message || "Stripe checkout is not available yet.");
        return;
      }

      if (!window.Razorpay) {
        setStatus("Razorpay script did not load. Refresh the page and try again.");
        return;
      }

      const options: RazorpayCheckoutOptions = {
        ...payload.checkout,
        handler: (result) => {
          setStatus(`Razorpay payment captured: ${result.razorpay_payment_id}`);
        },
        modal: {
          ondismiss: () => {
            setStatus("Razorpay checkout closed.");
          }
        }
      };

      const checkout = new window.Razorpay(options);
      checkout.open();

      if (payload.demo) {
        setStatus(payload.message || "Opened demo Razorpay checkout configuration.");
      } else {
        setStatus("Razorpay checkout opened.");
      }
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Something went wrong while preparing checkout.");
    } finally {
      setLoadingProvider(null);
    }
  }

  const planData = PLAN_CATALOG[plan];

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      <Card>
        <CardHeader>
          <CardTitle>Billing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="rounded-3xl bg-brand-50 p-5">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-brand-600" />
              <div>
                <p className="font-semibold text-slate-950">Current plan: {planData.name}</p>
                <p className="text-sm text-slate-500">
                  ${planData[billing].usd} per month or Rs {planData[billing].inr} via Razorpay
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {(["PRO", "TEAM"] as PaymentPlan[]).map((value) => (
              <button
                key={value}
                className={`rounded-2xl border px-4 py-3 text-left ${plan === value ? "border-brand-500 bg-brand-50" : "border-slate-200 bg-white"}`}
                onClick={() => setPlan(value)}
                type="button"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-950">{PLAN_CATALOG[value].name}</span>
                  {value === "PRO" ? <Badge variant="accent">Popular</Badge> : null}
                </div>
                <p className="mt-2 text-sm text-slate-500">{PLAN_CATALOG[value].description}</p>
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            {(["monthly", "annual"] as BillingCycle[]).map((value) => (
              <button
                key={value}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${billing === value ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-600"}`}
                onClick={() => setBilling(value)}
                type="button"
              >
                {value === "annual" ? "Annual" : "Monthly"}
              </button>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Button onClick={() => startCheckout("stripe")} type="button">
              {loadingProvider === "stripe" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <WalletCards className="mr-2 h-4 w-4" />}
              Pay with Stripe
            </Button>
            <Button onClick={() => startCheckout("razorpay")} type="button" variant="outline">
              {loadingProvider === "razorpay" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <IndianRupee className="mr-2 h-4 w-4" />}
              Pay with Razorpay
            </Button>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
            {status}
          </div>

          <button className="w-full rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white" type="button">
            Manage Stripe billing portal
          </button>
        </CardContent>
      </Card>
    </>
  );
}
