import "./style.scss";
import { profileDTO } from "../../../ZZZ_USEFUL COMPONENTS/Profile/profiles.models";
import { ReadyImagesURL } from "../../../globals/appUrls";

interface MessagerFriendProps {
  profile: profileDTO;
  setChoosenFriend: (profile: profileDTO) => void;
}
export default function MessagerMobileFriend({
  profile,
  setChoosenFriend,
}: MessagerFriendProps) {
  const image = profile.ProfileImage || `${ReadyImagesURL}/noProfile.jpg`;
  return (
    <div
      className="mobile-friend messager-friend"
      onClick={() => {
        setChoosenFriend(profile);
      }}
    >
      <img className="messager-friend-image" src={image} alt=""/>
      <div>
        <span className="messager-friend-name" style={{fontSize:'2rem'}}>{profile.Email}</span>
      </div>
    </div>
  );
}
