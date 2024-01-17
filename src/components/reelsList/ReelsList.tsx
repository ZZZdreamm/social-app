import styled from "styled-components";
import GenericList from "../../_utils/GenericList/GenericList";
import Waiting from "../../_utils/Waiting/indexxx";
import { ReelsDto } from "../../models/reels.models";
import { Reels } from "../reels/Reels";
import { ScrollListWithArrows } from "../../_utils/scrollListWithArrows/ScrollListWithArrows";
import { useRef } from "react";
import { CreateReelsCard } from "../createReelsCard/CreateReelsCard";

interface ReelsListProps {
  reels?: ReelsDto[];
}

export function ReelsList({ reels }: ReelsListProps) {
  const reelsListRef = useRef<HTMLDivElement | null>(null);
  return (
    <GenericList list={reels} emptyListUI={<></>}>
      <div className="box">
        <ReelsListContainer ref={reelsListRef}>
          <CreateReelsCard />
          {reels && reels.length > 0 ? (
            <>
              {reels.map((reel) => (
                <Reels key={reel.Id} reels={reel} />
              ))}
            </>
          ) : (
            <Waiting message="Loading" />
          )}
        </ReelsListContainer>
        {reels && reels?.length >= 4 && (
          <ScrollListWithArrows containerRef={reelsListRef} />
        )}
      </div>
    </GenericList>
  );
}

const ReelsListContainer = styled.div`
  display: flex;
  /* grid-template-columns: repeat(auto-fill, minmax(22.2%, 1fr));
  grid-template-rows: 100%; */
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto;
  gap: 0.5rem;
  overflow-x: hidden;
  overflow-y: hidden;
  position: relative;
`;
