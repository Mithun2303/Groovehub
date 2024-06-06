import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBg_FMPiZeoUKpIcei7w4ojvmtLNfu3ct8",
  authDomain: "groovehub-c074d.firebaseapp.com",
  projectId: "groovehub-c074d",
  storageBucket: "groovehub-c074d.appspot.com",
  messagingSenderId: "532719047942",
  appId: "1:532719047942:web:cb8373b8c36a25eecefa87",
  measurementId: "G-HSF45YHG3R"
};

// Initialize Firebase
export const fb = initializeApp(firebaseConfig);
export const storage = getStorage(fb)

