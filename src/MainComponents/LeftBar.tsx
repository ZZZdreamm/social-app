import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProfileContext from "../ZZZ_USEFUL COMPONENTS/Profile/ProfileContext";
import { ReadyImagesURL } from "../ZZZ_USEFUL COMPONENTS/appUrls";

export default function LeftBar() {
  const navigate = useNavigate();
  const { myProfile } = useContext(ProfileContext);
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
    };
    elementsStyling = {
      padding: "0.3rem 0.3rem",
      justifyContent: "center",
    };
  } else {
    barStyling = {
      width: "5vw",
    };
    elementsStyling = {
      padding: "0.3rem 0.3rem",
      justifyContent: "center",
    };
  }
  return (
    <>
      <div className="bar bar-left" style={barStyling}>
        {myProfile && (
          <ul>
            <li
              style={elementsStyling}
              onClick={() => navigate(`user-profile/${myProfile.Id}`)}
            >
              <img
                src={
                  myProfile.ProfileImage || `${ReadyImagesURL}/noProfile.jpg`
                }
              />
              {fullBar && <span>{myProfile.Email}</span>}
            </li>
            <li
              style={elementsStyling}
              onClick={() => navigate(`/user-friends/${myProfile.Id}`)}
            >
              <img src={`${ReadyImagesURL}/friends.png`} />
              {fullBar && <span>Friends</span>}
            </li>
            <li
              style={elementsStyling}
              onClick={() => navigate(`/user-friend-requests/${myProfile.Id}`)}
            >
              <img src={`${ReadyImagesURL}/goBackArrow.png`} />
              {fullBar && <span>Friend Requests</span>}
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
              {fullBar && <span>Sent Friend Requests</span>}
            </li>
          </ul>
        )}
      </div>
    </>
  );
}
