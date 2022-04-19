import { signIn, signUp, sendPasswordReset } from "../../scripts/common/API";
import { useState } from "react";
import style from "./Style.module.css";
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
      <p
        style={{ cursor: "pointer" }}
        onClick={() => {
          changeFormStatus(true);
        }}
      >
        Signing Up?
      </p>
      {/*The button did not need anything in it, hence it is an "empty" html element*/}
    </>
  );
}

function SignUpForm({ changeFormStatus }) {
  return (
    <>
      <h1>Sign Up</h1>
      <Input title="Username" />
      <Input title="Password" />
      <Input title="Verify Password" />
      <Button
        id="User Create"
        title="Sign Up"
        onClick={() =>
          signIn(
            document.getElementById("Username").value,
            document.getElementById("Password").value
          )
        }
      />
      <p
        style={{ cursor: "pointer" }}
        onClick={() => {
          changeFormStatus(false);
        }}
      >
        Logging In?
      </p>
    </>
  );
}

function Input(props) {
  return (
    <div className="Input">
      <input id={props.title} placeholder={props.title} className="input-bar" />
    </div>
  );
}

function Button({ onClick, title, id }) {
  return (
    <div className={style["Submission"]}>
      <button id={id} onClick={() => onClick()}>
        {title}
      </button>
    </div>
  );
}

function RememberMe() {
  return (
    <div className={style["remember_me"] + " center"}>
      <div className={style["remember_me_inner"]}>
        <input className={style["remember_me_checkbox"]} type="checkbox" />
        <a className={style["remember_me_link"]}>Remember me</a>
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
