import "./style.scss";
import { profileDTO } from "../../ZZZ_USEFUL COMPONENTS/Profile/profiles.models";
import GenericList from "../../ZZZ_USEFUL COMPONENTS/Utilities/GenericList";
import Waiting from "../../ZZZ_USEFUL COMPONENTS/Utilities/Waiting/indexxx";
import FriendInProfile from "../FriendInProfile";

export default function ListOfFriendsInProfile({ friends }: FriendsListProps) {
  return (
    <GenericList list={friends} emptyListUI={<>You don't have friends.</>}>
      <div
        className="listOfPosts"
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
