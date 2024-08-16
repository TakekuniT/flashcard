// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASA-54ym-1Hegh-1trU6Ywfsrc3eZOGpg",
  authDomain: "flashcard-56b60.firebaseapp.com",
  databaseURL: "https://flashcard-56b60-default-rtdb.firebaseio.com",
  projectId: "flashcard-56b60",
  storageBucket: "flashcard-56b60.appspot.com",
  messagingSenderId: "79310863352",
  appId: "1:79310863352:web:7afa7f1b18afdf245ef40d",
  measurementId: "G-62D32E8BJR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);