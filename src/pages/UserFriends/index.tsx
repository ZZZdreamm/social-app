import "./style.scss";
import { useContext } from "react";
import { ProfileFriendsContext } from "../../services/Contexts/ProfileContext";
import FriendsList from "../../components/Users/FriendsList";

export default function UserFriends() {
  const {myFriends} = useContext(ProfileFriendsContext)

  return (
    <div className="friends">
      <h2 className="mv-1">Your friends</h2>
      <span className="friends-container">
        <FriendsList friends={myFriends}/>
      </span>
    </div>
  );
}
