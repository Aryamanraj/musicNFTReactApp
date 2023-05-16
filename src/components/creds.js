// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxssHHMupb3Ei_W_YFH6L5Qj9tphV1ehg",
  authDomain: "nftmusicapp.firebaseapp.com",
  projectId: "nftmusicapp",
  storageBucket: "nftmusicapp.appspot.com",
  messagingSenderId: "1042622023889",
  appId: "1:1042622023889:web:61e785f4459b0dd91d1df0",
  measurementId: "G-RZGZZLC9DC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);