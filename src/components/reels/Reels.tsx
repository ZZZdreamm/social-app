import styled from "styled-components";
import { ReelsDto } from "../../models/reels.models";
import { useNavigate } from "react-router-dom";

interface ReelsProps {
  reels: ReelsDto;
}

export function Reels({ reels }: ReelsProps) {
  const navigate = useNavigate();
  const openReels = () => {
    navigate(`/reels/${reels.Id}`);
  };
  return (
    <Card onClick={openReels}>
      <Image src={reels.MediaFile}></Image>
    </Card>
  );
}

const Card = styled.div`
  border-radius: 1rem;
  min-width: 22.2%;
  max-width: 22.2%;
  height: 15rem;
  background-color: var(--navColor);
  transition: background-color 0.3s;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    opacity: 0.8;
    background-color: var(--hoverColor);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  /* object-fit: contain; */
`;
