import { useNavigate } from "react-router-dom";
import { logout } from "./HandleJWT";
import { useContext } from "react";
import AuthenticationContext from "./AuthenticationContext";

export default function LogoutButton() {
  const navigate = useNavigate();
  const {update} = useContext(AuthenticationContext)
  return (
    <button
      onClick={() => {
        logout();
        localStorage.removeItem('username')
        update([]);
        navigate("/");
        navigate(0);
      }}
      style={{height:'fit-content'}}
    >
      Logout
    </button>
  );
}
