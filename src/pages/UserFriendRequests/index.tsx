import "./style.scss";
import { useContext } from "react";
import { FriendRequestsContext } from "../../services/Contexts/ProfileContext";
import FriendRequestsList from "../../components/Users/FriendRequestsList";

export default function UserFriendRequests() {
  const { myFriendRequests } = useContext(FriendRequestsContext);

  return (
    <div className="friendRequests">
      <h2 className="mv-1">Your incoming requests</h2>
      <FriendRequestsList friends={myFriendRequests} sent={false} />
    </div>
  );
}
