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
import SearchOption from "../Users/SearchOption";
import UserSearchTypeahead from "../Users/UserSearchTypeahead";

export default function Menu() {
  const navigate = useNavigate();
  const { myProfile } = useContext(ProfileContext);

  return (
    <nav className="navbar">
      <GoToMenuButton appName={"FriendLink"} />
      <Authorized
        isAuthorized={
          <>
            <UserSearchTypeahead/>
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
    </nav>
  );
}
