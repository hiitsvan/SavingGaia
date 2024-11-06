// Load environment variables
require('dotenv').config();

const admin = require('firebase-admin');
const { initializeApp: initializeClientApp } = require('firebase/app');
const { getAuth: getClientAuth } = require('firebase/auth');

// Firebase Client SDK Configuration
const firebaseClientConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};


// Initialize Firebase Client SDK
const clientApp = initializeClientApp(firebaseClientConfig);
const clientAuth = getClientAuth(clientApp);

// Firebase Admin SDK Configuration
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  });
}

// Get Firestore from Admin SDK
const db = admin.firestore();

// Export services
module.exports = {
  clientAuth,
  admin,
  db,
};
