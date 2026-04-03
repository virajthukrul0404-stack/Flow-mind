import NextAuth from "next-auth";

import { authOptions } from "@/lib/auth-options";

function syncNextAuthUrl(request: Request) {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = forwardedHost || request.headers.get("host");

  if (!host) {
    return;
  }

  const protoHeader = request.headers.get("x-forwarded-proto");
  const protocol = protoHeader || (host.includes("localhost") ? "http" : "https");
  const inferredUrl = `${protocol}://${host}`;

  process.env.NEXTAUTH_URL = inferredUrl;
  process.env.NEXTAUTH_URL_INTERNAL = inferredUrl;
}

const nextAuthHandler = NextAuth(authOptions);

export async function GET(request: Request, context: unknown) {
  syncNextAuthUrl(request);
  return nextAuthHandler(request, context);
}

export async function POST(request: Request, context: unknown) {
  syncNextAuthUrl(request);
  return nextAuthHandler(request, context);
}
