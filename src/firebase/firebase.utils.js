import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAqEpGWuVIPYhXcnNbiLqNxHrkq3JPGxRY",
  authDomain: "crwn-db-bdb83.firebaseapp.com",
  databaseURL: "https://crwn-db-bdb83.firebaseio.com",
  projectId: "crwn-db-bdb83",
  storageBucket: "crwn-db-bdb83.appspot.com",
  messagingSenderId: "720271150179",
  appId: "1:720271150179:web:c736a47dc6afdd90f5bc56",
  measurementId: "G-XN5NTRXZQ3"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
