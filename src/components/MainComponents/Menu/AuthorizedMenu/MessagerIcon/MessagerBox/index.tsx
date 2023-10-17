import "./style.scss";
import { useNavigate } from "react-router-dom";
import MessagerSearchTypeahead from "../../../../../MessageOnly/MessagerSearchTypeahead";
import { profileDTO } from "../../../../../../services/Models/profiles.models";
import { ProfileImage } from "../../../../../ProfileImage/ProfileImage";
import { useProfilesRelationsContext } from "../../../../../../services/Contexts/ProfileDataContext";
import { useOpenedChatsContext } from "../../../../../../services/Contexts/OpenedChatsContext";
import { useAuthenticationContext } from "../../../../../../services/Contexts/AuthenticationContext";
import { UserSearchTypeaheadd } from "../../../../../userSearchTypeahead/UserSearchTypeahead";
import { searchFriends } from "../../../../../../apiFunctions/searchFriends";
import MessagerSearchOption from "../../../../../MessageOnly/MessagerSearchOption";

interface MessagerBoxProps {
  friends: profileDTO[] | undefined;
  toggleModal: () => void;
}

export default function MessagerBox({
  friends,
  toggleModal,
}: MessagerBoxProps) {
  const navigate = useNavigate();
  const { profile } = useAuthenticationContext();
  const { openedChats, setOpenedChats } = useOpenedChatsContext();

  function addNewChat(profile: profileDTO) {
    toggleModal();

    if (openedChats?.find((x) => x.Id === profile.Id)) return;
    //@ts-ignore
    setOpenedChats((openedChats: profileDTO[]) => [...openedChats, profile]);
  }

  const handleSearch = async (query: string) => {
    const friends = await searchFriends(query, profile?.Id);
    return friends;
  };

  function typeaheadChildren(profile: profileDTO): React.ReactElement {
    return (
      <MessagerSearchOption
        userProfile={profile}
        setChoosenFriend={addNewChat}
      />
    );
  }
  return (
    <div className="messagerBox">
      <section className="messagerBox__body">
        <div className="messagerBox__header">
          <div className="messagerBox__header__title">
            <h3>Chats</h3>
          </div>
          <div className="messagerBox__header__search">
            {/* <MessagerSearchTypeahead setChoosenFriend={addNewChat} /> */}
            <UserSearchTypeaheadd
              onSearch={handleSearch}
              searchOption={typeaheadChildren}
              expand={false}
            />
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
