import "./style.scss";
import styles from "../../style.module.scss";
import MessagerBox from "./MessagerBox";
import { ReadyImagesURL } from "../../../../../globals/appUrls";
import { MenuChildProps } from "..";
import { useContext } from "react";
import { ProfileFriendsContext } from "../../../../../services/Contexts/ProfileContext";

export default function MessagerIcon({
  visibleModal,
  toggleModal,
}: MenuChildProps) {
  const { myFriends } = useContext(ProfileFriendsContext);

  const messagerContainerVisible =
    visibleModal === "messager" ? styles.flex : styles.hidden;
  const messagerContainerStyle =
    messagerContainerVisible + " " + styles.messagerContainer;
  return (
    <div className={styles.messagerIcon}>
      <img
        className={styles.smallProfileImage}
        onClick={() => {
          toggleModal("messager");
        }}
        src={`${ReadyImagesURL}/messaging-only.png`}
        alt=""
      />
      <div className={messagerContainerStyle}>
        <MessagerBox friends={myFriends} toggleModal={toggleModal} />
      </div>
    </div>
  );
}
