import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { BarAndContentDisplay } from "../../components/barAndContentDisplay/BarAndContentDisplay";
import { useEffect, useRef, useState } from "react";
import { getReels } from "../../apiFunctions/getReels";
import { ReelInBar } from "./ReelsInBar";
import { ReelsDto } from "../../models/reels.models";
import { OpenedReel } from "components/openedReel/OpenedReel";

const getIndexFromReelId = (reels: ReelsDto[], reelId: string) => {
  const reel = reels?.find((reel) => reel.Id === reelId);
  if (!reel) return 0;
  return reels?.indexOf(reel);
};

export function OpenReelsPage() {
  const { reelId } = useParams();
  const containerRef = useRef<HTMLDivElement>(null);
  // const { data: reels, isFetchedAfterMount } = useQuery(`openReelsPage`, () =>
  //   getManyUsersReelsByIds([])
  // );
  const { data: reels, isFetchedAfterMount } = useQuery("openReelsPage", () =>
    getReels(undefined, 10)
  );

  const [currentReel, setCurrentReel] = useState(() =>
    getIndexFromReelId(reels!, reelId!)
  );

  useEffect(() => {
    if (!reelId || !reels) return;
    setCurrentReel(getIndexFromReelId(reels, reelId));
  }, [reelId, reels]);

  return (
    <BarAndContentDisplay
      contentBackgroundColor="navColor"
      bar={
        <BarContent>
          <div>Stories</div>
          <AllRelations>
            {isFetchedAfterMount &&
              reels &&
              reels.map((reel, index) => {
                if (index === currentReel) {
                  return <ReelInBar key={reel.Id} reel={reel} isChoosen />;
                }
                return <ReelInBar key={reel.Id} reel={reel} />;
              })}
          </AllRelations>
        </BarContent>
      }
      content={
        <OpenedReel
          reels={reels ?? []}
          currentReel={currentReel}
          setCurrentReel={setCurrentReel}
          isFetchedAfterMount={isFetchedAfterMount}
        />
      }
    />
  );
}


const BarContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  gap: 1rem;
  height: 100%;
`;

const AllRelations = styled.article`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  height: 82%;
  overflow-y: auto;
`;
