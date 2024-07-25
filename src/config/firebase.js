import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA3HJH4vE-U3naG2gTWO0Q5vatQ7JXc604",
  authDomain: "shelfie-app-73320.firebaseapp.com",
  projectId: "shelfie-app-73320",
  storageBucket: "shelfie-app-73320.appspot.com",
  messagingSenderId: "815500252521",
  appId: "1:815500252521:web:2e0683353e025a9dddd9f8",
  measurementId: "G-48S9CEGS6E",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };
