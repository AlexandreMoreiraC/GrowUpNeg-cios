import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBESD8h9DorGmgEN49by1eKXXvnQVihinU",
  authDomain: "growupnegocio.firebaseapp.com",
  projectId: "growupnegocio",
  storageBucket: "growupnegocio.firebasestorage.app",
  messagingSenderId: "1054596836288",
  appId: "1:1054596836288:web:a624ee777e2caf55a9b625"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
