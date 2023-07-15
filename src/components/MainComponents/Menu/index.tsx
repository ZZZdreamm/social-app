import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserSearchTypeahead from "../../Users/UserSearchTypeahead";
import ProfileContext, {
  ProfileFriendsContext,
} from "../../../services/Contexts/ProfileContext";
import GoToMenuButton from "../../../ZZZ_USEFUL COMPONENTS/Utilities/GoToMenuButton";
import Authorized from "../../../ZZZ_USEFUL COMPONENTS/auth/Authorized";
import LogoutButton from "../../../ZZZ_USEFUL COMPONENTS/auth/LogoutButton";

import styles from "./style.module.scss";
import { ReadyImagesURL } from "../../../globals/appUrls";
import AuthenticationContext from "../../../services/Contexts/AuthenticationContext";
import { logout } from "../../../ZZZ_USEFUL COMPONENTS/auth/HandleJWT";
import MessagerBox from "./AuthorizedMenu/MessagerIcon/MessagerBox";
import AuthorizedMenu from "./AuthorizedMenu";
import NotAuthorizedMenu from "./NotAuthorizedMenu";

export default function Menu() {
  return (
    <nav className={styles.navbar}>
      <GoToMenuButton appName={"FriendLink"} />
      <Authorized
        isAuthorized={<AuthorizedMenu />}
        notAuthorized={<NotAuthorizedMenu />}
      />
    </nav>
  );
}
