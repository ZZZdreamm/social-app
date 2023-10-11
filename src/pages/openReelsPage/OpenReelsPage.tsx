import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getOneReel } from "../../apiFunctions/getOneReel";
import { ONE_HOUR } from "../../globals/constants";
import styled from "styled-components";
import { BarAndContentDisplay } from "../../components/barAndContentDisplay/BarAndContentDisplay";
import { ScrollListWithArrows } from "../../_utils/scrollListWithArrows/ScrollListWithArrows";
import { useRef } from "react";

export function OpenReelsPage() {
  const { reelId } = useParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const { data: reel } = useQuery(`reel/${reelId}`, () => getOneReel(reelId!), {
    enabled: reelId != undefined,
    staleTime: ONE_HOUR,
  });

  return (
    <BarAndContentDisplay
      bar={<></>}
      content={
        <Content>
          <div style={{ width: "30rem" }}>
            <div className="box">
              <MediaFile ref={containerRef}>
                <img src={reel?.MediaFile} />
              </MediaFile>
            </div>
          </div>
          {<ScrollListWithArrows containerRef={containerRef} />}
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
  background-color: var(--navColor);
`;

const MediaFile = styled.div`
  height: 100%;
  width: 30rem;
  background-color: var(--backColor);
  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
