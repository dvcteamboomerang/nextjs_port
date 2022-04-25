import AuthService from "../Firebase/authentication";

const {
  signUpWithFirebase,
  signInWithFirebase,
  signInGoogleWithFirebase,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  currentUser,
  isLoggedInFirebase,
  signOutFirebase,
} = AuthService;

export async function signUp(email, password) {
  // Create user with email and pass.
  const status = await signUpWithFirebase(email, password);
  return status;
}

export async function signInWithGoogle() {
  return await signInGoogleWithFirebase();
}

export async function signIn(email, password) {
  let status = await signInWithFirebase(email, password);
  return status;
}
export async function checkIfLoggedIn(changeState, elseState) {
  isLoggedInFirebase((user) => {
    changeState(user);
    if (!user) elseState();
  });
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
export async function signOut() {
  await signOutFirebase();
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
