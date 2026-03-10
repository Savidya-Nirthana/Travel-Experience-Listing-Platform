import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC0FFGQXd6Uhpm1N0Y6HkhkZ265c3VWwug",
  authDomain: "communityconnect-d4e27.firebaseapp.com",
  projectId: "communityconnect-d4e27",
  storageBucket: "communityconnect-d4e27.firebasestorage.app",
  messagingSenderId: "187325142902",
  appId: "1:187325142902:web:0d347987ff476d71b60c57"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export { storage };
