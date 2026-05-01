import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD0nDdT84Mg20tRu_cXT7-Ky1iX3BcaLkE",
  authDomain: "todo-app-583a0.firebaseapp.com",
  projectId: "todo-app-583a0",
  storageBucket: "todo-app-583a0.firebasestorage.app",
  messagingSenderId: "450949437593",
  appId: "1:450949437593:web:07e478caa25eb7644e8008"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();