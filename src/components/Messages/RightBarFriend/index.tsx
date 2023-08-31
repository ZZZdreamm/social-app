import "./style.scss";
import { useContext } from "react";
import { OpenedChatsContext } from "../../../services/Contexts/ProfileContext";
import { profileDTO } from "../../../services/Models/profiles.models";

import { ReadyImagesURL } from "../../../globals/appUrls";

export default function RightBarFriend({ friend }: FriendProps) {
  const {openedChats, updateOpenedChats} = useContext(OpenedChatsContext)
  function openChat(){
    if(!openedChats.includes(friend)){
      const chats = [friend, ...openedChats]
      updateOpenedChats(chats)
    }
  }
  return (
    <li data-testid="rightBarFriend" onClick={openChat}>
      <img data-testid="rightBarFriend-image" src={friend.ProfileImage || `${ReadyImagesURL}/noProfile.jpg`} alt=""/>
      <span data-testid="rightBarFriend-email" className="medium-font">{friend.Email}</span>
    </li>
  );
}

interface FriendProps {
  friend: profileDTO;
}
