import "./style.scss";
import "../style.scss";
import { useContext } from "react";
import { SentFriendRequestsContext } from "../../../ZZZ_USEFUL COMPONENTS/Profile/ProfileContext";
import FriendRequestsList from "../../FriendRequestsList";

export default function UserSentFriendRequests(){
  const {mySentRequests} = useContext(SentFriendRequestsContext)

  return (
    <div className="friendRequests">
      <h2>Your Sent Requests</h2>
        <FriendRequestsList friends={mySentRequests} sent={true}/>
    </div>
  );
}
