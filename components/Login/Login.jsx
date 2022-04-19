import {
  signIn,
  signUp,
  sendPasswordReset,
  signInWithGoogle,
} from "../../scripts/common/API";
import { useState } from "react";
import style from "./Style.module.css";
import { useRouter } from "next/router";
function AccountHandler({ emphasis }) {
  const [isSigningUp, changeFormStatus] = useState(false);
  let ComponentToShow = isSigningUp ? SignUpForm : LoginForm;
  return (
    <div
      className={
        style["account_handler_container"] + " center theme_background"
      }
    >
      <ComponentToShow changeFormStatus={changeFormStatus} />
    </div>
  );
}

function LoginForm({ emphasis, changeFormStatus }) {
  return (
    <>
      <h1 className={style["login-title"]}>Login</h1>
      <Input title="Username" />
      <Input title="Password" />
      {/* <Input title="PasswordVeri" /> */}
      <RememberMe />
      <Button
        id="User Login"
        title="Log in"
        onClick={() =>
          signIn(
            document.getElementById("Username").value,
            document.getElementById("Password").value
          )
        }
      />
      <LogInSignUpToggle LogIn changeFormStatus={changeFormStatus} />
      {/*The button did not need anything in it, hence it is an "empty" html element*/}
    </>
  );
}

function SignUpForm({ changeFormStatus }) {
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
      {error ? <p className={style["DisplayError"]}>{error}</p> : null}
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
      <LogInSignUpToggle SignUp changeFormStatus={changeFormStatus} />
    </>
  );
}
function LogInSignUpToggle({ LogIn, SignUp, changeFormStatus }) {
  const display = LogIn ? (
    <p
      style={{ cursor: "pointer", color: "white" }}
      onClick={() => {
        changeFormStatus(true);
      }}
    >
      Logging In?
    </p>
  ) : (
    <p
      style={{ cursor: "pointer", color: "white" }}
      onClick={() => {
        changeFormStatus(false);
      }}
    >
      Signing Up?
    </p>
  );

  return display;
}
function SignInWithGoogle() {
  return (
    <div>
      <img
        onClick={() => {
          signInWithGoogle();
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
