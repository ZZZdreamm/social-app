import { profileDTO } from "../../../services/Models/profiles.models";

import ChatWithFriend from "../ChatWithFriend";
import "./style.scss"

export default function OpenedChats({ openedChats }: openedChatsProps) {
  return (
      <div className="listOfOpenedChats">
        {openedChats && openedChats.map((friend) => (
          <ChatWithFriend key={friend.Id} friend={friend} />
        ))}
      </div>
  );
}
interface openedChatsProps {
  openedChats: profileDTO[];
}
