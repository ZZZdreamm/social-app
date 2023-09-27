import "./style.scss";
import styles from "../../style.module.scss";
import MessagerBox from "./MessagerBox";
import { ReadyImagesURL } from "../../../../../globals/appUrls";
import { MenuChildProps } from "..";
import { useContext, useRef, useState } from "react";
import { ProfileFriendsContext } from "../../../../../services/Contexts/ProfileContext";
import useClickedNotOnElement from "../../../../../_utils/2Hooks/useClickedNotOnElement";

export default function MessagerIcon({}: MenuChildProps) {
  const { myFriends } = useContext(ProfileFriendsContext);
  const [visibleModal, setVisibleModal] = useState(false);

  const iconRef = useRef(null);

  function toggleModal(open: boolean) {
    setVisibleModal(open);
  }
  useClickedNotOnElement(iconRef, () => {
    toggleModal(false);
  });

  const messagerContainerVisible =
    visibleModal == true ? styles.flex : styles.hidden;
  const messagerContainerStyle =
    messagerContainerVisible + " " + styles.messagerContainer;
  return (
    <div
      ref={iconRef}
      className={styles.messagerIcon}
      onClick={() => toggleModal(!visibleModal)}
    >
      <img
        className={styles.smallProfileImage}
        src={`${ReadyImagesURL}/messaging-only.png`}
        alt=""
        style={{ height: "100%", width: "100%" }}
      />
      <div className={messagerContainerStyle}>
        <MessagerBox
          friends={myFriends}
          toggleModal={() => toggleModal(!visibleModal)}
        />
      </div>
    </div>
  );
}
