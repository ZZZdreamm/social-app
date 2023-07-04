import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserSearchTypeahead from "../../Users/UserSearchTypeahead";
import ProfileContext from "../../ZZZ_USEFUL COMPONENTS/Profile/ProfileContext";
import GoToMenuButton from "../../ZZZ_USEFUL COMPONENTS/Utilities/GoToMenuButton";
import Authorized from "../../ZZZ_USEFUL COMPONENTS/auth/Authorized";
import LogoutButton from "../../ZZZ_USEFUL COMPONENTS/auth/LogoutButton";

import "./style.scss"

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
              <img className="small-profile-image" src={myProfile && myProfile.ProfileImage} onClick={()=>navigate(`/user-profile/${myProfile.Id}`)} alt=""/>
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
