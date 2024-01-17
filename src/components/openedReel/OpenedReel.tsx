import ScrollingMediaFiles from "_utils/ScrollingMediaFiles";
import { ChangeElementInListWithArrows } from "_utils/changeElemenetWithArrows/ChangeElementInListWithArrows";
import { ReelsBar } from "_utils/reelsBar/ReelsBar";
import { ReelsDto } from "models/reels.models";
import { useRef } from "react";
import styled from "styled-components";
import { ReelContent } from "./ReelContent";

interface OpenedReelProps {
  reels: ReelsDto[];
  currentReel: number;
  setCurrentReel: React.Dispatch<React.SetStateAction<number>>;
  isFetchedAfterMount: boolean;
}

export function OpenedReel({
  reels,
  currentReel,
  setCurrentReel,
  isFetchedAfterMount,
}: OpenedReelProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <Content>
      <ReelsBar reels={reels ?? []} currentReel={currentReel} />
      <ReelContainer>
        <div className="box">
          <MediaFile ref={containerRef}>
            {isFetchedAfterMount && reels && (
              <ReelContent reel={reels[currentReel!]} />
            )}
          </MediaFile>
        </div>
      </ReelContainer>
      <ChangeElementInListWithArrows
        index={currentReel!}
        setIndex={setCurrentReel}
        length={reels?.length!}
      />
    </Content>
  );
}

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const ReelContainer = styled.div`
  min-width: 30rem;
  max-width: max(40rem, 100%);
`;

const MediaFile = styled.div`
  height: 100%;
  width: 100%;
  background-color: var(--backColor);
  display: flex;
  overflow: hidden;
`;


