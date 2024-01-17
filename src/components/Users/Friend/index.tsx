import "./style.scss";
import { useNavigate } from "react-router-dom";
import { profileDTO } from "../../../models/profiles.models";

import { ReadyImagesURL } from "../../../globals/appUrls";
import { axiosBase } from "../../../globals/apiPaths";
import { useProfilesRelationsContext } from "../../../services/Contexts/ProfileDataContext";
import { useAuthenticationContext } from "../../../services/Contexts/AuthenticationContext";

export default function Friend({ friend }: FriendProps) {
  const navigate = useNavigate();
  const { profile } = useAuthenticationContext();
  const { friends, setFriends } = useProfilesRelationsContext();
  async function removeFriend() {
    const response = await axiosBase.delete<{ Id: string }>(
      `profiles/deleteFriend?userId=${profile?.Id}&friendId=${friend.Id}`
    );
    const deletedFriend = response.data;
    console.log(deletedFriend);
    const newFriends = friends!.filter(
      (tempFriend) => tempFriend.Id != deletedFriend.Id
    );
    console.log(newFriends);
    setFriends(newFriends);
    window.location.reload();
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
