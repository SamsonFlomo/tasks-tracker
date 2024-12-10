import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCs8jX845KEXH9RTfiC8eB2ycnRzcP9mwk",
  authDomain: "react-note-d93ce.firebaseapp.com",
  projectId: "react-note-d93ce",
  storageBucket: "react-note-d93ce.firebasestorage.app",
  messagingSenderId: "370984367461",
  appId: "1:370984367461:web:36748a24c81496f355dd8c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const taskCollection = collection(db, "tasks");
const userCollection = collection(db, "users");

export { taskCollection, userCollection, db };
