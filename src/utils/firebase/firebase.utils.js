import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyA3JEUvZqlruKAlMEnDSpFTP1gyGIW2YJQ",
  authDomain: "crwn-clothing-263bc.firebaseapp.com",
  projectId: "crwn-clothing-263bc",
  storageBucket: "crwn-clothing-263bc.appspot.com",
  messagingSenderId: "278628516032",
  appId: "1:278628516032:web:f932bb2e97ab49eed3ed25"
};
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);

// Google sign in
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  promp: "select_account"
});

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

// Sign in with email & password 
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  console.log("Do you get here?")

  return await createUserWithEmailAndPassword(auth, email, password);
}


// Firestore
export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      })
    } catch (error) {
      console.log("There was an error creating a user", error.message);
    }
  }

  return userDocRef;
}


