import "./style.scss";
import { useNavigate } from "react-router-dom";
import { profileDTO } from "../../../services/Models/profiles.models";
import { ProfileImage } from "../../ProfileImage/ProfileImage";
import { useProfilesRelationsContext } from "../../../services/Contexts/ProfileDataContext";
import { useAuthenticationContext } from "../../../services/Contexts/AuthenticationContext";

interface SearchOptionProps {
  userProfile: profileDTO;
}
export default function SearchOption({ userProfile }: SearchOptionProps) {
  const navigate = useNavigate();
  const { profile } = useAuthenticationContext();
  return (
    <>
      {profile?.Email != userProfile.Email && (
        <div
          key={userProfile.Id}
          className="data-option medium-font"
          onClick={() => {
            navigate(`user-profile/${userProfile.Id}`);
            const typeahead = document.getElementById(
              "user-search-typeahead"
            ) as HTMLInputElement;
            typeahead.value = "";
          }}
        >
          <span
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            {/* <img
              className="data-option-part image"
              src={profile.ProfileImage || `${ReadyImagesURL}/noProfile.jpg`}
              alt=""
            /> */}
            <ProfileImage imageURL={userProfile.ProfileImage} />
            <span className="data-option-part" style={{ textAlign: "left" }}>
              {userProfile.Email}
            </span>
          </span>
        </div>
      )}
    </>
  );
}
