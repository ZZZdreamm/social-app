import "./style.scss";
import { useNavigate } from "react-router-dom";
import { profileDTO } from "../../../ZZZ_USEFUL COMPONENTS/Profile/profiles.models";
import ProfileContext from "../../../services/Contexts/ProfileContext";
import { useContext } from "react";
import { ReadyImagesURL } from "../../../globals/appUrls";

interface SearchOptionProps {
  profile: profileDTO;
}
export default function SearchOption({ profile }: SearchOptionProps) {
  const navigate = useNavigate();
  const { myProfile } = useContext(ProfileContext);
  return (
    <>
      {myProfile.Email != profile.Email && (
        <div
          key={profile.Id}
          className="data-option medium-font"
          onClick={() => {
            navigate(`user-profile/${profile.Id}`);
            const typeahead = document.getElementById(
              "user-search-typeahead"
            ) as HTMLInputElement;
            typeahead.value = "";
          }}
        >
          <span style={{ display: "flex", alignItems: "center" }}>
            <img
              className="data-option-part image"
              src={profile.ProfileImage || `${ReadyImagesURL}/noProfile.jpg`}
              alt=""
            />
            <span className="data-option-part">{profile.Email}</span>
          </span>
        </div>
      )}
    </>
  );
}
