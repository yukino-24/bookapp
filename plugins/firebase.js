// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAglQ4UOKrL1afVqqyE9X5iSTpCcGo3Wl4",
  authDomain: "nuxt-spa-bookapp-35562.firebaseapp.com",
  projectId: "nuxt-spa-bookapp-35562",
  storageBucket: "nuxt-spa-bookapp-35562.appspot.com",
  messagingSenderId: "928655663481",
  appId: "1:928655663481:web:0a4816ca20d7ef355d0fa8"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default ( context, inject ) => {
  inject('firebase', firebaseApp)
}