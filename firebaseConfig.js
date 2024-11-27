// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDsuoTDvYKie9vBlp1UP23DoKmbrBLo4So",
  authDomain: "travellingapp-ef3ae.firebaseapp.com",
  projectId: "travellingapp-ef3ae",
  storageBucket: "travellingapp-ef3ae.appspot.com",
  messagingSenderId: "131355940913",
  appId: "1:131355940913:android:ef6d805c5ed23b53fb5d10",
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { db };
