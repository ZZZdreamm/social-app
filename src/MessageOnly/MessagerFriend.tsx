import { useNavigate } from "react-router-dom";
import { profileDTO } from "../ZZZ_USEFUL COMPONENTS/Profile/profiles.models";
import { ReadyImagesURL } from "../ZZZ_USEFUL COMPONENTS/appUrls";
import ProfileContext from "../ZZZ_USEFUL COMPONENTS/Profile/ProfileContext";
import { useContext } from "react";

interface MessagerFriendProps {
  profile: profileDTO;
  setChoosenFriend: (profile: profileDTO) => void;
}
export default function MessagerFriend({
  profile,
  setChoosenFriend,
}: MessagerFriendProps) {
  const image = profile.ProfileImage || `${ReadyImagesURL}/noProfile.jpg`;
  return (
    <div
      className="messager-friend"
      onClick={() => {
        setChoosenFriend(profile);
      }}
    >
      <img className="messager-friend-image" src={image} />
      <span className="messager-friend-name">{profile.Email}</span>
    </div>
  );
}
