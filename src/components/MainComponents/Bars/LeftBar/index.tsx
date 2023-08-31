import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProfileContext, {
  OpenedChatsContext,
} from "../../../../services/Contexts/ProfileContext";
import { ReadyImagesURL } from "../../../../globals/appUrls";

import "./style.scss";
import "../style.scss";
import { ProfileImage } from "../../../ProfileImage/ProfileImage";

export default function LeftBar() {
  const navigate = useNavigate();
  const { myProfile } = useContext(ProfileContext);
  const { updateOpenedChats } = useContext(OpenedChatsContext);
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
  let barStyling;
  let elementsStyling;
  if (fullBar) {
    barStyling = {
      width: "20vw",
    };
  } else if (smallPage) {
    barStyling = {
      width: "10vw",
      backgroundColor: "var(--navColor)",
      boxShadow: "8px 0px 10px -12px var(--typicalShadow)",
    };
    elementsStyling = {
      padding: "0.3rem 0.3rem",
    };
  } else {
    barStyling = {
      width: "5vw",
      backgroundColor: "var(--navColor)",
      boxShadow: "8px 0px 10px -12px var(--typicalShadow)",
    };
    elementsStyling = {
      padding: "0.3rem 0.3rem",
    };
  }
  return (
    <nav className="bar bar-left" style={barStyling}>
      {myProfile && (
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
            <img src={`${ReadyImagesURL}/homepage.png`} alt="" />
            {fullBar && <span className="medium-font">Home</span>}
          </li>
          <li
            style={elementsStyling}
            onClick={() => {
              navigate(`user-profile/${myProfile.Id}`);
            }}
          >
            {location.pathname.includes("user-profile") && (
              <div className="bar-left__active"></div>
            )}
            {/* <img
              src={myProfile.ProfileImage || `${ReadyImagesURL}/noProfile.jpg`}
              alt=""
            /> */}
            <ProfileImage imageURL={myProfile.ProfileImage} />
            {fullBar && <span className="medium-font">{myProfile.Email}</span>}
          </li>
          <li
            style={elementsStyling}
            onClick={() => {
              navigate(`/user-friends/${myProfile.Id}`);
            }}
          >
            {location.pathname.includes("user-friends") && (
              <div className="bar-left__active"></div>
            )}

            <img src={`${ReadyImagesURL}/friends.png`} alt="" />
            {fullBar && <span className="medium-font">Friends</span>}
          </li>
          <li
            style={elementsStyling}
            onClick={() => {
              navigate(`/user-friend-requests/${myProfile.Id}`);
            }}
          >
            {location.pathname.includes("user-friend-requests") && (
              <div className="bar-left__active"></div>
            )}

            <img src={`${ReadyImagesURL}/goBackArrow.png`} alt="" />
            {fullBar && <span className="medium-font">Friend Requests</span>}
          </li>
          <li
            style={elementsStyling}
            onClick={() => {
              navigate(`/user-sent-friend-requests/${myProfile.Id}`);
            }}
          >
            {location.pathname.includes("user-sent-friend-requests") && (
              <div className="bar-left__active"></div>
            )}

            <img
              style={{ rotate: "180deg" }}
              src={`${ReadyImagesURL}/goBackArrow.png`}
              alt=""
            />
            {fullBar && (
              <span className="medium-font">Sent Friend Requests</span>
            )}
          </li>
          <li
            style={elementsStyling}
            onClick={() => {
              updateOpenedChats([]);
              navigate(`/messaging-only/${myProfile.Id}`);
            }}
          >
            <img src={`${ReadyImagesURL}/messaging-only.png`} alt="" />
            {fullBar && <span className="medium-font">Messaging only</span>}
          </li>
        </ul>
      )}
    </nav>
  );
}
