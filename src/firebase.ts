import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyALulsh7Ilsi2R5i3XbCstzIMASnBYQfhg",
  authDomain: "touristapplication-87d87.firebaseapp.com",
  databaseURL:
    "https://touristapplication-87d87-default-rtdb.firebaseio.com",
  projectId: "touristapplication-87d87",
  storageBucket: "touristapplication-87d87.appspot.com",
  messagingSenderId: "720697357854",
  appId: "1:720697357854:web:3afad36ca9150e760ae00f",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);

export default app;