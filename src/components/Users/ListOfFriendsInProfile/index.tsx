import "./style.scss";

import FriendInProfile from "../FriendInProfile";
import { profileDTO } from "../../../services/Models/profiles.models";
import GenericList from "../../../_utils/GenericList/GenericList";
import Waiting from "../../../_utils/Waiting/indexxx";

export default function ListOfFriendsInProfile({ friends }: FriendsListProps) {
  return (
    <GenericList list={friends} emptyListUI={<>You don't have friends.</>}>
      <div
        className="listOfFriendsInProfile"
        style={{ gap: "1rem", flexDirection: "row" }}
      >
        {friends ? (
          friends.map((friend) => (
            <FriendInProfile friend={friend} key={friend.Id} />
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
