import { useContext, useEffect, useState } from "react";
import { ProfileFriendsContext } from "../ZZZ_USEFUL COMPONENTS/Profile/ProfileContext";
import SearchTypeahead from "../ZZZ_USEFUL COMPONENTS/Utilities/SearchTypeahead";
import MessagerSearchTypeahead from "./MessagerSearchTypeahead";
import MessagerFriend from "./MessagerFriend";
import Portal from "../ZZZ_USEFUL COMPONENTS/Utilities/Portal";
import GoToMenuButton from "../ZZZ_USEFUL COMPONENTS/Utilities/GoToMenuButton";
import { profileDTO } from "../ZZZ_USEFUL COMPONENTS/Profile/profiles.models";
import { ReadyImagesURL } from "../ZZZ_USEFUL COMPONENTS/appUrls";
import ChatWithFriend from "../Messages/ChatWithFriend";
import MessagerChat from "./MessagerChat";
import SmallChat from "./SmallChat";
import { useNavigate } from "react-router-dom";
import MessagerFriendIcon from "./MessagerFriendIcon";
import MessagerMobileFriend from "./MessagerMobileFriend";

export default function Messager() {
  const { myFriends } = useContext(ProfileFriendsContext);
  const navigate = useNavigate();
  const [choosenFriend, setChoosenFriend] = useState<profileDTO>();
  const [windowSize, setWindowSize] = useState(window.innerWidth);


  const mobile = windowSize < 600 ? true : false;

  useEffect(() => {
    if (!myFriends) return;
    if(mobile) return;
    setChoosenFriend(myFriends[0]);
  }, [myFriends, mobile]);

  useEffect(() => {
    function handleResize() {
      setWindowSize(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setWindowSize(window.innerWidth);
  }, [window.innerWidth]);


  return (
    <Portal>
      <div id="messager">
        {mobile ? (
          <>
            <div className="messager-mobile-header flex-center">
              <img
                src={`${ReadyImagesURL}/goBackArrow.png`}
                onClick={() => navigate("/")}
              />
              <h3>Chats</h3>
            </div>
            <div className="messager-mobile-options">
              <MessagerSearchTypeahead setChoosenFriend={setChoosenFriend} />
              {myFriends && (
                <div className="messager-mobile-options-friends">
                  {myFriends.map((friend) => (
                    <MessagerFriendIcon
                      key={friend.Id}
                      profile={friend}
                      setChoosenFriend={setChoosenFriend}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="messager-mobile-body">
              {myFriends &&
                myFriends.map((friend) => (
                  <MessagerMobileFriend
                    key={friend.Id}
                    profile={friend}
                    setChoosenFriend={setChoosenFriend}
                  />
                ))}
            </div>
            <div className="messager-mobile-footer"></div>
            {choosenFriend && (
              <div className="whole-page">
                <MessagerChat
                  friend={choosenFriend}
                  fullScreen={mobile}
                  setChoosenFriend={setChoosenFriend}
                />
              </div>
            )}
          </>
        ) : (
          <>
            <nav className="messager-nav">
              <img src={`${ReadyImagesURL}/messaging-only.png`} />
            </nav>
            <span id="go-to-app">
              <GoToMenuButton appName={"FriendLink"} />
            </span>
            <article className="messager-content">
              <section className="messager-friends">
                <h2>Chats</h2>
                <MessagerSearchTypeahead setChoosenFriend={setChoosenFriend} />
                {myFriends &&
                  myFriends.map((friend) => (
                    <MessagerFriend
                      key={friend.Id}
                      profile={friend}
                      setChoosenFriend={setChoosenFriend}
                    />
                  ))}
              </section>
              {choosenFriend && (
                <MessagerChat
                  friend={choosenFriend}
                  fullScreen={mobile}
                  setChoosenFriend={setChoosenFriend}
                />
              )}
            </article>
          </>
        )}
      </div>
    </Portal>
  );
}
