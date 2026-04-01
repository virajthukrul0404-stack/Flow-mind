import { NextResponse } from "next/server";

import { getFirebaseAdminAuth, hasFirebaseAdminConfig } from "@/lib/firebase-admin";

export const SESSION_COOKIE_NAME = "flowmind_session";

const SESSION_EXPIRES_IN_MS = 1000 * 60 * 60 * 24 * 5;
const RECENT_SIGN_IN_WINDOW_MS = 1000 * 60 * 5;

type AuthMode = "login" | "signup";

function buildAuthConfigErrorResponse() {
  return NextResponse.json(
    {
      ok: false,
      error: "Firebase Admin is not configured on the server yet."
    },
    { status: 503 }
  );
}

function clearSessionCookie(response: NextResponse) {
  response.cookies.set(SESSION_COOKIE_NAME, "", {
    expires: new Date(0),
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production"
  });

  return response;
}

async function readIdToken(request: Request) {
  const body = await request.json().catch(() => null);
  const idToken = body?.idToken;

  if (typeof idToken !== "string" || !idToken) {
    throw new Error("Missing Firebase ID token.");
  }

  return idToken;
}

export async function createFirebaseSession(request: Request, mode: AuthMode) {
  if (!hasFirebaseAdminConfig()) {
    return buildAuthConfigErrorResponse();
  }

  try {
    const idToken = await readIdToken(request);
    const auth = getFirebaseAdminAuth();
    const decodedIdToken = await auth.verifyIdToken(idToken);
    const authTime = decodedIdToken.auth_time ? decodedIdToken.auth_time * 1000 : 0;

    if (!authTime || Date.now() - authTime > RECENT_SIGN_IN_WINDOW_MS) {
      return NextResponse.json(
        {
          ok: false,
          error: "Recent Google sign-in required. Please try again."
        },
        { status: 401 }
      );
    }

    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn: SESSION_EXPIRES_IN_MS
    });

    const response = NextResponse.json({
      ok: true,
      mode,
      user: {
        uid: decodedIdToken.uid,
        email: decodedIdToken.email || null,
        name: decodedIdToken.name || "FlowMind User",
        picture: decodedIdToken.picture || null
      }
    });

    response.cookies.set(SESSION_COOKIE_NAME, sessionCookie, {
      httpOnly: true,
      maxAge: SESSION_EXPIRES_IN_MS / 1000,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production"
    });

    return response;
  } catch (error) {
    console.error(`Failed to create Firebase ${mode} session`, error);

    return clearSessionCookie(
      NextResponse.json(
        {
          ok: false,
          error: "Google authentication failed. Please try again."
        },
        { status: 401 }
      )
    );
  }
}

export async function destroyFirebaseSession(sessionCookie?: string) {
  if (sessionCookie && hasFirebaseAdminConfig()) {
    try {
      const auth = getFirebaseAdminAuth();
      const decoded = await auth.verifySessionCookie(sessionCookie, false);
      await auth.revokeRefreshTokens(decoded.sub);
    } catch (error) {
      console.error("Failed to revoke Firebase session", error);
    }
  }

  return clearSessionCookie(
    NextResponse.json({
      ok: true,
      message: "Signed out successfully."
    })
  );
}
