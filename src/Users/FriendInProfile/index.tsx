import "./style.scss";
import { useNavigate } from "react-router-dom";
import { profileDTO } from "../../ZZZ_USEFUL COMPONENTS/Profile/profiles.models";
import { ReadyImagesURL } from "../../ZZZ_USEFUL COMPONENTS/appUrls";

export default function FriendInProfile({ friend }: FriendProps) {
  const navigate = useNavigate();
  const image = friend.ProfileImage || `${ReadyImagesURL}/noProfile.jpg`;
  return (
    <div
      className="friend-profile"
      onClick={() => navigate(`/user-profile/${friend.Id}`)}
    >
      <img src={image} alt="" />
      <span
        className="large-font"
        style={{ wordBreak: "break-all", padding: "0.5rem" }}
      >
        {friend.Email}
      </span>
    </div>
  );
}

interface FriendProps {
  friend: profileDTO;
}
