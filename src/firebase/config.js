// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_Iw-_tzSufzSOxunajxq5pESdtOk1ogY",
  authDomain: "react-cursos-c371a.firebaseapp.com",
  projectId: "react-cursos-c371a",
  storageBucket: "react-cursos-c371a.appspot.com",
  messagingSenderId: "778019658070",
  appId: "1:778019658070:web:e26168c6ff538fa5a05ef7"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);