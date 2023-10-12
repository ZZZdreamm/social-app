import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ReadyImagesURL } from "../../globals/appUrls";

export function LogoIcon() {
  const navigate = useNavigate();
  const goToLandingPage = () => {
    navigate("/");
  };
  return <Logo onClick={goToLandingPage} src={`${ReadyImagesURL}/logo.png`} />;
}

const Logo = styled.img`
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  cursor: pointer;
  align-self: center;
  justify-self: center;
`;
