import { NextResponse } from "next/server";

export async function GET() {
  if (process.env.NEXT_PUBLIC_ENABLE_PAYMENTS !== "true") {
    return NextResponse.json(
      {
        error: "Payments are coming soon. Add your production payment keys and set NEXT_PUBLIC_ENABLE_PAYMENTS=true to enable the billing portal."
      },
      { status: 503 }
    );
  }

  return NextResponse.json({
    url: "https://dashboard.stripe.com/test/customers",
    message: "Demo billing portal response."
  });
}
