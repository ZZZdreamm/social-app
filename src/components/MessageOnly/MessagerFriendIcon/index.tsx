import "./style.scss";
import { profileDTO } from "../../../services/Models/profiles.models";

import { ReadyImagesURL } from "../../../globals/appUrls";

interface MessagerFriendProps {
  profile: profileDTO;
  setChoosenFriend: (profile: profileDTO) => void;
}
export default function MessagerFriendIcon({
  profile,
  setChoosenFriend,
}: MessagerFriendProps) {
  const image = profile.ProfileImage || `${ReadyImagesURL}/noProfile.jpg`;

  return (
    <div
      className="messager-mobile-icon flex-center"
      onClick={() => {
        setChoosenFriend(profile);
      }}
    >
      <img className="messager-mobile-icon-image" src={image} alt="" />
      <span className="messager-mobile-icon-name medium-font">
        {profile.Email}
      </span>
    </div>
  );
}
