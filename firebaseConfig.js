// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHb0lvF_WHi_8zCPCmaRCxUtVIQir5EFc",
  authDomain: "recipes-42a46.firebaseapp.com",
  projectId: "recipes-42a46",
  storageBucket: "recipes-42a46.firebasestorage.app",
  messagingSenderId: "718344503556",
  appId: "1:718344503556:web:67f8b5fa423829f10cd051",
  measurementId: "G-8HC04JT7VL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const firestore = getFirestore(app);