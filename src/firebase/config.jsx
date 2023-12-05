import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAnPcyxxfcMEo4AkjJ5RZDHbZhYSGgMZLM",
  authDomain: "blogdev-bibble.firebaseapp.com",
  projectId: "blogdev-bibble",
  storageBucket: "blogdev-bibble.appspot.com",
  messagingSenderId: "397215134854",
  appId: "1:397215134854:web:7b4b1f9e90a4a638378d07",
  measurementId: "G-6HRV2BL8VF"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }