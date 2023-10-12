import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getOneReel } from "../../apiFunctions/getOneReel";
import { ONE_HOUR } from "../../globals/constants";
import styled from "styled-components";
import { BarAndContentDisplay } from "../../components/barAndContentDisplay/BarAndContentDisplay";
import { ScrollListWithArrows } from "../../_utils/scrollListWithArrows/ScrollListWithArrows";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { getReels } from "../../apiFunctions/getReels";
import { useInfiniteReels } from "../../hooks/useInfiniteReels";
import { ChangeElementInListWithArrows } from "../../_utils/changeElemenetWithArrows/ChangeElementInListWithArrows";
import { getManyUsersReelsByIds } from "../../apiFunctions/getManyReelsByAutorId";
import { ReelInBar } from "./ReelsInBar";
import { ReelsDto } from "../../services/Models/reels.models";

const getIndexFromReelId = (reels: ReelsDto[], reelId: string) => {
  const reel = reels?.find((reel) => reel.Id == reelId);
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
          <div>All stories</div>
          <AllRelations>
            {isFetchedAfterMount &&
              reels &&
              reels.map((reel, index) => {
                if(index == currentReel){
                  return <ReelInBar key={reel.Id} reel={reel} isChoosen/>;
                }
                return <ReelInBar key={reel.Id} reel={reel} />;
              })}
          </AllRelations>
        </BarContent>
      }
      content={
        <Content>
          <div style={{ width: "30rem", height: "100%" }}>
            <div className="box">
              <MediaFile ref={containerRef}>
                {isFetchedAfterMount && reels && (
                  <img src={reels[currentReel!].MediaFile} />
                )}
              </MediaFile>
            </div>
          </div>
          <ChangeElementInListWithArrows
            index={currentReel!}
            setIndex={setCurrentReel}
            length={reels?.length!}
          />
        </Content>
      }
    />
  );
}

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40rem;
  height: 100%;
`;

const MediaFile = styled.div`
  height: 100%;
  width: 30rem;
  background-color: var(--backColor);
  display: flex;
  overflow: hidden;
  & > img {
    width: 100%;
    object-fit: contain;
  }
`;

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
  height: 85%;
  overflow-y: auto;
`;
