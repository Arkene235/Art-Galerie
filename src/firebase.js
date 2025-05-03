// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfI9yELRsgA5a8fZW4QpomN5rhKN4dUYg",
  authDomain: "galerieart-7f6a4.firebaseapp.com",
  projectId: "galerieart-7f6a4",
  storageBucket: "galerieart-7f6a4.firebasestorage.app",
  messagingSenderId: "577815190042",
  appId: "1:577815190042:web:aba6050927dc5392ad0fa3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialiser les services
const storage = getStorage(app);
const db = getFirestore(app);

export { storage, db };

