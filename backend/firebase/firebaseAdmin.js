// firebaseAdmin.js
require('dotenv').config();
const admin = require('firebase-admin');

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


const db = admin.firestore();

module.exports = { admin, db };