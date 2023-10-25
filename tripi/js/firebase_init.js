import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js';
import { getAuth, onAuthStateChanged, setPersistence, signInWithRedirect, inMemoryPersistence, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592

// Initialize Firebase
export const app = initializeApp({
    apiKey: "AIzaSyDSUGOZLaZugjiALkHzVGRpecjQr9UkkYo",
    authDomain: "tripi-party.firebaseapp.com",
    projectId: "tripi-party",
    storageBucket: "tripi-party.appspot.com",
    messagingSenderId: "959401819478",
    appId: "1:959401819478:web:31a921400d79f7bd082af7",
    measurementId: "G-QG4PXG6DRL"
});


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export const auth = getAuth(app);