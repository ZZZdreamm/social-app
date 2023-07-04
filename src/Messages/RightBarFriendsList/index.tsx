import { profileDTO } from "../../ZZZ_USEFUL COMPONENTS/Profile/profiles.models";
import GenericList from "../../ZZZ_USEFUL COMPONENTS/Utilities/GenericList";
import Waiting from "../../ZZZ_USEFUL COMPONENTS/Utilities/Waiting/indexxx";
import RightBarFriend from "../RightBarFriend";
import "./style.scss";

export default function RightBarFriendsList({ friends }: FriendsListProps) {
  return (
    <GenericList list={friends} emptyListUI={<>You don't have friends. Add some</>}>
      <div className="listOfPosts">
        {friends ? (
          friends.map((friend) => (
            <RightBarFriend friend={friend} key={friend.Id} />
          ))
        ) : (
          <Waiting message="Loading" />
        )}
      </div>
    </GenericList>
  );
}

interface FriendsListProps {
  friends: profileDTO[];
}
