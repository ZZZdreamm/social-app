import { useContext } from "react";
import ProfileContext, { FriendRequestsContext, ProfileFriendsContext } from "../ZZZ_USEFUL COMPONENTS/Profile/ProfileContext";
import FriendRequestsList from "./FriendRequestsList";

export default function UserFriendRequests(){
  const {myFriendRequests} = useContext(FriendRequestsContext)

  return (
    <div className="friendRequests">
      <h2>Your incoming requests</h2>
        <FriendRequestsList friends={myFriendRequests} sent={false}/>
    </div>
  );
}