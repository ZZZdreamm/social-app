import "./style.scss";

import { useContext, useEffect, useState } from "react";
import ProfileContext, {
  ProfileFriendsContext,
} from "../../services/Contexts/ProfileContext";
import { ReadyImagesURL } from "../../globals/appUrls";
import MessagerChat from "../../components/MessageOnly/MessagerChat";
import MessagerFriendList from "../../components/MessageOnly/MessagerFriendList";
import MessagerSearchTypeahead from "../../components/MessageOnly/MessagerSearchTypeahead";
import MobileMessager from "../../components/MessageOnly/MobileMessager/MobileMessager";
import ChatWithFriend from "../../components/Messages/ChatWithFriend";
import { profileDTO } from "../../services/Models/profiles.models";
import GoToMenuButton from "../../_utils/GoToMenuButton";
import Portal from "../../_utils/Portal/Portal";

export default function Messager() {
  const { myFriends } = useContext(ProfileFriendsContext);
  const [choosenFriend, setChoosenFriend] = useState<profileDTO>();
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const { myProfile } = useContext(ProfileContext);

  const mobile = windowSize < 600 ? true : false;

  useEffect(() => {
    if (!myFriends) return;
    if (mobile) return;
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
          <MobileMessager
            setChoosenFriend={setChoosenFriend}
            choosenFriend={choosenFriend}
          />
        ) : (
          <>
            <nav className="messager-nav">
              <span>
                <img src={`${ReadyImagesURL}/messaging-only.png`} alt=""/>
                <img src={myProfile.ProfileImage} alt=""/>
              </span>
            </nav>
            <span id="go-to-app">
              <GoToMenuButton appName={"FriendLink"} />
            </span>
            <article className="messager-content">
              <section className="messager-friends">
                <h2>Chats</h2>
                <MessagerSearchTypeahead setChoosenFriend={setChoosenFriend} />
                <MessagerFriendList
                  friends={myFriends}
                  setChoosenFriend={setChoosenFriend}
                />
              </section>
              {choosenFriend && (
                <MessagerChat
                  friend={choosenFriend}
                  fullScreen={false}
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
