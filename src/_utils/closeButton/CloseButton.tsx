import styled from "styled-components";
import { ReadyImagesURL } from "../../globals/appUrls";
import { useNavigate } from "react-router-dom";

export function CloseButton() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };
  return (
    <Container onClick={handleClick}>
      <Image src={`${ReadyImagesURL}/whiteXIcon.png`} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: var(--backColor);
  box-sizing: border-box;
  cursor: pointer;
  height: 2.4rem;
  width: 2.4rem;
  &:hover {
    opacity: 0.8;
  }
`;

const Image = styled.img`
  height: 1.2rem;
  width: 1.2rem;
`;
