// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0mfMjN52IINdCb0d9-4Qaqp0goQDlkmU",
  authDomain: "sorteobr-18632.firebaseapp.com",
  projectId: "sorteobr-18632",
  storageBucket: "sorteobr-18632.appspot.com",
  messagingSenderId: "417762822138",
  appId: "1:417762822138:web:0c1134be0d4b6061c28643",
  measurementId: "G-32CFP7YJP2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db= getFirestore(app);
