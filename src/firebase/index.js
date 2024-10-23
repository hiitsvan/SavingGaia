// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

const auth = getAuth(app)

export {auth}