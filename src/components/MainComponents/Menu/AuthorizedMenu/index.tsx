import { useState } from "react";
import UserSearchTypeahead from "../../../Users/UserSearchTypeahead";
import MessagerIcon from "./MessagerIcon";
import ProfileIcon from "./ProfileIcon";
import "./style.scss";
import NightModeSwitch from "../../../NightModeSwitch";
import styled from "styled-components";
import { LogoIcon } from "../../../../_utils/logoIcon/LogoIcon";

export default function AuthorizedMenu() {
  return (
    <>
      <span style={{ display: "flex", alignItems: "center" }}>
        <LogoContainer>
          <LogoIcon />
        </LogoContainer>
        <UserSearchTypeahead />
      </span>
      <span className="navbarIconsContainer">
        <NightModeSwitch />

        <MessagerIcon />
        <ProfileIcon />
      </span>
    </>
  );
}

export interface MenuChildProps {}

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
`;
