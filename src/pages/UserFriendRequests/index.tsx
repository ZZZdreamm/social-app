import "./style.scss";
import FriendRequestsList from "../../components/Users/FriendRequestsList";
import { useProfilesRelationsContext } from "../../services/Contexts/ProfileDataContext";

export default function UserFriendRequests() {
  const { friendsRequests } = useProfilesRelationsContext();

  return (
    <div className="friendRequests">
      <h2 className="mv-1">Your incoming requests</h2>
      <FriendRequestsList friends={friendsRequests} sent={false} />
    </div>
  );
}
