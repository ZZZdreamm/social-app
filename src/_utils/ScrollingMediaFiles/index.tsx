import "./style.scss";
import { useEffect, useRef, useState } from "react";
import { ReadyImagesURL } from "./../../globals/appUrls";
import { ScrollListWithArrows } from "../scrollListWithArrows/ScrollListWithArrows";

interface ScrollingMediaFilesProps {
  mediaFiles: string[] | undefined;
}

export default function ScrollingMediaFiles({
  mediaFiles,
}: ScrollingMediaFilesProps) {
  const filesContainerRef = useRef<HTMLDivElement | null>(null);
  return (
    <>
      {mediaFiles && (
        <div className="box">
          <div ref={filesContainerRef} className="container">
            {mediaFiles.map((oneFile) => (
              <span key={oneFile} className="element">
                {(oneFile.includes(".jpg") ||
                  oneFile.includes(".jpeg") ||
                  oneFile.includes(".png")) && (
                  <img src={oneFile} alt="Loading" />
                )}
                {oneFile.includes(".mp4") && (
                  <video controls>
                    <source src={oneFile} type="video/mp4" />
                  </video>
                )}
              </span>
            ))}
          </div>
          {mediaFiles.length > 1 && (
            <ScrollListWithArrows containerRef={filesContainerRef} />
          )}
        </div>
      )}
    </>
  );
}
