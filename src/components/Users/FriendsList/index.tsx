import "./style.scss";

import Friend from "../Friend";
import GenericList from "../../../_utils/GenericList/GenericList";
import Waiting from "../../../_utils/Waiting/indexxx";
import { profileDTO } from "../../../services/Models/profiles.models";

export default function FriendsList({ friends }: FriendsListProps) {
  return (
    <GenericList list={friends} emptyListUI={<>You don't have friends</>}>
      <div className="listOfFriends">
        {friends ? (
          friends.map((friend) => <Friend friend={friend} key={friend.Id} />)
        ) : (
          <Waiting message="Loading" />
        )}
      </div>
    </GenericList>
  );
}

interface FriendsListProps {
  friends: profileDTO[] | undefined;
}
