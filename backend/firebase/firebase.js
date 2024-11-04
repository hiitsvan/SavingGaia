const { initializeApp: initializeClientApp } = require("firebase/app");
const { getAuth: getClientAuth } = require("firebase/auth");
const admin = require('firebase-admin');
const serviceAccount = require('../config/serviceAccountKey.json');

// Firebase Client SDK Configuration
const firebaseClientConfig = {
  apiKey: "AIzaSyC6nkvQ1WfLPr8iJzuOfeaxfkHJB6BR_Fo",
  authDomain: "wad2proj-c747a.firebaseapp.com",
  projectId: "wad2proj-c747a",
  messagingSenderId: "626544421561",
  appId: "1:626544421561:web:d6b702246df00a24598968",
};

// Initialize Firebase Client SDK
const clientApp = initializeClientApp(firebaseClientConfig);
const clientAuth = getClientAuth(clientApp);

// Firebase Admin SDK Configuration
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
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
