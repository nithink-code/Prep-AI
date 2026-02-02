// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeIktRMG2CL2drrdKqE0FIdD7SWvJ-CPY",
  authDomain: "prep-ai-dc681.firebaseapp.com",
  projectId: "prep-ai-dc681",
  storageBucket: "prep-ai-dc681.firebasestorage.app",
  messagingSenderId: "684852742284",
  appId: "1:684852742284:web:7a34bc55e5daf9e3f213a9",
  measurementId: "G-XWZZHDH2VH"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);