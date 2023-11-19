import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBCZF_QCYGHZI_CH50iHcXrKdeHaadcRUA",
  authDomain: "larys-df83c.firebaseapp.com",
  projectId: "larys-df83c",
  storageBucket: "larys-df83c.appspot.com",
  messagingSenderId: "105762594261",
  appId: "1:105762594261:web:a4793aad53caf08a93715c",
  measurementId: "G-MDECSTVDF7"
};

export const app = initializeApp(firebaseConfig);
export const authApp = initializeApp(firebaseConfig);