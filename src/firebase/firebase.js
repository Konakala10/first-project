// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAmBk7aS3hzRMadV9RHKaanyteo1obmmFM",
  authDomain: "vin-web-app-c5df7.firebaseapp.com",
  projectId: "vin-web-app-c5df7",
  storageBucket: "vin-web-app-c5df7.firebasestorage.app",
  messagingSenderId: "30319690964",
  appId: "1:30319690964:web:b1c4a68bd0240a3d796741",
  measurementId: "G-WLCMC4MQG3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);