import { useEffect, useRef, useState } from "react";
import "./style.scss";
import { ReadyImagesURL } from "./../../globals/appUrls";
import Portal from "../Portal/Portal";

interface ShowFullImagesProps {
  images: string[];
  toggleModal: () => void;
}
export default function ShowFullImages({
  images,
  toggleModal,
}: ShowFullImagesProps) {
  const [currentImage, setCurrentImage] = useState(0);

  const leftScrollRef = useRef<HTMLDivElement | null>(null);
  const rightScrollRef = useRef<HTMLDivElement | null>(null);

  const [isScrolledToEnd, setIsScrolledToEnd] = useState(true);
  const [isScrollAtStart, setIsScrollAtStart] = useState(true);

  useEffect(() => {
    if (!Number.isInteger(currentImage)) return;
    setIsScrollAtStart(currentImage === 0);
    setIsScrolledToEnd(currentImage === images.length - 1);
  }, [currentImage]);

  return (
    <Portal>
      <div className="showFullImages">
        <div className="showFullImages-container">
          <img
            className="showFullImages-container__close"
            src={`${ReadyImagesURL}/close.png`}
            alt=""
            onClick={toggleModal}
          />
          <div className="showFullImages-container__image">
            <img src={images[currentImage]} alt="image" />
          </div>

          {!isScrollAtStart && (
            <div
              ref={leftScrollRef}
              className="scrollImages scrollImages-left"
              onClick={() => setCurrentImage((prev) => prev - 1)}
            >
              <img src={`${ReadyImagesURL}/goBackArrow.png`} alt="" />
            </div>
          )}
          {!isScrolledToEnd && (
            <div
              ref={rightScrollRef}
              className="scrollImages scrollImages-right"
              onClick={() => setCurrentImage((prev) => prev + 1)}
            >
              <img src={`${ReadyImagesURL}/goBackArrow.png`} alt="" />
            </div>
          )}
        </div>
      </div>
    </Portal>
  );
}
