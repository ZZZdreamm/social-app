import "./style.scss";
import { profileDTO } from "../../ZZZ_USEFUL COMPONENTS/Profile/profiles.models";
import GenericList from "../../ZZZ_USEFUL COMPONENTS/Utilities/GenericList";
import Waiting from "../../ZZZ_USEFUL COMPONENTS/Utilities/Waiting/indexxx";
import Friend from "../Friend";
import FriendRequest from "../FriendRequest";

export default function FriendRequestsList({ friends, sent }: FriendsRequestsListProps) {
  return (
    <GenericList list={friends} emptyListUI={<>You don't have friend requests</>}>
      <div className="listOfFriendRequests">
        {friends ? (
          friends.map((friend) => <FriendRequest sent={sent} friend={friend} key={friend.Id} />)
        ) : (
          <Waiting message="Loading" />
        )}
      </div>
    </GenericList>
  );
}

interface FriendsRequestsListProps {
  friends: profileDTO[] | undefined;
  sent:boolean;
}
