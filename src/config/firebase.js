import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLJtHg2WXvqSkhnNNN0aLXza71mN6VBPs",
  authDomain: "talentforge-7b691.firebaseapp.com",
  projectId: "talentforge-7b691",
  storageBucket: "talentforge-7b691.firebasestorage.app",
  messagingSenderId: "668199496849",
  appId: "1:668199496849:web:96039336e4ddacb0bfa330",
  measurementId: "G-5EN86NB4GZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
export {auth};
