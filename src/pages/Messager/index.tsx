import "./style.scss";

import { useEffect, useState } from "react";
import { ReadyImagesURL } from "../../globals/appUrls";
import MessagerChat from "../../components/MessageOnly/MessagerChat";
import MessagerFriendList from "../../components/MessageOnly/MessagerFriendList";
import MessagerSearchTypeahead from "../../components/MessageOnly/MessagerSearchTypeahead";
import MobileMessager from "../../components/MessageOnly/MobileMessager/MobileMessager";
import { profileDTO } from "../../services/Models/profiles.models";
import Portal from "../../_utils/Portal/Portal";
import { useProfilesRelationsContext } from "../../services/Contexts/ProfileDataContext";
import { useAuthenticationContext } from "../../services/Contexts/AuthenticationContext";
import { LogoIcon } from "../../_utils/logoIcon/LogoIcon";

export default function Messager() {
  const [choosenFriend, setChoosenFriend] = useState<profileDTO>();
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const { friends } = useProfilesRelationsContext();
  const { profile } = useAuthenticationContext();

  const mobile = windowSize < 600 ? true : false;

  useEffect(() => {
    if (!friends) return;
    if (mobile) return;
    setChoosenFriend(friends[0]);
  }, [friends, mobile]);

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
                <img src={`${ReadyImagesURL}/messaging-only.png`} alt="" />
                <img src={profile?.ProfileImage} alt="" />
              </span>
            </nav>
            <span id="go-to-app">
              <LogoIcon />
            </span>
            <article className="messager-content">
              <section className="messager-friends">
                <h2>Chats</h2>
                <MessagerSearchTypeahead setChoosenFriend={setChoosenFriend} />
                <MessagerFriendList
                  friends={friends}
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
