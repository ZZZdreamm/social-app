import "./style.scss";
import { useRef, useState } from "react";
import { messageResponseDTO } from "../../../services/Models/message.models";
import { profileDTO } from "../../../services/Models/profiles.models";
import { ChatHeader } from "./ChatHeader";
import { ChatBody } from "./ChatBody";
import { ChatFooter } from "./ChatFooter";

interface ChatWithFriendProps {
  friend: profileDTO;
  chatInMessager?: boolean;
  smallChatClose?: JSX.Element | undefined;
}

export default function ChatWithFriend({
  friend,
  chatInMessager,
  smallChatClose,
}: ChatWithFriendProps) {
  const [respondTo, setRespondTo] = useState<messageResponseDTO>();
  const newestMessagesRef = useRef<HTMLElement | null>(null);

  return (
    <section
      id={`chat/${friend.Id}`}
      className="chat"
      data-testid="chatWithFriend"
    >
      <ChatHeader
        friend={friend}
        chatInMessager={chatInMessager}
        smallChatClose={smallChatClose}
      />
      <ChatBody
        friend={friend}
        setRespondTo={setRespondTo}
        newestMessagesRef={newestMessagesRef}
      />
      <ChatFooter
        friend={friend}
        newestMessagesRef={newestMessagesRef}
        respondTo={respondTo}
        setRespondTo={setRespondTo}
      />
    </section>
  );
}

export interface FriendProps {
  friend: profileDTO;
}
