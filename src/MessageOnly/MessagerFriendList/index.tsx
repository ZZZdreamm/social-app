import "./style.scss";
import { profileDTO } from "../../ZZZ_USEFUL COMPONENTS/Profile/profiles.models";
import GenericList from "../../ZZZ_USEFUL COMPONENTS/Utilities/GenericList";
import Waiting from "../../ZZZ_USEFUL COMPONENTS/Utilities/Waiting/indexxx";
import MessagerFriend from "../MessagerFriend";

interface FriendsList {
  setChoosenFriend: (profile: profileDTO | undefined) => void;
  friends?: profileDTO[];
}
export default function MessagerFriendList({
  friends,
  setChoosenFriend,
}: FriendsList) {
  return (
    <GenericList list={friends} emptyListUI={<></>}>
      <>
        {friends ? (
          friends.map((friend) => (
            <MessagerFriend
              key={friend.Id}
              profile={friend}
              setChoosenFriend={setChoosenFriend}
            />
          ))
        ) : (
          <Waiting message="Loading" />
        )}
      </>
    </GenericList>
  );
}
