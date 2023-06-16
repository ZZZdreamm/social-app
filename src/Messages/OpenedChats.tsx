import { profileDTO } from "../ZZZ_USEFUL COMPONENTS/Profile/profiles.models";
import ChatWithFriend from "./ChatWithFriend";

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
