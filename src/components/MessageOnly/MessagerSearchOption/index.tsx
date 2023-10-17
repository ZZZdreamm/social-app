import { profileDTO } from "../../../services/Models/profiles.models";
import "./style.scss";
import { ProfileImage } from "../../ProfileImage/ProfileImage";
import { useProfilesRelationsContext } from "../../../services/Contexts/ProfileDataContext";
import { useAuthenticationContext } from "../../../services/Contexts/AuthenticationContext";

interface SearchOptionProps {
  userProfile: profileDTO;
  setChoosenFriend: (profile: profileDTO) => void;
}
export default function MessagerSearchOption({
  userProfile,
  setChoosenFriend,
}: SearchOptionProps) {
  const { profile } = useAuthenticationContext();
  return (
    <>
      {profile?.Email != userProfile.Email && (
        <div
          key={userProfile.Id}
          className="data-option medium-font"
          onClick={() => {
            setChoosenFriend(userProfile);
          }}
        >
          <span
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <ProfileImage imageURL={userProfile.ProfileImage} />
            <span className="data-option-part">{userProfile.Email}</span>
          </span>
        </div>
      )}
    </>
  );
}
