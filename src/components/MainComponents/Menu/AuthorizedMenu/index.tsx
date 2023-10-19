import { useState } from "react";
import UserSearchTypeahead from "../../../Users/UserSearchTypeahead";
import MessagerIcon from "./MessagerIcon";
import ProfileIcon from "./ProfileIcon";
import "./style.scss";
import NightModeSwitch from "../../../NightModeSwitch";
import styled from "styled-components";
import { LogoIcon } from "../../../../_utils/logoIcon/LogoIcon";
import { UserSearchTypeaheadd } from "../../../userSearchTypeahead/UserSearchTypeahead";
import { useAuthenticationContext } from "../../../../services/Contexts/AuthenticationContext";
import { searchUsers } from "../../../../apiFunctions/searchUsers";

export default function AuthorizedMenu() {
  const { profile } = useAuthenticationContext();
  const onUserSearch = async (query: string) => {
    return await searchUsers(query, profile?.Id);
  };
  return (
    <>
      <LogoAndSearchContainer>
        <LogoContainer>
          <LogoIcon />
        </LogoContainer>
        <div style={{ position: "relative", width: "19rem", right: "4rem" }}>
          <UserSearchTypeaheadd onSearch={onUserSearch} />
        </div>
      </LogoAndSearchContainer>
      <span className="navbarIconsContainer">
        <NightModeSwitch />
        <MessagerIcon />
        <ProfileIcon />
      </span>
    </>
  );
}

export interface MenuChildProps {}

const LogoAndSearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
`;
