import { profileDTO } from "../../../models/profiles.models";
import GenericList from "../../../_utils/GenericList/GenericList";
import Waiting from "../../../_utils/Waiting/indexxx";


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
