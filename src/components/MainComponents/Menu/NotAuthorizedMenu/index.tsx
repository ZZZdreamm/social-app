import { useNavigate } from "react-router-dom";
import "./style.scss";

export default function NotAuthorizedMenu() {
  const navigate = useNavigate();

  return (
    <span>
      <button onClick={() => navigate("/login")}>Login</button>
      <button onClick={() => navigate("/register")}>Register</button>
    </span>
  );
}
