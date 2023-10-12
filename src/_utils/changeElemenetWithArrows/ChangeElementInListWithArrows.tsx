import { useEffect, useRef, useState } from "react";
import { ReadyImagesURL } from "../../globals/appUrls";

interface ScrollingMediaFilesProps {
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  length: number;
}

export function ChangeElementInListWithArrows({
  index,
  setIndex,
  length,
}: ScrollingMediaFilesProps) {
  const leftScrollRef = useRef<HTMLDivElement | null>(null);
  const rightScrollRef = useRef<HTMLDivElement | null>(null);

  const [isScrolledToEnd, setIsScrolledToEnd] = useState("flex");
  const [isScrollAtStart, setIsScrollAtStart] = useState("none");


  useEffect(() => {
    if (!leftScrollRef.current || !rightScrollRef.current) return;
    leftScrollRef.current.addEventListener("click", () => {
      setIndex((prev) => prev! - 1);
    });
    rightScrollRef.current.addEventListener("click", () => {
      setIndex((prev) => prev! + 1);
    });
  }, [leftScrollRef, rightScrollRef]);

  useEffect(() => {
    if (index == 0) setIsScrollAtStart("none");
    else setIsScrollAtStart("flex");
    if (index == length - 1) setIsScrolledToEnd("none");
    else setIsScrolledToEnd("flex");
  }, [index, length]);
  return (
    <>
      <div
        ref={leftScrollRef}
        className="scroll scroll-left"
        style={{ display: `${isScrollAtStart}` }}
      >
        <img src={`${ReadyImagesURL}/goBackArrow.png`} alt="" />
      </div>
      <div
        ref={rightScrollRef}
        className="scroll scroll-right"
        style={{ display: `${isScrolledToEnd}` }}
      >
        <img src={`${ReadyImagesURL}/goBackArrow.png`} alt="" />
      </div>
    </>
  );
}
