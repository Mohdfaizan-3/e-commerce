// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlKQzzjtEqg96rP6qhPnbnU_tf02G2fpE",
  authDomain: "crwn-e-commerce-cfa33.firebaseapp.com",
  projectId: "crwn-e-commerce-cfa33",
  storageBucket: "crwn-e-commerce-cfa33.appspot.com",
  messagingSenderId: "684287492648",
  appId: "1:684287492648:web:d2211bd7dd41e60bab2b1d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const snapshot = await getDoc(userDocRef);

  if (!snapshot.exists()) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef,{
        displayName,
        email,
        createdAt
      });
    } catch (error) {
      console.error(error.message);
    }
  }

  return userDocRef;
};
