import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  createUserWithEmailAndPassword
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


// Google sign in
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  promp: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)


// Firestore
export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
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

  /*
  if user data exists
  return data

  if user data doesn't exists
  create / set the document with the data fdrom userAuth in my collection
  */
}

