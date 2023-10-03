import "./style.scss";
import styles from "../../style.module.scss";
import MessagerBox from "./MessagerBox";
import { ReadyImagesURL } from "../../../../../globals/appUrls";
import { MenuChildProps } from "..";
import { useRef, useState } from "react";
import useClickedNotOnElement from "../../../../../_utils/2Hooks/useClickedNotOnElement";
import { useProfilesRelationsContext } from "../../../../../services/Contexts/ProfileDataContext";

export default function MessagerIcon({}: MenuChildProps) {
  const { friends } = useProfilesRelationsContext();
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
    <div ref={iconRef} className={styles.messagerIcon}>
      <div
        className={styles.iconContainer}
        onClick={() => {
          toggleModal(!visibleModal);
        }}
      >
        <img
          className={styles.smallProfileImage}
          src={`${ReadyImagesURL}/messaging-only.png`}
          alt=""
          style={{ height: "100%", width: "100%" }}
        />
      </div>
      <div className={messagerContainerStyle}>
        <MessagerBox
          friends={friends}
          toggleModal={() => toggleModal(!visibleModal)}
        />
      </div>
    </div>
  );
}
