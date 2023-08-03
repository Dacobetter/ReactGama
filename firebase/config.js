// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtn8Qh1gCT0_pXiO8ocjcE5S7Fk64mXFA",
  authDomain: "gama-tienda.firebaseapp.com",
  projectId: "gama-tienda",
  storageBucket: "gama-tienda.appspot.com",
  messagingSenderId: "520699160966",
  appId: "1:520699160966:web:d51104667f964c6ac5a407",
  measurementId: "G-SE85H7P40D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const getFireStoreApp = () => {
  return app
}