// references made:
// https://firebase.google.com/docs/web/setup
// https://firebase.google.com/docs/auth/web/auth-state-persistence
// https://react-native-async-storage.github.io/async-storage/docs/usage/
import {
  initializeApp as initializeAppForFirebase,
} from "firebase/app";
import {
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// the project is initialised once and then the accounts that are 
// signed in will persist in the storage of the device and then 
// the exports will be share the authentication and firestore instances.
const settingsForFirebase = {
  apiKey: "AIzaSyCUig67ezOSzGT7gs1KfiNZE0IX1V9fr_s",
  authDomain: "sg-flood-sense.firebaseapp.com",
  projectId: "sg-flood-sense",
  messagingSenderId: "1060989939115",
  appId: "1:1060989939115:web:d2f454b3ceb7261cf336ee",
};

const appForFirebase = initializeAppForFirebase(settingsForFirebase);

// when there is a restart, the authenticated session can be 
// restored by Firebase because of AsyncStorage
export const auth = initializeAuth(appForFirebase, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// this firestore connection will be reused by all the 
// screens and services
export const db = getFirestore(appForFirebase);
