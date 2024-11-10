// firebaseClient.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


// Firebase Client SDK Configuration
const firebaseClientConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
};

// Initialize Firebase Client SDK
const clientApp = initializeApp(firebaseClientConfig);
const clientAuth = getAuth(clientApp);
const db = getFirestore(clientApp);

export { clientApp, clientAuth, db };
