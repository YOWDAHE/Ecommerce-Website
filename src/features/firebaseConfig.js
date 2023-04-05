// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, FacebookAuthProvider} from "firebase/auth"
const firebaseConfig = {
    apiKey: "AIzaSyDyvzlJNz3jaRhC61-dQTfBmcpAHEuSsPg",
    authDomain: "ecommerce-site-651d5.firebaseapp.com",
    projectId: "ecommerce-site-651d5",
    storageBucket: "ecommerce-site-651d5.appspot.com",
    messagingSenderId: "566207411177",
    appId: "1:566207411177:web:8d9283a36111006a759178",
    measurementId: "G-68Y4692V6Z"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const provider = new FacebookAuthProvider();