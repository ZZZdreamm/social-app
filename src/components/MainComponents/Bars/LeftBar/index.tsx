import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReadyImagesURL } from "../../../../globals/appUrls";
import "./style.scss";
import "../style.scss";
import { ProfileImage } from "../../../ProfileImage/ProfileImage";
import { useOpenedChatsContext } from "../../../../services/Contexts/OpenedChatsContext";
import { useAuthenticationContext } from "../../../../services/Contexts/AuthenticationContext";
import { HomePageIcon } from "assets/icons/HomePageIcon";
import { FriendsIcon } from "assets/icons/FriendsIcon";
import { GoBackArrowIcon } from "assets/icons/GoBackArrowIcon";
import { MessagingOnlyIcon } from "assets/icons/MessagingOnlyIcon";

export default function LeftBar() {
  const navigate = useNavigate();
  const { profile } = useAuthenticationContext();
  const { setOpenedChats } = useOpenedChatsContext();
  const location = useLocation();
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowSize(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setWindowSize(window.innerWidth);
  }, [window.innerWidth]);

  const fullBar = location.pathname == "/" && windowSize > 700 ? true : false;
  const smallPage = windowSize < 700 ? true : false;
  let barStyling = {};
  let elementsStyling;
  if (fullBar) {
    barStyling = {};
  } else if (smallPage) {
    barStyling = {
      backgroundColor: "var(--navColor)",
      boxShadow: "8px 0px 10px -12px var(--typicalShadow)",
    };
    elementsStyling = {
      padding: "0.3rem 0.3rem",
    };
  } else {
    barStyling = {
      backgroundColor: "var(--navColor)",
      boxShadow: "8px 0px 10px -12px var(--typicalShadow)",
    };
    elementsStyling = {
      padding: "0.3rem 0.3rem",
    };
  }
  return (
    <>
      {!location.pathname.includes("reels") && (
        <nav className="bar bar-left" style={barStyling}>
          {profile && (
            <ul>
              <li
                style={elementsStyling}
                onClick={() => {
                  navigate(`/`);
                }}
              >
                {location.pathname == "/" && (
                  <div className="bar-left__active"></div>
                )}
                {/* <img src={`${ReadyImagesURL}/homepage.png`} alt="" /> */}
                <HomePageIcon size="2.4rem" />
                {fullBar && <span className="medium-font">Home</span>}
              </li>
              <li
                style={elementsStyling}
                onClick={() => {
                  navigate(`user-profile/${profile.Id}`);
                }}
              >
                {location.pathname.includes("user-profile") && (
                  <div className="bar-left__active"></div>
                )}
                <ProfileImage imageURL={profile.ProfileImage} />
                {fullBar && (
                  <span className="medium-font">{profile.Email}</span>
                )}
              </li>
              <li
                style={elementsStyling}
                onClick={() => {
                  navigate(`/user-friends/${profile.Id}`);
                }}
              >
                {location.pathname.includes("user-friends") && (
                  <div className="bar-left__active"></div>
                )}

                <FriendsIcon size="2.4rem" />
                {fullBar && <span className="medium-font">Friends</span>}
              </li>
              <li
                style={elementsStyling}
                onClick={() => {
                  navigate(`/user-friend-requests/${profile.Id}`);
                }}
              >
                {location.pathname.includes("user-friend-requests") && (
                  <div className="bar-left__active"></div>
                )}

                <GoBackArrowIcon size="2.4rem" color="reverseToNavColor" />
                {fullBar && (
                  <span className="medium-font">Friend Requests</span>
                )}
              </li>
              <li
                style={elementsStyling}
                onClick={() => {
                  navigate(`/user-sent-friend-requests/${profile.Id}`);
                }}
              >
                {location.pathname.includes("user-sent-friend-requests") && (
                  <div className="bar-left__active"></div>
                )}

                <GoBackArrowIcon
                  size="2.4rem"
                  rotation="180"
                  color="reverseToNavColor"
                />
                {fullBar && (
                  <span className="medium-font">Sent Friend Requests</span>
                )}
              </li>
              <li
                style={elementsStyling}
                onClick={() => {
                  setOpenedChats([]);
                  navigate(`/messaging-only/${profile.Id}`);
                }}
              >
                <MessagingOnlyIcon size="2.4rem" />
                {fullBar && <span className="medium-font">Messaging only</span>}
              </li>
            </ul>
          )}
        </nav>
      )}
    </>
  );
}
