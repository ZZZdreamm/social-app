import { ReelsDto } from "models/reels.models";
import styled from "styled-components";

interface Props {
  reels: ReelsDto[];
  currentReel: number;
}

export function ReelsBar({ reels, currentReel }: Props) {
  return (
    <BarContainer>
      <Bar>
        {reels.map((reel, index) => {
          return <Strap key={reel.Id} choosen={index === currentReel}></Strap>;
        })}
      </Bar>
    </BarContainer>
  );
}

const BarContainer = styled.div`
  max-width: 40rem;
  width: 100%;
  height: 0.5rem;
  position: absolute;
  top: 0.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Bar = styled.div`
  display: flex;
  width: 95%;
  height: 100%;
  gap: 0.5rem;
  z-index: 20;
`;

const Strap = styled.div<{
  choosen?: boolean;
}>`
  width: 100%;
  height: 0.5rem;
  background-color: ${(props) =>
    props.choosen ? props.theme.colors.ecru : props.theme.colors.oliveAccent};
  margin-bottom: 0.5rem;
  box-shadow: ${(props) => props.theme.shadows.light};
`;
