import { NextResponse } from "next/server";

import { focusData } from "@/lib/data/mock-data";

export async function GET() {
  return NextResponse.json({ focusData });
}
