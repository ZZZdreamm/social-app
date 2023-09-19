import { useContext } from "react";
import UserSearchTypeahead from "../../../../../Users/UserSearchTypeahead";

import "./style.scss";
import ProfileContext, {
  OpenedChatsContext,
} from "../../../../../../services/Contexts/ProfileContext";
import { ReadyImagesURL } from "../../../../../../globals/appUrls";
import { useNavigate } from "react-router-dom";
import MessagerSearchTypeahead from "../../../../../MessageOnly/MessagerSearchTypeahead";
import { profileDTO } from "../../../../../../services/Models/profiles.models";
import { ProfileImage } from "../../../../../ProfileImage/ProfileImage";

interface MessagerBoxProps {
  friends: profileDTO[] | undefined;
  toggleModal: () => void;
}

export default function MessagerBox({
  friends,
  toggleModal,
}: MessagerBoxProps) {
  const navigate = useNavigate();
  const {
    myProfile: { Id: myID },
  } = useContext(ProfileContext);
  const { openedChats, updateOpenedChats } = useContext(OpenedChatsContext);

  function addNewChat(profile: profileDTO) {
    toggleModal();

    if (openedChats?.find((x) => x.Id === profile.Id)) return;
    //@ts-ignore
    updateOpenedChats((openedChats: profileDTO[]) => [...openedChats, profile]);
  }
  return (
    <div className="messagerBox">
      <section className="messagerBox__body">
        <div className="messagerBox__header">
          <div className="messagerBox__header__title">
            <h3>Chats</h3>
          </div>
          <div className="messagerBox__header__search">
            <MessagerSearchTypeahead setChoosenFriend={addNewChat} />
          </div>
        </div>
        <div className="messagerBox__body__friends">
          {friends &&
            friends.length > 0 &&
            friends?.map((friend) => (
              <div
                key={friend.Id}
                className="messagerBox__body__friends__friend"
                onClick={() => addNewChat(friend)}
              >
                {/* <img
                src={friend.ProfileImage || `${ReadyImagesURL}/noProfile.jpg`}
                alt=""
              /> */}
                <ProfileImage imageURL={friend.ProfileImage} />
                <span>{friend.Email}</span>
              </div>
            ))}
        </div>
      </section>
      <section className="messagerBox__footer">
        <div className="messagerBox__footer__title">
          <h4
            onClick={() => {
              toggleModal();
              navigate(`/messaging-only/${myID}`);
            }}
          >
            Show all chats
          </h4>
        </div>
      </section>
    </div>
  );
}
