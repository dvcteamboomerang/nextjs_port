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
  getCurrentFirebaseUser,
  getAuthorNameFirebase,
} = AuthService;

export async function signUp(email, password) {
  // Create user with email and pass.
  const status = await signUpWithFirebase(email, password);
  const { user, error } = status;
  if (user) {
    const { uid, accessToken } = user;
    let response = fetch(
      `${
        process.env.NODE_ENV === "production"
          ? "https://dvcboomerang.vercel.app"
          : "http://localhost:3000"
      }/api/newUser`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ uid: uid }),
      }
    ).then((res) => res.json());
  } else if (error) {
    return status;
  }
  if (response.success) return status;
  else return { error: "Technical issue DB01" };
}

export async function signInWithGoogle() {
  const status = await signInGoogleWithFirebase();
  const { user } = status;
  const { uid, accessToken } = user;
  let response = fetch(
    `${
      process.env.NODE_ENV === "production"
        ? "https://dvcboomerang.vercel.app"
        : "http://localhost:3000"
    }/api/newUser`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ uid: uid }),
    }
  ).then((res) => res.json());
  console.log(response);
  if (response.success) return status;
  else return { error: "Technical issue DB01" };
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

export async function getCurrentUser() {
  return await getCurrentFirebaseUser();
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

export async function getLatestEvents(limit) {
  let response = await fetch(
    `${
      process.env.NODE_ENV === "production"
        ? "https://dvcboomerang.vercel.app"
        : "http://localhost:3000"
    }/api/getEvents`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ limit: limit }),
    }
  ).then((res) => res.json());
  return response;
}
