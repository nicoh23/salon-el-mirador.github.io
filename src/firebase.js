import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

// configuracon
const firebaseConfig = {
  apiKey: "AIzaSyBGynmUqZq_vRowjU-acCRMrwoFgOE_e_M",
  authDomain: "el-mirador-auth.firebaseapp.com",
  projectId: "el-mirador-auth",
  storageBucket: "el-mirador-auth.appspot.com",
  messagingSenderId: "210102519520",
  appId: "1:210102519520:web:64af4afe64eeb38df23285"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)