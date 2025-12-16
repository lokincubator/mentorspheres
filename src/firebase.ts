// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import ENVIRONMENT from "./utils/config";

const firebaseConfig = {
  apiKey: ENVIRONMENT.REACT_APP_FIREBASE_API_KEY as string,
  authDomain: ENVIRONMENT.REACT_APP_FIREBASE_AUTH_DOMAIN as string,
  projectId: ENVIRONMENT.REACT_APP_FIREBASE_PROJECT_ID as string,
  storageBucket: ENVIRONMENT.REACT_APP_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: ENVIRONMENT.REACT_APP_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: ENVIRONMENT.REACT_APP_FIREBASE_APP_ID as string,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
