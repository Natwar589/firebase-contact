// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCf8UaaMjd_qwDo7BBcmiZoiHwskmzzmJs",
  authDomain: "vite-contact-90802.firebaseapp.com",
  projectId: "vite-contact-90802",
  storageBucket: "vite-contact-90802.appspot.com",
  messagingSenderId: "529477135892",
  appId: "1:529477135892:web:5123b40c21d3b39e248101"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);