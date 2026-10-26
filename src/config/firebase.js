
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your existing Firebase configuration
const firebaseConfig = {
  apiKey: "REMOVED_FIREBASE_API_KEY",
  authDomain: "talentforge-7b691.firebaseapp.com",
  projectId: "talentforge-7b691",
  storageBucket: "talentforge-7b691.firebasestorage.app",
  messagingSenderId: "668199496849",
  appId: "1:668199496849:web:96039336e4ddacb0bfa330",
  measurementId: "G-5EN86NB4GZ",
};

// Initialize Firebase once
const app = initializeApp(firebaseConfig);

// Existing authentication
const auth = getAuth(app);

// Shared database
const db = getFirestore(app);

export { auth, db };
