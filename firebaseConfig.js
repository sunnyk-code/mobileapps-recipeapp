import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
console.log("Firebase API Key:", process.env.REACT_APP_FIREBASE_API_KEY);

const firebaseConfig = {
  apiKey: "AIzaSyAEssjTQFNAtITkQho42T3tW-gVlDqISeU",
  authDomain: "react-native-43af4.firebaseapp.com",
  projectId: "react-native-43af4",
  storageBucket: "react-native-43af4.firebasestorage.app",
  messagingSenderId: "32211562604",
  appId: "1:32211562604:web:52f36fb9402cc5c32ca849",
  measurementId: "G-TC6W0T5DPN"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
