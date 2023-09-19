import { useContext, useEffect, useState } from "react";
import { ReadyImagesURL } from "../../../../globals/appUrls";
import ProfileContext, {
  ProfileFriendsContext,
} from "../../../../services/Contexts/ProfileContext";
import { useLocation, useNavigate } from "react-router-dom";
import RightBarFriend from "../../../Messages/RightBarFriend";

import "./style.scss";
import "../style.scss";

export default function RightBar() {
  const { myFriends } = useContext(ProfileFriendsContext);

  return (
    <>
      <div className="bar bar-right">
        <h5 className="large-font">Friends</h5>
        <ul>
          {myFriends &&
            myFriends.length > 0 &&
            myFriends.map((friend) => (
              <RightBarFriend key={friend.Id} friend={friend} />
            ))}
        </ul>
      </div>
    </>
  );
}
