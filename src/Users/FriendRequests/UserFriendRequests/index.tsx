import "./style.scss";
import "../style.scss";
import { useContext } from "react";
import { FriendRequestsContext } from "../../../Contexts/ProfileContext";
import FriendRequestsList from "../../FriendRequestsList";

export default function UserFriendRequests() {
  const { myFriendRequests } = useContext(FriendRequestsContext);

  return (
    <div className="friendRequests">
      <h2>Your incoming requests</h2>
      <FriendRequestsList friends={myFriendRequests} sent={false} />
    </div>
  );
}
