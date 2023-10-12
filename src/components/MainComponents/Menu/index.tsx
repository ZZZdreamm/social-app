import Authorized from "../../../globals/Auth/Authorized";
import AuthorizedMenu from "./AuthorizedMenu";
import NotAuthorizedMenu from "./NotAuthorizedMenu";
import styles from "./style.module.scss";

export default function Menu() {
  return (
    <nav className={styles.navbar}>
      <Authorized
        isAuthorized={<AuthorizedMenu />}
        notAuthorized={<NotAuthorizedMenu />}
      />
    </nav>
  );
}
