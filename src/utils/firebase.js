import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAZwH7To7sE6p0eKlH3R2KphE16ywtWuLY",
  authDomain: "iberofy.firebaseapp.com",
  projectId: "iberofy",
  storageBucket: "iberofy.appspot.com",
  messagingSenderId: "713628234761",
  appId: "1:713628234761:web:2cf452ff76c0225ade34d8"
};

export const initFirebase = initializeApp(firebaseConfig);

export const db = getFirestore(initFirebase);
