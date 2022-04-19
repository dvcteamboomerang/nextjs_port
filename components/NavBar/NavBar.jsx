import React from "react";
import style from "./Style.module.css";
export default function NavBar({ user }) {
  return (
    <nav className={style.NavBar + " theme_background"}>
      <WebsiteInfo />
      <NavBarLinks />
      {user ? <UserInfo /> : null}
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

function UserInfo() {
  return (
    <div className={style.UserInfoContainer} style={{ display: "flex" }}>
      <UserIcon />
      <UserNameTag />
    </div>
  );
}
function UserIcon({ imgLink }) {
  return <img src={imgLink}></img>;
}
function UserNameTag(username) {
  return <h1>{username}</h1>;
}
