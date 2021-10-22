import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
   apiKey: "AIzaSyC9suQXWrwEuo81R5CfiTvJKkfebQxv3r4",
   authDomain: "web-coffee-92cc1.firebaseapp.com",
   projectId: "web-coffee-92cc1",
   storageBucket: "web-coffee-92cc1.appspot.com",
   messagingSenderId: "35468678452",
   appId: "1:35468678452:web:0dbc7eaf41e07d50cd8161",
   measurementId: "G-GERG8LEQXV",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();
export const storage = getStorage(app);
export { db, analytics };
