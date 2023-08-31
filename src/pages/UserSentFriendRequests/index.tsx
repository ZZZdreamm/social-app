import "./style.scss";
import { useContext } from "react";
import { SentFriendRequestsContext } from "../../services/Contexts/ProfileContext";
import FriendRequestsList from "../../components/Users/FriendRequestsList";

export default function UserSentFriendRequests(){
  const {mySentRequests} = useContext(SentFriendRequestsContext)

  return (
    <div className="friendRequests">
      <h2 className="mv-1">Your Sent Requests</h2>
        <FriendRequestsList friends={mySentRequests} sent={true}/>
    </div>
  );
}
