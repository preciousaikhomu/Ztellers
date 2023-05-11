// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYtrB7ZBp0b6SbTWf74dThZHWph2eIIbE",
  authDomain: "realtor-app-1a423.firebaseapp.com",
  projectId: "realtor-app-1a423",
  storageBucket: "realtor-app-1a423.appspot.com",
  messagingSenderId: "618500732827",
  appId: "1:618500732827:web:5864940226035e4f0f533e",
  measurementId: "G-8HSM8Q9GXP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFirestore();
