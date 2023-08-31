import { useContext } from "react";
import ProfileContext from "../../../services/Contexts/ProfileContext";
import { profileDTO } from "../../../services/Models/profiles.models";

import { ReadyImagesURL } from "../../../globals/appUrls";
import "./style.scss";

interface SearchOptionProps {
  profile: profileDTO;
  setChoosenFriend: (profile: profileDTO) => void;
}
export default function MessagerSearchOption({
  profile,
  setChoosenFriend,
}: SearchOptionProps) {
  const { myProfile } = useContext(ProfileContext);
  return (
    <>
      {myProfile.Email != profile.Email && (
        <div
          key={profile.Id}
          className="data-option medium-font"
          onClick={() => {
            setChoosenFriend(profile);
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
