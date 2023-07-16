import GoToMenuButton from "../../../_utils/GoToMenuButton";
import Authorized from "../../../globals/Auth/Authorized";

import AuthorizedMenu from "./AuthorizedMenu";
import NotAuthorizedMenu from "./NotAuthorizedMenu";
import styles from "./style.module.scss";

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
