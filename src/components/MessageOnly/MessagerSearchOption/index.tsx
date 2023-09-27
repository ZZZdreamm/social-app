import { profileDTO } from "../../../services/Models/profiles.models";
import "./style.scss";
import { ProfileImage } from "../../ProfileImage/ProfileImage";
import { useProfilesRelationsContext } from "../../../services/Contexts/ProfileDataContext";

interface SearchOptionProps {
  userProfile: profileDTO;
  setChoosenFriend: (profile: profileDTO) => void;
}
export default function MessagerSearchOption({
  userProfile,
  setChoosenFriend,
}: SearchOptionProps) {
  const { profile } = useProfilesRelationsContext();
  return (
    <>
      {profile?.Email != userProfile.Email && (
        <div
          key={userProfile.Id}
          className="data-option medium-font"
          onClick={() => {
            setChoosenFriend(userProfile);
            const typeahead = document.getElementById(
              "user-search-typeahead"
            ) as HTMLInputElement;
            typeahead.value = "";
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
