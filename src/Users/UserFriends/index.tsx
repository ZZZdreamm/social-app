import "./style.scss";
import { useContext } from "react";
import { ProfileFriendsContext } from "../../ZZZ_USEFUL COMPONENTS/Profile/ProfileContext";
import FriendsList from "../FriendsList";

export default function UserFriends() {
  const {myFriends} = useContext(ProfileFriendsContext)

  return (
    <div className="friends">
      <h2>Your friends</h2>
      <span className="friends-container">
        <FriendsList friends={myFriends}/>
      </span>
    </div>
  );
}
