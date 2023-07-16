import "./style.scss";
import { profileDTO } from "../../../services/Models/profiles.models";


import MessagerFriend from "../MessagerFriend";
import GenericList from "../../../_utils/GenericList/GenericList";
import Waiting from "../../../_utils/Waiting/indexxx";

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
