import "./style.scss";
import { useNavigate } from "react-router-dom";
import { profileDTO } from "../../../models/profiles.models";

import { ReadyImagesURL } from "../../../globals/appUrls";
import MessagerChat from "../MessagerChat";
import MessagerFriendIcon from "../MessagerFriendIcon";
import MessagerMobileFriend from "../MessagerMobileFriend";
import MessagerSearchTypeahead from "../MessagerSearchTypeahead";
import { useProfilesRelationsContext } from "../../../services/Contexts/ProfileDataContext";

interface MobileMessagerProps {
  setChoosenFriend: (profile: profileDTO | undefined) => void;
  choosenFriend: profileDTO | undefined;
}

export default function MobileMessager({
  setChoosenFriend,
  choosenFriend,
}: MobileMessagerProps) {
  const navigate = useNavigate();
  const { friends } = useProfilesRelationsContext();
  return (
    <>
      <div className="messager-mobile-header flex">
        <img
          src={`${ReadyImagesURL}/goBackArrow.png`}
          onClick={() => navigate("/")}
          alt=""
        />
        <h3 className="very-large-font">Chats</h3>
      </div>
      <div className="messager-mobile-options">
        <MessagerSearchTypeahead setChoosenFriend={setChoosenFriend} />
        {friends && (
          <div className="messager-mobile-options-friends">
            {friends.map((friend) => (
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
        {friends &&
          friends.map((friend) => (
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
            fullScreen={true}
            setChoosenFriend={setChoosenFriend}
          />
        </div>
      )}
    </>
  );
}
