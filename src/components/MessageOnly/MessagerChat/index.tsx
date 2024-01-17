import { profileDTO } from "../../../models/profiles.models";
import "./style.scss";

import { ReadyImagesURL } from "../../../globals/appUrls";
import ChatWithFriend from "../../Messages/ChatWithFriend";

interface MessagerChatProps {
  friend: profileDTO;
  setChoosenFriend: (profile: profileDTO | undefined) => void;
  fullScreen?: boolean;
}

export default function MessagerChat({
  friend,
  setChoosenFriend,
  fullScreen,
}: MessagerChatProps) {
  const chatSize = fullScreen ? { width: "100%" } : {};

  const closer = fullScreen ? (
    <img
      className="chat-header-userProfile-image"
      style={{ marginRight: "1rem" }}
      src={`${ReadyImagesURL}/goBackArrow.png`}
      onClick={() => setChoosenFriend(undefined)}
      alt=""
    />
  ) : undefined;
  return (
    <section className="messager-chat" style={chatSize}>
      {friend && (
        <ChatWithFriend
          key={friend.Id}
          friend={friend}
          chatInMessager={true}
          smallChatClose={closer}
        />
      )}
    </section>
  );
}
