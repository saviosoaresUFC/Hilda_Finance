import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db, collection, addDoc, getDocs, doc, setDoc };
