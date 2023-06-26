import { useNavigate } from "react-router-dom";
import { profileDTO } from "../ZZZ_USEFUL COMPONENTS/Profile/profiles.models";
import { ReadyImagesURL } from "../ZZZ_USEFUL COMPONENTS/appUrls";
import { useContext } from "react";
import { OpenedChatsContext } from "../ZZZ_USEFUL COMPONENTS/Profile/ProfileContext";

export default function RightBarFriend({ friend }: FriendProps) {
  const {openedChats, updateOpenedChats} = useContext(OpenedChatsContext)
  function openChat(){
    if(!openedChats.includes(friend)){
      const chats = [friend, ...openedChats]
      updateOpenedChats(chats)
    }
  }
  return (
    <li onClick={openChat}>
      <img src={friend.ProfileImage || `${ReadyImagesURL}/noProfile.jpg`} />
      <span className="medium-font">{friend.Email}</span>
    </li>
  );
}

interface FriendProps {
  friend: profileDTO;
}
