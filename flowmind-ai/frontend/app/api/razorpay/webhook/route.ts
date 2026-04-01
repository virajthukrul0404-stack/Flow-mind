import { NextResponse } from "next/server";

import { verifyRazorpaySignature } from "@/lib/razorpay";

export async function POST(request: Request) {
  const payload = await request.text();
  const signature = request.headers.get("x-razorpay-signature");

  if (process.env.RAZORPAY_WEBHOOK_SECRET) {
    const valid = verifyRazorpaySignature(payload, signature);

    if (!valid) {
      return NextResponse.json({ error: "Invalid Razorpay signature" }, { status: 400 });
    }
  }

  return NextResponse.json({
    received: true,
    provider: "razorpay",
    message: "Razorpay webhook accepted."
  });
}
