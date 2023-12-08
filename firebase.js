import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, child, set } from "firebase/database";
import { orderByChild } from "firebase/database";

 


const firebaseConfig = {
  apiKey: "AIzaSyB26plX2Eq8s9wPxzrYw59by1JdYipHyvM",
  authDomain: "mobile-e8786.firebaseapp.com",
  databaseURL: "https://mobile-e8786-default-rtdb.firebaseio.com",
  projectId: "mobile-e8786",
  storageBucket: "mobile-e8786.appspot.com",
  messagingSenderId: "799045158976",
  appId: "1:799045158976:web:e80c8a225e8090e0b277a5",
  measurementId: "G-VML4RJTVC6"
};


const firebaseapp = initializeApp(firebaseConfig);
const db = getDatabase();
 
export {db, ref, onValue, child, set, orderByChild};
