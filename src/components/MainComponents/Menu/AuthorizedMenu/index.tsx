import { useState } from "react";
import UserSearchTypeahead from "../../../Users/UserSearchTypeahead";
import MessagerIcon from "./MessagerIcon";
import ProfileIcon from "./ProfileIcon";
import "./style.scss";
import NightModeSwitch from "../../../NightModeSwitch";

export default function AuthorizedMenu() {

  return (
    <>
      <UserSearchTypeahead />
      <span className="navbarIconsContainer">
        <NightModeSwitch />

        <MessagerIcon  />
        <ProfileIcon  />
      </span>
    </>
  );
}

export interface MenuChildProps {

}
