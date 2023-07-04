import { useContext, useEffect, useState } from "react";
import { ReadyImagesURL } from "../../../ZZZ_USEFUL COMPONENTS/appUrls";
import ProfileContext, {
  ProfileFriendsContext,
} from "../../../ZZZ_USEFUL COMPONENTS/Profile/ProfileContext";
import { useLocation, useNavigate } from "react-router-dom";
import RightBarFriend from "../../../Messages/RightBarFriend";

import "./style.scss"
import "../style.scss"

export default function RightBar() {
  const { myFriends } = useContext(ProfileFriendsContext);

  return (
    <>
      <div className="bar bar-right">
        <h5>Friends</h5>
        <ul>
          {myFriends &&
            myFriends.map((friend) => (
              <RightBarFriend key={friend.Id} friend={friend} />
            ))}
        </ul>
      </div>
    </>
  );
}
