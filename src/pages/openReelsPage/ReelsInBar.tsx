import styled from "styled-components";
import { ReelsDto } from "../../services/Models/reels.models";
import { useNavigate } from "react-router-dom";

interface ReelInBarProps {
  reel: ReelsDto;
  isChoosen?: boolean;
}

export function ReelInBar({ reel, isChoosen = false }: ReelInBarProps) {
  const navigate = useNavigate();
  const showThisReel = () => {
    navigate(`/reels/${reel.Id}`);
  };
  return (
    <Container onClick={showThisReel} isChoosen={isChoosen}>
      <Image src={reel.MediaFile} alt="" />
      <div>
        <strong>{reel.AutorName}</strong> story
      </div>
    </Container>
  );
}

const Container = styled.div<{ isChoosen: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 1rem;
  transition: background-color 0.3s;
  background-color: ${({ isChoosen }) => isChoosen && "var(--hoverColor)"};
  opacity: ${({ isChoosen }) => isChoosen && "0.9"};
  &:hover {
    background-color: var(--hoverColor);
    opacity: 0.9;
  }
`;

const Image = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1rem;
`;
