import { cert, getApp, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

type FirebaseServiceAccount = {
  projectId: string;
  clientEmail: string;
  privateKey: string;
};

function normalizePrivateKey(privateKey: string) {
  return privateKey.replace(/\\n/g, "\n");
}

function getServiceAccountFromJson() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (!raw) {
    return null;
  }

  const parsed = JSON.parse(raw) as {
    project_id?: string;
    client_email?: string;
    private_key?: string;
  };

  if (!parsed.project_id || !parsed.client_email || !parsed.private_key) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY is missing required fields.");
  }

  return {
    projectId: parsed.project_id,
    clientEmail: parsed.client_email,
    privateKey: normalizePrivateKey(parsed.private_key)
  } satisfies FirebaseServiceAccount;
}

function getServiceAccountFromEnv() {
  const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    return null;
  }

  return {
    projectId,
    clientEmail,
    privateKey: normalizePrivateKey(privateKey)
  } satisfies FirebaseServiceAccount;
}

function getFirebaseServiceAccount() {
  const serviceAccount = getServiceAccountFromJson() || getServiceAccountFromEnv();

  if (!serviceAccount) {
    throw new Error(
      "Firebase Admin is not configured. Set FIREBASE_SERVICE_ACCOUNT_KEY or FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY."
    );
  }

  return serviceAccount;
}

export function hasFirebaseAdminConfig() {
  try {
    const serviceAccount = getFirebaseServiceAccount();
    return Boolean(serviceAccount.projectId && serviceAccount.clientEmail && serviceAccount.privateKey);
  } catch {
    return false;
  }
}

export function getFirebaseAdminApp() {
  if (getApps().length) {
    return getApp();
  }

  const serviceAccount = getFirebaseServiceAccount();

  return initializeApp({
    credential: cert({
      projectId: serviceAccount.projectId,
      clientEmail: serviceAccount.clientEmail,
      privateKey: serviceAccount.privateKey
    }),
    projectId: serviceAccount.projectId
  });
}

export function getFirebaseAdminAuth() {
  return getAuth(getFirebaseAdminApp());
}
