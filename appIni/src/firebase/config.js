import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

    apiKey: "AIzaSyBYekALPkplR8_7RnoIbSLIQJrEv5OxjUk",
    authDomain: "etec25-95021.firebaseapp.com",
    projectId: "etec25-95021",
    storageBucket: "etec25-95021.firebasestorage.app",
    messagingSenderId: "813780328346",
    appId: "1:813780328346:web:9d52c7357fe37f14b4e423"
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export const db = getFirestore(app);
