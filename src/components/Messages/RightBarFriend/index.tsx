import "./style.scss";
import { profileDTO } from "../../../models/profiles.models";
import { ReadyImagesURL } from "../../../globals/appUrls";
import { useOpenedChatsContext } from "../../../services/Contexts/OpenedChatsContext";

export default function RightBarFriend({ friend }: FriendProps) {
  const { openedChats, setOpenedChats } = useOpenedChatsContext();
  function openChat() {
    if (!openedChats.includes(friend)) {
      const chats = [friend, ...openedChats];
      setOpenedChats(chats);
    }
  }
  return (
    <li data-testid="rightBarFriend" onClick={openChat}>
      <img
        data-testid="rightBarFriend-image"
        src={friend.ProfileImage || `${ReadyImagesURL}/noProfile.jpg`}
        alt=""
      />
      <span
        data-testid="rightBarFriend-email"
        className="medium-font"
      >
        {friend.Email}
      </span>
    </li>
  );
}

interface FriendProps {
  friend: profileDTO;
}
