import { useState } from "react";
import UserSearchTypeahead from "../../../Users/UserSearchTypeahead";
import MessagerIcon from "./MessagerIcon";
import ProfileIcon from "./ProfileIcon";
import "./style.scss";
import NightModeSwitch from "../../../NightModeSwitch";

export default function AuthorizedMenu() {
  const [visibleModal, setVisibleModal] = useState("");

  function toggleModal(modalName: string) {
    setVisibleModal((prev) => (prev === modalName ? "" : modalName));
  }

  return (
    <>
      <UserSearchTypeahead />
      <span className="navbarIconsContainer">
        <NightModeSwitch />

        <MessagerIcon visibleModal={visibleModal} toggleModal={toggleModal} />
        <ProfileIcon visibleModal={visibleModal} toggleModal={toggleModal} />
      </span>
    </>
  );
}

export interface MenuChildProps {
  visibleModal: string;
  toggleModal: (modalName: string) => void;
}
