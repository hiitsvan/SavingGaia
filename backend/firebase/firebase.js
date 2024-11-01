
const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const { getFirestore } = require("firebase/firestore");
const { getStorage } = require("firebase/storage");
// import dotenv from 'dotenv';

// Load environment variables
// dotenv.config();

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6nkvQ1WfLPr8iJzuOfeaxfkHJB6BR_Fo",
  authDomain: "wad2proj-c747a.firebaseapp.com",
  projectId: "wad2proj-c747a",
  storageBucket: "wad2proj-c747a.appspot.com",
  messagingSenderId: "626544421561",
  appId: "1:626544421561:web:d6b702246df00a24598968"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export the services for use in your application
module.exports = {auth, db, storage}
