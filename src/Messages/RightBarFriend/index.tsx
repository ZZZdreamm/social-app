import "./style.scss";
import { useContext } from "react";
import { OpenedChatsContext } from "../../Contexts/ProfileContext";
import { profileDTO } from "../../ZZZ_USEFUL COMPONENTS/Profile/profiles.models";
import { ReadyImagesURL } from "../../ZZZ_USEFUL COMPONENTS/appUrls";

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
