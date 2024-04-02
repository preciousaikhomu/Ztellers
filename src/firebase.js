// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
 apiKey: "AIzaSyBSxBUU2VcpQYjqK8rP19v0FDgCEPXsBl8",
  authDomain: "playground-14bcf.firebaseapp.com",
  databaseURL: "https://playground-14bcf-default-rtdb.firebaseio.com",
  projectId: "playground-14bcf",
  storageBucket: "playground-14bcf.appspot.com",
  messagingSenderId: "601759179504",
  appId: "1:601759179504:web:1ebe3d07b043a531445835",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFirestore();
