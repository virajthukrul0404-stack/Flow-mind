import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    received: true,
    message: "Demo webhook endpoint. Add Stripe signature verification before production deploy."
  });
}
