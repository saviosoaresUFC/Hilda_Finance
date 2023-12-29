import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAQm02ZQ5ZtvN5kgfcgCq7LB29W96GcQ6s",
    authDomain: "hildafinance-30333.firebaseapp.com",
    projectId: "hildafinance-30333",
    storageBucket: "hildafinance-30333.appspot.com",
    messagingSenderId: "836740082237",
    appId: "1:836740082237:web:1b5cb42c02a17a58705854",
    measurementId: "G-S8XC499G7Z"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db, collection, addDoc, getDocs, doc, setDoc };