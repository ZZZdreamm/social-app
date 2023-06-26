import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProfileContext, {
  OpenedChatsContext,
} from "../ZZZ_USEFUL COMPONENTS/Profile/ProfileContext";
import { ReadyImagesURL } from "../ZZZ_USEFUL COMPONENTS/appUrls";

export default function LeftBar() {
  const navigate = useNavigate();
  const { myProfile } = useContext(ProfileContext);
  const { openedChats, updateOpenedChats } = useContext(OpenedChatsContext);
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

  const fullBar = location.pathname == "/" && windowSize > 600 ? true : false;
  const smallPage = windowSize < 600 ? true : false;
  let barStyling;
  let elementsStyling;
  if (fullBar) {
    barStyling = {
      width: "20vw",
    };
  } else if (smallPage) {
    barStyling = {
      width: "10vw",
      backgroundColor: "white",
      boxShadow: "8px 0px 10px -12px rgba(0, 0, 0, 0.75)",
    };
    elementsStyling = {
      padding: "0.3rem 0.3rem",
    };
  } else {
    barStyling = {
      width: "5vw",
      backgroundColor: "white",
      boxShadow: "8px 0px 10px -12px rgba(0, 0, 0, 0.75)",
    };
    elementsStyling = {
      padding: "0.3rem 0.3rem",
    };
  }
  return (
    <nav className="bar bar-left" style={barStyling}>
      {myProfile && (
        <ul>
          <li style={elementsStyling} onClick={() => navigate(`/`)}>
            <img src={`${ReadyImagesURL}/homepage.png`} />
            {fullBar && <span className="medium-font">Home</span>}
          </li>
          <li
            style={elementsStyling}
            onClick={() => navigate(`user-profile/${myProfile.Id}`)}
          >
            <img
              src={myProfile.ProfileImage || `${ReadyImagesURL}/noProfile.jpg`}
            />
            {fullBar && <span className="medium-font">{myProfile.Email}</span>}
          </li>
          <li
            style={elementsStyling}
            onClick={() => navigate(`/user-friends/${myProfile.Id}`)}
          >
            <img src={`${ReadyImagesURL}/friends.png`} />
            {fullBar && <span className="medium-font">Friends</span>}
          </li>
          <li
            style={elementsStyling}
            onClick={() => navigate(`/user-friend-requests/${myProfile.Id}`)}
          >
            <img src={`${ReadyImagesURL}/goBackArrow.png`} />
            {fullBar && <span className="medium-font">Friend Requests</span>}
          </li>
          <li
            style={elementsStyling}
            onClick={() =>
              navigate(`/user-sent-friend-requests/${myProfile.Id}`)
            }
          >
            <img
              style={{ rotate: "180deg" }}
              src={`${ReadyImagesURL}/goBackArrow.png`}
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
            <img src={`${ReadyImagesURL}/messaging-only.png`} />
            {fullBar && <span className="medium-font">Messaging only</span>}
          </li>
        </ul>
      )}
    </nav>
  );
}
