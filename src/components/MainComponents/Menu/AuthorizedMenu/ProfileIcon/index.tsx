import { useContext } from "react";
import styles from "../../style.module.scss";
import "./style.scss";
import AuthenticationContext from "../../../../../services/Contexts/AuthenticationContext";
import ProfileContext from "../../../../../services/Contexts/ProfileContext";
import { ReadyImagesURL } from "../../../../../globals/appUrls";
import { logout } from "../../../../../globals/Auth/HandleJWT";
import { useNavigate } from "react-router-dom";
import { MenuChildProps } from "..";



export default function ProfileIcon({
  visibleModal,
  toggleModal,
}: MenuChildProps) {
  const navigate = useNavigate();
  const { update } = useContext(AuthenticationContext);
  const { myProfile } = useContext(ProfileContext);

  const profileOptionsVisible =
    visibleModal === "profileOptions" ? styles.block : styles.hidden;

  const profileOptionsStyle =
    profileOptionsVisible + " " + styles.profileOptions;

  const profileOptions = [
    { name: "Settings", image: "settings.png" },
    { name: "Help", image: "help.png" },
  ];

  return (
    <>
      <div className={styles.profileIcon}>
        <div
          className={styles.smallProfileImage}
          onClick={() => toggleModal("profileOptions")}
          style={{ backgroundImage: `url(${myProfile.ProfileImage})` }}
        >
          <img
            className={styles.arrowImage}
            src={`${ReadyImagesURL}/arrow.png`}
            alt=""
          />
        </div>
      </div>
      <div className={profileOptionsStyle}>
        <div
          className={styles.profile}
          onClick={() => {
            toggleModal("");
            navigate(`/user-profile/${myProfile.Id}`);
          }}
        >
          <img
            src={myProfile.ProfileImage || `${ReadyImagesURL}/noProfile.jpg`}
            alt=""
          />
          <h4>{myProfile.Email}</h4>
        </div>
        {profileOptions &&
          profileOptions.map((option) => {
            return (
              <h4 key={option.name} onClick={() => toggleModal("")}>
                <img src={`${ReadyImagesURL}/${option.image}`} alt="" />
                {option.name}
              </h4>
            );
          })}
        <h4
          onClick={() => {
            logout();
            localStorage.removeItem("username");
            update([]);
            navigate("/");
            navigate(0);
          }}
        >
          <img src={`${ReadyImagesURL}/logout.png`} alt="" />
          Logout
        </h4>
      </div>
    </>
  );
}
