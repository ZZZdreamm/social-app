import "./style.scss";
import { useNavigate } from "react-router-dom";
import MessagerSearchTypeahead from "../../../../../MessageOnly/MessagerSearchTypeahead";
import { profileDTO } from "../../../../../../services/Models/profiles.models";
import { ProfileImage } from "../../../../../ProfileImage/ProfileImage";
import { useProfilesRelationsContext } from "../../../../../../services/Contexts/ProfileDataContext";
import { useOpenedChatsContext } from "../../../../../../services/Contexts/OpenedChatsContext";

interface MessagerBoxProps {
  friends: profileDTO[] | undefined;
  toggleModal: () => void;
}

export default function MessagerBox({
  friends,
  toggleModal,
}: MessagerBoxProps) {
  const navigate = useNavigate();
  const { profile } = useProfilesRelationsContext();
  const { openedChats, setOpenedChats } = useOpenedChatsContext();

  function addNewChat(profile: profileDTO) {
    toggleModal();

    if (openedChats?.find((x) => x.Id === profile.Id)) return;
    //@ts-ignore
    setOpenedChats((openedChats: profileDTO[]) => [...openedChats, profile]);
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
              navigate(`/messaging-only/${profile?.Id}`);
            }}
          >
            Show all chats
          </h4>
        </div>
      </section>
    </div>
  );
}
