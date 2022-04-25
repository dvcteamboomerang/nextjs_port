import { initializeApp } from "firebase/app";
import { type } from "../common/lib";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import * as FirebaseAuthService from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCNrwGNKUwU3W5wSayIe3VIdh1aS2cduDI",
  authDomain: "boomerang-a4253.firebaseapp.com",
  projectId: "boomerang-a4253",
  storageBucket: "boomerang-a4253.appspot.com",
  messagingSenderId: "474390104780",
  appId: "1:474390104780:web:f95f9c26972f4f530b1069",
  measurementId: "G-STH7PR5N1G",
};

// Initialize Firebase
const app = initializeApp({ ...firebaseConfig });

// Initialize Firebase Authentication and get a reference to the service
const auth = FirebaseAuthService.getAuth(app);
const provider = new GoogleAuthProvider();
async function signInWithGooglePopUp() {
  const auth = getAuth();
  return await signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      return { user: user };
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      return { error: error };
      // ...
    });
}
let isLoggedInFirebase = async (onStateChanged) => {
  const auth = getAuth();
  auth.onAuthStateChanged(onStateChanged);
};

let signUpWithFirebase = async (email, password) => {
  const auth = getAuth();
  let status = {};
  return await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      status = { user: userCredential.user };
      return status;
    })
    .catch(function (error) {
      // Handle Errors here.

      const errorMessage = (code) => {
        switch (code) {
          case "auth/email-already-in-use":
            return "You are already a member silly!";
          default:
            return "Unknown error.";
        }
      };
      status = { error: errorMessage(error.code) };
      return status;
    });
};

let signInWithFirebase = async (email, password) => {
  const auth = getAuth();
  await signOut(auth);
  let status = {};
  return await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      console.log("You have been successfully signed in!");
      status = { user: userCredential.user };
      console.log(status);
      return status;
    })
    .catch(function (error) {
      // Handle Errors here.
      let error_message = interpret.Error(error);
      console.log("Error with login", error);
      status = { error: error_message };
      return status;
    });
};

let signInGoogleWithFirebase = async () => {
  await signOutFirebase;
  return await signInWithGooglePopUp();
};
let interpret = {};
interpret.Error = (error) => {
  //This must be made into an API call
  if (type(error) === "FirebaseError") {
    const { code } = error;
    switch (code) {
      case "auth/invalid-email":
        return "That doesn't look like an email silly!";
      case "auth/wrong-password":
        return "Hmm... Not quite right.";
      case "auth/user-not-found":
        return "I don't think we've seen you before. Try signing up!";
      default:
        return undefined;
    }
  }
};

let signOutFirebase = async () => {
  const auth = getAuth();
  await signOut(auth);
};
let AuthService = {
  provider,
  signInGoogleWithFirebase,
  signUpWithFirebase,
  signInWithFirebase,
  isLoggedInFirebase,
  signOutFirebase,
  auth,
};

export default AuthService;
