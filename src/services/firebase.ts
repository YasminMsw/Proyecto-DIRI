// src/services/firebase.ts
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC2jBQjPlExlf_Hn2-HMX0B4YkT_UPJGG0",
  authDomain: "gestor-finanzas-7651b.firebaseapp.com",
  projectId: "gestor-finanzas-7651b",
  storageBucket: "gestor-finanzas-7651b.firebasestorage.app",
  messagingSenderId: "343999252230",
  appId: "1:343999252230:web:f1c5bebdf130c1009d0087"
};
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
