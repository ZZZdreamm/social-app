import { profileDTO } from "../ZZZ_USEFUL COMPONENTS/Profile/profiles.models";
import GenericList from "../ZZZ_USEFUL COMPONENTS/Utilities/GenericList";
import Waiting from "../ZZZ_USEFUL COMPONENTS/Utilities/Waiting";
import Friend from "./Friend";

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
