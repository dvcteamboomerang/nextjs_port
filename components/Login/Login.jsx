import {
  signIn,
  signUp,
  sendPasswordReset,
  signInWithGoogle,
} from "../../scripts/common/API";
import { useEffect, useState } from "react";
import style from "./Style.module.css";
import { useRouter } from "next/router";
function AccountHandler({ emphasis }) {
  const [signingUpStatus, isSigningUp] = useState(false);
  let ComponentToShow = signingUpStatus ? SignUpForm : LoginForm;
  return (
    <div
      className={
        style["account_handler_container"] + " center theme_background"
      }
    >
      <ComponentToShow isSigningUp={isSigningUp} />
    </div>
  );
}

function LoginForm({ emphasis, isSigningUp }) {
  const router = useRouter();
  const [error, setError] = useState(null);

  return (
    <>
      <h1 className={style["login-title"]}>Login</h1>
      <Input title="Email" />
      <Input title="Password" private />
      <PopUpAlert error={error} style={style} setError={setError} />
      <RememberMe />
      <Button
        id="User Login"
        title="Log in"
        onClick={async () => {
          let email = document.getElementById("Email").value;
          let password = document.getElementById("Password").value;
          let status = await signIn(email, password);

          let { error, user } = status;
          if (error) {
            setError(error);
          } else if (user) {
            router.push("/userPage");
          }
        }}
      />
      <SignInWithGoogle />
      <LogInSignUpToggle LogIn isSigningUp={isSigningUp} />
      {/*The button did not need anything in it, hence it is an "empty" html element*/}
    </>
  );
}

const PopUpAlert = ({ error, setError, style }) => {
  let message = error;
  useEffect(() => {
    console.log("rerender");
    let debounce = true;
    const onMouseMove = (event) => {
      let mouse = { clientX: event.clientX, clientY: event.clientY };
      let Alert = document.getElementsByClassName(style["DisplayAlert"])[0];
      if (message && Alert) {
        Alert.style.top = mouse.clientY + "px";
        Alert.style.left = mouse.clientX + "px";
        if (debounce) {
          Alert.style.opacity = 1.0;
          debounce = false;
          setTimeout(
            () => {
              setTimeout(
                () => {
                  Alert.style.opacity = 0;

                  setTimeout(
                    () => {
                      if (message && mouse.clientX && mouse.clientY) {
                        message = null;
                        setError(null);
                      }
                      debounce = false;
                    },
                    2000,
                    style,
                    mouse,
                    message,
                    setError
                  );
                },
                2000,
                style,
                mouse,
                message,
                setError
              );
            },
            2000,
            style,
            mouse,
            message,
            setError
          );
        }
      }
    };
    document.addEventListener("mousemove", onMouseMove);
  }, [style, error, setError]);
  return message ? (
    <p on className={style["DisplayAlert"]}>
      {message}
    </p>
  ) : null;
};

function SignUpForm({ isSigningUp }) {
  const router = useRouter();
  const [error, setError] = useState(null);
  console.log(error);
  return (
    <>
      <h1 className={style["login-title"]}>Sign Up</h1>

      <Input title="Username" />
      <Input title="Email" />
      <Input title="Password" private />
      <Input title="Verify Password" private />
      <PopUpAlert error={error} style={style} setError={setError} />
      <Button
        private
        id="User Create"
        title="Sign Up"
        onClick={async () => {
          let email = document.getElementById("Email").value;
          let username = document.getElementById("Username").value;
          let password = document.getElementById("Password").value;
          let verifyPassword = document.getElementById("Verify Password").value;
          if (password === verifyPassword) {
          }
          let status = await signUp(email, password, username);

          let { error, user } = status;
          if (error) {
            setError(error);
          } else {
            router.push("/userPage");
          }
        }}
      />
      <SignInWithGoogle />
      <LogInSignUpToggle SignUp isSigningUp={isSigningUp} />
    </>
  );
}
function LogInSignUpToggle({ LogIn, SignUp, isSigningUp }) {
  const display = LogIn ? (
    <p
      style={{ cursor: "pointer", color: "white" }}
      onClick={() => {
        isSigningUp(true);
      }}
    >
      Signing Up?
    </p>
  ) : (
    <p
      style={{ cursor: "pointer", color: "white" }}
      onClick={() => {
        isSigningUp(false);
      }}
    >
      Logging In?
    </p>
  );

  return display;
}
function SignInWithGoogle() {
  const router = useRouter();
  return (
    <div>
      <img
        onClick={async () => {
          let { error, user } = await signInWithGoogle();
          if (error && setError) {
            setError(error);
          } else {
            router.push("/userPage");
          }
        }}
        style={{ cursor: "pointer", color: "white" }}
        className="signInWithGoogle"
        height="20rem"
        width="20rem"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1024px-Google_%22G%22_Logo.svg.png"
      />
    </div>
  );
}
function Input(props) {
  return (
    <div className={style["Input"] + " center"}>
      <input
        id={props.title}
        placeholder={props.title}
        className={style["input-bar"]}
        type={props["private"] ? "password" : ""}
      />
    </div>
  );
}

function Button({ onClick, title, id }) {
  return (
    <div className={style["Submission"]}>
      <img
        id={id}
        src="./logo.svg"
        className={style["submit-button"]}
        onClick={() => onClick()}
      ></img>
    </div>
  );
}
//html stuff = Button();
function RememberMe() {
  return (
    <div className={style["remember_me"] + " center"}>
      <div className={style["remember_me_inner"]}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input className={style["remember_me_checkbox"]} type="checkbox" />
          <a className={style["remember_me_link"]}>Remember me</a>
        </div>
        <a
          className={style["forgot_pass_link"]}
          onClick={() =>
            sendPasswordReset(document.getElementById("Username").value)
          }
        >
          Forgot Password
        </a>
      </div>
    </div>
  );
}
function SignUpButton() {
  return (
    <div className={style["sign_up_container"]}>
      <p>Not a member?</p>{" "}
      <a
        className={style["sign-up-button"]}
        onClick={() =>
          signUp(
            document.getElementById("Username").value,
            document.getElementById("Password").value
          )
        }
      >
        Sign Up Now
      </a>
    </div>
  );
}

export default AccountHandler;
