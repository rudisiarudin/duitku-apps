// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLk5J0BzDUIumyhiI83Fc0MlarQOOOV3Q",
  authDomain: "duit-ku123.firebaseapp.com",
  projectId: "duit-ku123",
  storageBucket: "duit-ku123.appspot.com", // pastikan ini .appspot.com
  messagingSenderId: "552763869425",
  appId: "1:552763869425:web:a02b57a7d9dd9667c54150",
  measurementId: "G-8DM952KY7Q"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
