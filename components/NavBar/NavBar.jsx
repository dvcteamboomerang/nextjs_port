import React from "react";
import { signOut } from "../../scripts/common/API";
import style from "./Style.module.css";

import { useRouter } from "next/router";
export default function NavBar({ user }) {
  console.log(user);
  return (
    <nav className={style.NavBar + " theme_background"}>
      <WebsiteInfo />
      <NavBarLinks />
      {user ? (
        <UserInfo imgLink={user.photoURL} username={user.displayName} />
      ) : null}
    </nav>
  );
}
function WebsiteInfo() {
  return (
    <div className={"center"} style={{ display: "flex" }}>
      <WebsiteLogo />
      <WebsiteTitle title="Boomerang" />
    </div>
  );
}
function WebsiteLogo() {
  return <img className={style.SiteLogo} src="/logo.svg" />;
}
function WebsiteTitle({ title }) {
  return <h1 className={style.WebsiteTitle}>{title}</h1>;
}

//Change into function:
class NavBarLink extends React.Component {
  render() {
    return (
      <ul>
        <a href={this.props.href} className={style.navBarLinks}>
          {this.props.name}
        </a>
      </ul>
    );
  }
}

function NavBarLinks() {
  return (
    <div style={{ display: "flex" }}>
      <NavBarLink name="Contact Us" href="#Contact_Us_Header" />
      <NavBarLink name="About us" href="#About_Us_Header" />
      <NavBarLink name="Market Place" href="#Marketplace_Header" />
      <NavBarLink name="Events" href="#Events_Header" />
    </div>
  );
}

function UserInfo({ imgLink, username }) {
  return (
    <div className={style.userInfoContainer} style={{ display: "flex" }}>
      <UserIcon imgLink={imgLink} />
      <UserNameTag username={username} />
      <SignOut />
    </div>
  );
}
function UserIcon({ imgLink }) {
  console.log(imgLink);
  return imgLink ? (
    <img
      className={style["userIcon"]}
      onError={({ target }) => {
        console.log(target);
        target.style.display = "none";
      }}
      src={imgLink}
    />
  ) : null;
}
function UserNameTag({ username }) {
  return <h1 className={style["usernameTag"]}>{username}</h1>;
}
function SignOut() {
  const router = useRouter();
  return (
    <p
      className={style.navBarLinks}
      onClick={() => {
        if (signOut()) {
          router.push("/");
        }
      }}
    >
      Sign Out
    </p>
  );
}
