import "./style.scss";
import FriendsList from "../../components/Users/FriendsList";
import { useProfilesRelationsContext } from "../../services/Contexts/ProfileDataContext";

export default function UserFriends() {
  const { friends } = useProfilesRelationsContext();

  return (
    <div className="friends">
      <h2 className="mv-1">Your friends</h2>
      <span className="friends-container">
        <FriendsList friends={friends} />
      </span>
    </div>
  );
}
