// firebaseClient.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


// Firebase Client SDK Configuration
const firebaseClientConfig = {
  apiKey: "AIzaSyC6nkvQ1WfLPr8iJzuOfeaxfkHJB6BR_Fo",
  authDomain: "wad2proj-c747a.firebaseapp.com",
  projectId: "wad2proj-c747a",
  messagingSenderId:"626544421561",
  appId: "1:626544421561:web:d6b702246df00a24598968",
};

// Initialize Firebase Client SDK
const clientApp = initializeApp(firebaseClientConfig);
const clientAuth = getAuth(clientApp);
const db = getFirestore(clientApp);

export { clientApp, clientAuth, db };
