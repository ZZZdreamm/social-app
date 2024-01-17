import uuid4 from "uuid4";
import { ReadyImagesURL } from "../../../globals/appUrls";
import { ProfileImage } from "../../ProfileImage/ProfileImage";
import { openCallWindow } from "../../WebRTC/CallFunctions";
import { useNavigate } from "react-router-dom";
import { useAuthenticationContext } from "../../../services/Contexts/AuthenticationContext";
import { useOpenedChatsContext } from "../../../services/Contexts/OpenedChatsContext";
import { FriendProps } from ".";
import { socket } from "../../../globals/constants";

interface ChatHeaderProps extends FriendProps {
  smallChatClose?: JSX.Element | undefined;
  chatInMessager?: boolean;
}

export const ChatHeader = ({
  friend,
  chatInMessager,
  smallChatClose,
}: ChatHeaderProps) => {
  const navigate = useNavigate();
  const { profile } = useAuthenticationContext();
  const { openedChats, setOpenedChats } = useOpenedChatsContext();
  const image = friend.ProfileImage || `${ReadyImagesURL}/noProfile.jpg`;

  function closeChat() {
    const chats = openedChats.filter((chat) => chat.Id !== friend.Id);
    setOpenedChats(chats);
  }
  function callFriend() {
    const roomId = uuid4();
    socket.emit("create-join-room", {
      myId: profile?.Id,
      friendId: friend.Id,
      roomId: roomId,
    });
    openCallWindow(profile!, friend, roomId, "caller");
  }
  const goToProfile = () => {
    navigate(`/user-profile/${friend.Id}`);
  };
  return (
    <div id={`chat-header/${friend.Id}`} className="chat-header">
      {<>{smallChatClose}</>}
      <span className="chat-header-userProfile">
        <ProfileImage imageURL={image} onClick={goToProfile} />
        <span className="chat-header-userProfile-name">{friend.Email}</span>
      </span>
      <img
        className="chat-header-call"
        src={`${ReadyImagesURL}/video-call.png`}
        onClick={callFriend}
        alt=""
      />
      {!chatInMessager && (
        <img
          data-testid="chatWithFriend-closeChat"
          className="chat-header-close"
          src={`${ReadyImagesURL}/close.png`}
          onClick={closeChat}
          alt=""
        />
      )}
    </div>
  );
};
