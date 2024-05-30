// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-7ab0b.firebaseapp.com",
  projectId: "mern-estate-7ab0b",
  storageBucket: "mern-estate-7ab0b.appspot.com",
  messagingSenderId: "554183746634",
  appId: "1:554183746634:web:5f07cb081e8cbb53a3b2b3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);