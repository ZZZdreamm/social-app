import "./style.scss";
import GenericList from "../../../_utils/GenericList/GenericList";
import Waiting from "../../../_utils/Waiting/indexxx";
import Friend from "../Friend";
import FriendRequest from "../FriendRequest";
import { profileDTO } from "../../../services/Models/profiles.models";

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
