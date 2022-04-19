import AuthService from "../Firebase/authentication";

const {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  currentUser,
  auth,
  signInWithGooglePopUp,
} = AuthService;

export async function signUp(email, password) {
  // Create user with email and pass.
  const status = await createUserWithEmailAndPassword(auth, email, password)
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

  return status;
}

export async function signInWithGoogle() {
  signInWithGooglePopUp();
}

export async function signIn(email, password) {
  let status = await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      console.log("Successfully signed in!");
      status = { user: userCredential.user };
      return status;
    })
    .catch(function (error) {
      // Handle Errors here.
      status = { error: error };
      return status;
    });
  return status;
}

// /**
//  * Sends an email verification to the user.
//  */
// export function sendEmailVerification() {
//     let status;
//     auth().currentUser.sendEmailVerification().then(function() {
//         // Email Verification sent!
//         alert('Email Verification Sent!');
//     });
//     return status;
// }

// export function sendPasswordReset(email) {
//     let status;
//     auth().sendPasswordResetEmail(email).then(function() {
//         // Password Reset Email Sent!
//         alert('Password Reset Email Sent!');
//     }).catch(function(error) {
//         // Handle Errors here.
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         if (errorCode == 'auth/invalid-email') {
//         alert(errorMessage);
//         } else if (errorCode == 'auth/user-not-found') {
//         alert(errorMessage);
//         }
//         console.log(error);
//     });
//     return status;
// }

// ————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

//Sign out
function signOut() {
  let status;

  return status;
}

//Create strong password
function StrongPassword(password) {
  let status;

  return status;
}

//Check still logged in
function StillLoggedIn(username, password) {
  let status;

  return status;
}

export async function sendPasswordReset(email) {
  const status = await sendPasswordResetEmail(auth, email)
    .then(function () {
      // Password Reset Email Sent!
      return { message: "Reset Email Sent" };
    })
    .catch(function (error) {
      // Handle Errors here.
      return { error: error };
    });
  return status;
}

/**
 * Handles the update user profile button press.
 */

export async function updateUserProfile(displayName, photoURL) {
  let status = await updateProfile(currentUser, {
    displayName: displayName,
    photoURL: photoURL,
  })
    .then(() => {
      return {
        message: "Profile successfully updates",
        updatedProfile: {
          displayName: displayName,
          photoURL: photoURL,
        },
      };
    })
    .catch((error) => {
      return { error: error };
    });
  return status;
}

export async function getUserInfo() {
  return await onAuthStateChanged((user) => {
    if (user) {
      return user;
    } else {
      return null;
    }
  });
}
