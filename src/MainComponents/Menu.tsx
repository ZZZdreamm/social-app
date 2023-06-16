import { ReactElement, JSXElementConstructor, useContext } from "react";
import GoToMenuButton from "../ZZZ_USEFUL COMPONENTS/Utilities/GoToMenuButton";
import SearchTypeahead from "../ZZZ_USEFUL COMPONENTS/Utilities/SearchTypeahead";
import { profileDTO } from "../ZZZ_USEFUL COMPONENTS/Profile/profiles.models";
import Authorized from "../ZZZ_USEFUL COMPONENTS/auth/Authorized";
import { Navigate, useNavigate, useNavigation } from "react-router-dom";
import LogoutButton from "../ZZZ_USEFUL COMPONENTS/auth/LogoutButton";
import { postDataToServer } from "../Firebase/FirebaseFunctions";
import { ReadyImagesURL } from "../ZZZ_USEFUL COMPONENTS/appUrls";
import ProfileContext from "../ZZZ_USEFUL COMPONENTS/Profile/ProfileContext";

export default function Menu() {
  const navigate = useNavigate();
  const { myProfile } = useContext(ProfileContext);
  function typeaheadChildren(profile: profileDTO): React.ReactElement {
    return (
      <>
        {myProfile.Email != profile.Email && (
          <div
          key={profile.Id}
            className="data-option"
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
                src={
                  profile.ProfileImage || `${ReadyImagesURL}/noProfile.jpg`
                }
              />
              <span className="data-option-part">{profile.Email}</span>
            </span>
          </div>
        )}
      </>
    );
  }

  async function searchProfiles(
    query: string,
    setProfiles: (profiles: profileDTO[]) => void
  ) {
    if (query) {
      const response = await postDataToServer({ name: query }, "search-users");
      const searchedUsers = response.users.slice(0, 5);
      setProfiles(searchedUsers);
    } else {
      setProfiles([]);
    }
  }
  return (
    <div className="navbar">
      <GoToMenuButton appName={"FriendLink"} />
      <Authorized
        isAuthorized={
          <>
            <SearchTypeahead
              listOfData={[]}
              itemChildren={typeaheadChildren}
              handleSearch={searchProfiles}
              bonusClassName="navbar-typeahead"
            />
            <span style={{height:"80%", display:'flex', alignItems:'center', padding:'0 0.5rem', marginRight:'1rem'}}>
              <LogoutButton />
              <img className="small-profile-image" src={myProfile && myProfile.ProfileImage} onClick={()=>navigate(`/user-profile/${myProfile.Id}`)}/>
            </span>
          </>
        }
        notAuthorized={
          <span>
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/register")}>Register</button>
          </span>
        }
      />
    </div>
  );
}
