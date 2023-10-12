import styled from "styled-components";
import Portal from "../../_utils/Portal/Portal";
import { CloseButton } from "../../_utils/closeButton/CloseButton";
import { EnterFrom } from "../../_utils/enterFrom/EnterFrom";
import { ReadyImagesURL } from "../../globals/appUrls";
import { ProfileImage } from "../ProfileImage/ProfileImage";
import "./style.scss";

interface BarAndContentDisplayProps {
  bar: JSX.Element;
  content: JSX.Element;
  contentBackgroundColor?: string;
}

export function BarAndContentDisplay({
  bar,
  content,
  contentBackgroundColor = "backColor",
}: BarAndContentDisplayProps) {
  return (
    <Portal>
      <div className="page">
        <div
          className="page-bar"
        >
          <div className="page-bar__nav">
            <EnterFrom from="left" start="-3.5rem">
              <div className="navbar">
                <CloseButton />
                <ProfileImage
                  imageURL={`${ReadyImagesURL}/logo.png`}
                  sizeInRem={3}
                />
              </div>
            </EnterFrom>
          </div>
          {bar}
        </div>
        <div className="page-content">
          <Container contentBackgroundColor={contentBackgroundColor}>
            {content}
          </Container>
        </div>
      </div>
    </Portal>
  );
}

const Container = styled.div<{
  contentBackgroundColor?: string;
}>`
  background-color: ${({ contentBackgroundColor }) =>
    `var(--${contentBackgroundColor})`};
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
