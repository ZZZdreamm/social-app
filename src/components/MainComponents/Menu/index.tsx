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
import MessagerBox from "./MessagerBox";

export default function Menu() {
  const navigate = useNavigate();
  const { myProfile } = useContext(ProfileContext);
  const { myFriends } = useContext(ProfileFriendsContext);
  const [profileOptionsOpen, setProfileOptionsOpen] = useState(false);
  const [messagerOpen, setMessagerOpen] = useState(false);
  const [visibleModal, setVisibleModal] = useState("");

  const { update } = useContext(AuthenticationContext);

  function toggleModal(modalName:string) {
    setVisibleModal((prev) => (prev === modalName ? "" : modalName));
  }

  const profileOptionsVisible = visibleModal === "profileOptions"
    ? styles.block
    : styles.hidden;

  const profileOptionsStyle =
    profileOptionsVisible + " " + styles.profileOptions;

  const profileOptions = [
    { name: "Settings", image: "settings.png" },
    { name: "Help", image: "help.png" },
  ];

  const messagerContainerVisible = visibleModal === "messager"
    ? styles.flex
    : styles.hidden;
  const messagerContainerStyle =
    messagerContainerVisible + " " + styles.messagerContainer;
  return (
    <nav className={styles.navbar}>
      <GoToMenuButton appName={"FriendLink"} />
      <Authorized
        isAuthorized={
          <>
            <UserSearchTypeahead />
            <span
              style={{
                height: "80%",
                display: "flex",
                alignItems: "center",
                padding: "0 0.5rem",
                marginRight: "1rem",
                gap: "0.5rem",
              }}
            >
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
                  <MessagerBox friends={myFriends} toggleModal={toggleModal}/>
                </div>
              </div>
              <div className={styles.profileIcon}>
                <div
                  className={styles.smallProfileImage}
                  onClick={() =>
                    toggleModal("profileOptions")
                  }
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
                    src={
                      myProfile.ProfileImage ||
                      `${ReadyImagesURL}/noProfile.jpg`
                    }
                    alt=""
                  />
                  <h4>{myProfile.Email}</h4>
                </div>
                {profileOptions &&
                  profileOptions.map((option) => {
                    return (
                      <h4
                      key={option.name}
                        onClick={() =>
                          toggleModal("")
                        }
                      >
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
            </span>
          </>
        }
        notAuthorized={
          <span>
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/register")}>Register</button>
          </span>
        }
      />
    </nav>
  );
}
