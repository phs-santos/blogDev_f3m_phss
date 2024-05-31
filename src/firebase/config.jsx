import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBUzv-mt8dJYJihdWAtdC9XlDv2ZJ6U1G0",
  authDomain: "cosmofera-tech-ryh4wi.firebaseapp.com",
  projectId: "cosmofera-tech-ryh4wi",
  storageBucket: "cosmofera-tech-ryh4wi.appspot.com",
  messagingSenderId: "643517102665",
  appId: "1:643517102665:web:b76a31ff1e99f338519d98"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }