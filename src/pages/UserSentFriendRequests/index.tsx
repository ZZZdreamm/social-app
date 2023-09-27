import "./style.scss";
import FriendRequestsList from "../../components/Users/FriendRequestsList";
import { useProfilesRelationsContext } from "../../services/Contexts/ProfileDataContext";

export default function UserSentFriendRequests() {
  const { sentFriendsRequests } = useProfilesRelationsContext();

  return (
    <div className="friendRequests">
      <h2 className="mv-1">Your Sent Requests</h2>
      <FriendRequestsList friends={sentFriendsRequests} sent={true} />
    </div>
  );
}
