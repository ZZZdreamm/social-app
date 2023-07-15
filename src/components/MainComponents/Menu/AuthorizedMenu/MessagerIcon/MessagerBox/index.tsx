import { useContext } from "react";
import UserSearchTypeahead from "../../../../../Users/UserSearchTypeahead";
import { profileDTO } from "../../../../../../ZZZ_USEFUL COMPONENTS/Profile/profiles.models";
import "./style.scss";
import ProfileContext, {
  OpenedChatsContext,
} from "../../../../../../services/Contexts/ProfileContext";
import { ReadyImagesURL } from "../../../../../../globals/appUrls";
import { useNavigate } from "react-router-dom";
import MessagerSearchTypeahead from "../../../../../MessageOnly/MessagerSearchTypeahead";

interface MessagerBoxProps {
  friends: profileDTO[] | undefined;
  toggleModal: (modalName: string) => void;
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
    toggleModal("messager");

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
          {friends?.map((friend) => (
            <div
              key={friend.Id}
              className="messagerBox__body__friends__friend"
              onClick={() => addNewChat(friend)}
            >
              <img
                src={friend.ProfileImage || `${ReadyImagesURL}/noProfile.jpg`}
                alt=""
              />
              <span>{friend.Email}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="messagerBox__footer">
        <div className="messagerBox__footer__title">
          <h4
            onClick={() => {
              toggleModal("messager");
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
