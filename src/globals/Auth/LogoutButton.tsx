import { useNavigate } from "react-router-dom";
import { logout } from "./HandleJWT";
import { useAuthData } from "../../hooks/useAuthData";

export default function LogoutButton() {
  const navigate = useNavigate();
  const { setClaims } = useAuthData();
  return (
    <button
      onClick={() => {
        logout();
        localStorage.removeItem("username");
        setClaims([]);
        navigate("/");
        navigate(0);
      }}
    >
      Logout
    </button>
  );
}
