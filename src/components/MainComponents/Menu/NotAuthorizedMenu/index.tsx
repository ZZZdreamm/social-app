import { useNavigate } from "react-router-dom";
import "./style.scss";
import NightModeSwitch from "../../../NightModeSwitch";

export default function NotAuthorizedMenu() {
  const navigate = useNavigate();

  return (
    <span className="flex-center" style={{position:'relative'}}>
      {/* <button onClick={() => navigate("/login")}>Login</button> */}
      <NightModeSwitch />

      <button onClick={() => navigate("/register")}>Register</button>
    </span>
  );
}
