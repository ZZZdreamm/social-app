import styled from "styled-components";
import { useAuthenticationContext } from "../../services/Contexts/AuthenticationContext";
import { useNavigate } from "react-router-dom";
import { PlusButton } from "../../_utils/plusButton/PlusButton";

export function CreateReelsCard() {
  const { profile } = useAuthenticationContext();
  const navigate = useNavigate();

  const goToCreateReels = () => {
    navigate("/reels/create");
  };

  return (
    <Card onClick={goToCreateReels}>
      <ImageContainer>
        <Image src={profile?.ProfileImage} />
      </ImageContainer>
      <PlusContainer>
        <PlusButton />
      </PlusContainer>
      <AddReelsFooter>Add story</AddReelsFooter>
    </Card>
  );
}

const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  min-width: 22.2%;
  max-width: 22.2%;
  height: 15rem;
  background-color: var(--navColor);
  transition: background-color 0.3s;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
    background-color: var(--hoverColor);
  }
  &:hover > img {
    transform: scale(1.1);
  }
`;

const ImageContainer = styled.div`
  height: 75%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  height: 100%;
  object-fit: contain;
  transition: transform 0.2s;
`;

const PlusContainer = styled.div`
  position: absolute;
  bottom: 25%;
  right: 50%;
  transform: translate(50%, 50%);
`;

const AddReelsFooter = styled.div`
  height: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 600;
`;
