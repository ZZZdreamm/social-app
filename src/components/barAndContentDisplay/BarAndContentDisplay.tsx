import Portal from "../../_utils/Portal/Portal";
import { CloseButton } from "../../_utils/closeButton/CloseButton";
import { ReadyImagesURL } from "../../globals/appUrls";
import { ProfileImage } from "../ProfileImage/ProfileImage";
import "./style.scss";

interface BarAndContentDisplayProps {
  bar: JSX.Element;
  content: JSX.Element;
}

export function BarAndContentDisplay({
  bar,
  content,
}: BarAndContentDisplayProps) {
  return (
    <Portal>
      <div className="page">
        <div className="page-bar">
          <div className="page-bar__nav">
            <CloseButton />
            <ProfileImage
              imageURL={`${ReadyImagesURL}/logo.png`}
              sizeInRem={3}
            />
          </div>
          {bar}
        </div>
        <div className="page-content">{content}</div>
      </div>
    </Portal>
  );
}
