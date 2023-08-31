// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  writeBatch,
} from "firebase/firestore";

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

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInfo = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  const snapshot = await getDoc(userDocRef);

  if (!snapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (error) {
      console.error(error.message);
    }
  }

  return userDocRef;
};

export const createUserAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return signInWithEmailAndPassword(auth, email, password);
};

export const authStateChangeEventListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const signOutUser = async () => {
  return await signOut(auth);
};

export const addCollectionToDocument = async (collectionKey, objectToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
};

export const getCategoriesFromDoc = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapShot = await getDocs(q);
  const categoryMap = querySnapShot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title] = items;
    return acc;
  }, {});
  return categoryMap;
};

// export const postPurchasedItems = async (userId, items, cartTotal) => {
//   try {
//     const userRef = doc(db, "users", userId);
//     const purchasedItemsCollection = collection(userRef, "purchasedItems");
//     const newPaymentDetail = {
//       items: items,
//       total: cartTotal,
//       purchasedAt: new Date(),
//     };

//     await addDoc(purchasedItemsCollection, newPaymentDetail);

//     console.log("Purchased items added successfully.");
//   } catch (error) {
//     console.error("Error adding purchased items: ", error);
//   }
// };




export const postPurchasedItems = async (userId, items, cartTotal) => {
  if(!items || !userId || !cartTotal) return;
  try {
    const userRef = doc(db, 'users', userId);

    // Fetch existing payment details
    const docSnap = await getDoc(userRef);
    let paymentDetails = [];
    if (docSnap.exists()) {
      paymentDetails = docSnap.data().paymentDetails || [];
    }

    // Prepare new payment details
    const newPaymentDetail = {
      purchasedItems: items,
      total: cartTotal,
      purchasedAt: new Date()
    };

    
    // Update Firestore record

    await setDoc(
      userRef,
      { 
        paymentDetails: [...paymentDetails, newPaymentDetail]
      },
      { merge: true }
    );

  } catch (error) {
    console.error("Error adding purchased items: ", error);
  }
};
