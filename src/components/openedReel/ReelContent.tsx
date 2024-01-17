import { ReelsDto } from "models/reels.models";
import styled from "styled-components";

interface Props {
  reel: ReelsDto;
}

export function ReelContent({ reel }: Props) {
  return (
    <Container>
      <Image src={reel.MediaFile} alt="" />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
`;
