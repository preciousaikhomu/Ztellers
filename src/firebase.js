// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
 apiKey: "AIzaSyB0lwftO6dxR4DZuH3JPh-OYi0Q363uUc0",
  authDomain: "chat-app-9ca07.firebaseapp.com",
  projectId: "chat-app-9ca07",
  storageBucket: "chat-app-9ca07.appspot.com",
  messagingSenderId: "489223132432",
  appId: "1:489223132432:web:aac1d542b84421bb588195",
  measurementId: "G-9EP3ETQ05Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFirestore();
