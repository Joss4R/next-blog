// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "joss-blog.firebaseapp.com",
  projectId: "joss-blog",
  storageBucket: "joss-blog.appspot.com",
  messagingSenderId: "1021152392585",
  appId: "1:1021152392585:web:9a2f23363a229cdf899d58"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);