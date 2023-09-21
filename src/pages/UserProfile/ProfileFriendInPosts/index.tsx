import { useNavigate } from "react-router-dom";
import { ReadyImagesURL } from "../../../globals/appUrls";
import { profileDTO } from "../../../services/Models/profiles.models";
import { useState, useContext } from "react";
import OpenedOptions from "../../../_utils/OpenedOptions";
import ProfileContext, {
  ProfileFriendsContext,
} from "../../../services/Contexts/ProfileContext";
import { axiosBaseProfiles } from "../../../globals/apiPaths";

interface ProfileFriendProps {
  friend: profileDTO;
}

const ProfileFriendInPosts = ({ friend }: ProfileFriendProps) => {
  const navigate = useNavigate();
  const { myProfile } = useContext(ProfileContext);
  const { myFriends, updateFriends } = useContext(ProfileFriendsContext);
  function goToProfile() {
    navigate(`/user-profile/${friend?.Id}`);
  }

  async function removeFriend() {
    const deletedFriend = (
      await axiosBaseProfiles.delete<{ Id: string }>(
        `deleteFriend?userId=${myProfile.Id}&friendId=${friend.Id}`
      )
    ).data;
    const newFriends = myFriends!.filter(
      (tempFriend) => tempFriend.Id != deletedFriend.Id
    );
    updateFriends(newFriends);
    navigate(0);
  }

  return (
    <div className="profileFriend">
      <div
        className="profileFriend-description gap-1"
        style={{ height: "100%" }}
      >
        <div
          className="profileFriend-image"
          onClick={goToProfile}
          style={{
            backgroundImage: `url(${
              friend.ProfileImage
                ? friend.ProfileImage
                : `${ReadyImagesURL}/noProfile.jpg`
            })`,
          }}
        ></div>
        <span
          className="medium-font elipsis hover-underline"
          onClick={goToProfile}
        >
          {friend.Email}
        </span>
      </div>
      <OpenedOptions
        key={`options/${friend.Id}`}
        position={{
          top: "50%",
          transform: "translateY(-50%)",
          right: "0.5rem",
        }}
        children={
          <>
            <span onClick={removeFriend}>Remove</span>
            <span>Options</span>
          </>
        }
      />
    </div>
  );
};

export default ProfileFriendInPosts;
