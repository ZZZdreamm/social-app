import { useEffect, useRef, useState } from "react";
import { ReadyImagesURL } from "../../globals/appUrls";
import "./style.scss";
import { GoBackArrowIcon } from "assets/icons/GoBackArrowIcon";
import { FriendsIcon } from "assets/icons/FriendsIcon";
import { HomePageIcon } from "assets/icons/HomePageIcon";

interface ScrollingMediaFilesProps {
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
}

export function ScrollListWithArrows({
  containerRef,
}: ScrollingMediaFilesProps) {
  const leftScrollRef = useRef<HTMLDivElement | null>(null);
  const rightScrollRef = useRef<HTMLDivElement | null>(null);

  const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);
  const [isScrollAtStart, setIsScrollAtStart] = useState(false);

  useEffect(() => {
    setIsScrollAtStart(true);
  }, []);

  useEffect(() => {
    if (
      !containerRef.current ||
      !leftScrollRef.current ||
      !rightScrollRef.current
    )
      return;
    leftScrollRef.current.addEventListener("click", () => {
      containerRef.current!.scrollBy({
        left: -containerRef.current!.offsetWidth,
        behavior: "smooth",
      });
    });
    rightScrollRef.current.addEventListener("click", () => {
      containerRef.current!.scrollBy({
        left: containerRef.current!.offsetWidth,
        behavior: "smooth",
      });
    });

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current!;

      const isAtEnd = Math.floor(scrollLeft) + clientWidth >= scrollWidth - 10;
      const isAtStart = scrollLeft == 0;
      setIsScrolledToEnd(isAtEnd);
      setIsScrollAtStart(isAtStart);
    };

    containerRef.current.addEventListener("scroll", handleScroll);
  }, [
    containerRef,
    leftScrollRef,
    rightScrollRef,
    isScrolledToEnd,
    isScrollAtStart,
  ]);
  return (
    <>
      {!isScrollAtStart && (
        <div ref={leftScrollRef} className="scroll scroll-left">
          <GoBackArrowIcon />
        </div>
      )}
      {!isScrolledToEnd && (
        <div ref={rightScrollRef} className="scroll scroll-right">
          <GoBackArrowIcon />
        </div>
      )}
    </>
  );
}
