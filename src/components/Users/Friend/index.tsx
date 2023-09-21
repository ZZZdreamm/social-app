import "./style.scss";
import { useNavigate } from "react-router-dom";
import { profileDTO } from "../../../services/Models/profiles.models";

import { ReadyImagesURL } from "../../../globals/appUrls";
import { useContext } from "react";
import ProfileContext, {
  ProfileFriendsContext,
} from "../../../services/Contexts/ProfileContext";
import { axiosBaseProfiles } from "../../../globals/apiPaths";

export default function Friend({ friend }: FriendProps) {
  const navigate = useNavigate();
  const { myProfile } = useContext(ProfileContext);
  const { myFriends, updateFriends } = useContext(ProfileFriendsContext);
  async function removeFriend() {
    const response = await axiosBaseProfiles.delete<{ Id: string }>(
      `deleteFriend?userId=${myProfile.Id}&friendId=${friend.Id}`
    );
    const deletedFriend = response.data;
    const newFriends = myFriends!.filter(
      (tempFriend) => tempFriend.Id != deletedFriend.Id
    );
    updateFriends(newFriends);
  }
  return (
    <div className="friend">
      <img
        src={friend.ProfileImage || `${ReadyImagesURL}/noProfile.jpg`}
        onClick={() => navigate(`/user-profile/${friend.Id}`)}
        alt=""
      />
      <span className="friend-info">
        <span className="large-font">{friend.Email}</span>
        <button className="friend-remove medium-font" onClick={removeFriend}>
          Remove friend
        </button>
      </span>
    </div>
  );
}

interface FriendProps {
  friend: profileDTO;
}
