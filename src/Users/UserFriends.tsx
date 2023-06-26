import { useContext, useEffect, useState } from "react";
import ProfileContext, { ProfileFriendsContext } from "../ZZZ_USEFUL COMPONENTS/Profile/ProfileContext";
import { userDTO } from "../ZZZ_USEFUL COMPONENTS/auth/auth.models";
import { profileDTO } from "../ZZZ_USEFUL COMPONENTS/Profile/profiles.models";
import { postDataToServer } from "../Firebase/FirebaseFunctions";
import FriendsList from "./FriendsList";

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
