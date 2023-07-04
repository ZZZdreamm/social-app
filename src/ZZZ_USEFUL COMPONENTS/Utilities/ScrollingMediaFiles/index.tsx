import "./style.scss";
import { useEffect, useRef, useState } from "react";
import { ReadyImagesURL } from "../../appUrls";
import AdjustedImage from "../AdjustedImage";

interface ScrollingMediaFilesProps {
  mediaFiles: string[] | undefined;
}

export default function ScrollingMediaFiles({
  mediaFiles,
}: ScrollingMediaFilesProps) {
  const filesContainerRef = useRef<HTMLDivElement | null>(null);
  const leftScrollRef = useRef<HTMLDivElement | null>(null);
  const rightScrollRef = useRef<HTMLDivElement | null>(null);

  const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);
  const [isScrollAtStart, setIsScrollAtStart] = useState(false);

  useEffect(() => {
    setIsScrollAtStart(true);
  }, []);

  useEffect(() => {
    if (
      !filesContainerRef.current ||
      !leftScrollRef.current ||
      !rightScrollRef.current
    )
      return;
    leftScrollRef.current.addEventListener("click", () => {
      filesContainerRef.current!.scrollBy({
        left: -filesContainerRef.current!.offsetWidth,
        behavior: "smooth",
      });
    });
    rightScrollRef.current.addEventListener("click", () => {
      filesContainerRef.current!.scrollBy({
        left: filesContainerRef.current!.offsetWidth,
        behavior: "smooth",
      });
    });

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } =
        filesContainerRef.current!;

      const isAtEnd = Math.floor(scrollLeft) + clientWidth >= scrollWidth - 10;
      const isAtStart = scrollLeft == 0;
      setIsScrolledToEnd(isAtEnd);
      setIsScrollAtStart(isAtStart);
    };

    filesContainerRef.current.addEventListener("scroll", handleScroll);
  }, [
    filesContainerRef,
    leftScrollRef,
    rightScrollRef,
    isScrolledToEnd,
    isScrollAtStart,
  ]);
  console.log(mediaFiles);
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
                  // <AdjustedImage image={oneFile} />
                  <img src={oneFile} alt="Loading"/>
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
            <>
              {!isScrollAtStart && (
                <div
                  ref={leftScrollRef}
                  style={{
                    backgroundImage: `url(${ReadyImagesURL}/goBackArrow.png)`,
                  }}
                  className="scroll scroll-left"
                />
              )}
              {!isScrolledToEnd && (
                <div
                  ref={rightScrollRef}
                  style={{
                    backgroundImage: `url(${ReadyImagesURL}/goBackArrow.png)`,
                  }}
                  className="scroll scroll-right"
                />
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}
