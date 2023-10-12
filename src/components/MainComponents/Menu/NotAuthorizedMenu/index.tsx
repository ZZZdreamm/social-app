import { useNavigate } from "react-router-dom";
import "./style.scss";
import NightModeSwitch from "../../../NightModeSwitch";
import { LogoIcon } from "../../../../_utils/logoIcon/LogoIcon";
import styled from "styled-components";

export default function NotAuthorizedMenu() {
  const navigate = useNavigate();

  return (
    <>
      <LogoContainer>
        <LogoIcon />
      </LogoContainer>
      <span className="flex-center" style={{ position: "relative" }}>
        {/* <button onClick={() => navigate("/login")}>Login</button> */}
        <NightModeSwitch />

        <button onClick={() => navigate("/register")}>Register</button>
      </span>
    </>
  );
}

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
`;
