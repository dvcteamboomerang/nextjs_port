import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import * as FirebaseAuthService from "firebase/auth";
import { defaultConfig } from "next/dist/server/config-shared";
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
function signInWithGooglePopUp() {
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
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
      // ...
    });
}

let AuthService = {
  ...FirebaseAuthService,
  provider,
  signInWithGooglePopUp,
  auth,
};

export default AuthService;
