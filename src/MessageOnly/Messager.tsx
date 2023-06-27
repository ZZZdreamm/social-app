import { useContext, useEffect, useState } from "react";
import ProfileContext, {
  ProfileFriendsContext,
} from "../ZZZ_USEFUL COMPONENTS/Profile/ProfileContext";
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
import MobileMessager from "./MobileMessager";
import MessagerFriendList from "./MessagerFriendList";

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
                <img src={`${ReadyImagesURL}/messaging-only.png`} />
                <img src={myProfile.ProfileImage} />
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
