import { getApp, getApps, initializeApp, type FirebaseOptions } from "firebase/app";
import { getAuth, GoogleAuthProvider, inMemoryPersistence, setPersistence } from "firebase/auth";

function getFirebaseClientConfig(): FirebaseOptions {
  return {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
  };
}

export function hasFirebaseClientConfig() {
  const config = getFirebaseClientConfig();

  return Boolean(config.apiKey && config.authDomain && config.projectId && config.appId);
}

export function getFirebaseClientApp() {
  if (!hasFirebaseClientConfig()) {
    throw new Error("Firebase web config is missing. Add the NEXT_PUBLIC_FIREBASE_* variables.");
  }

  return getApps().length ? getApp() : initializeApp(getFirebaseClientConfig());
}

export function getFirebaseClientAuth() {
  return getAuth(getFirebaseClientApp());
}

export async function prepareFirebaseGoogleAuth() {
  const auth = getFirebaseClientAuth();
  await setPersistence(auth, inMemoryPersistence);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  return { auth, provider };
}
