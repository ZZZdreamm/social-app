import styled from "styled-components";
import { ReadyImagesURL } from "../../globals/appUrls";

interface ProfileImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  imageURL: string | undefined;
  padding?: number;
  alt?: string;
  sizeInRem?: number;
  onClick?: () => void;
  children?: React.ReactNode;
}

export function ProfileImage({
  imageURL,
  alt = "empty",
  sizeInRem = 2.4,
  onClick = () => {},
  padding = 0,
  children,
  ...props
}: ProfileImageProps) {
  const image = imageURL || `${ReadyImagesURL}/noProfile.jpg`;
  return (
    <Image
      size={sizeInRem}
      padding={padding}
      data-testid="profileImage"
      src={image}
      alt={alt}
      onClick={onClick}
      {...props}
    >
      {children}
    </Image>
  );
}

const Image = styled.img<{
  size: number;
  padding: number;
}>`
  width: ${(props) => props.size}rem;
  height: ${(props) => props.size}rem;
  padding: ${(props) => props.padding}rem;
  border-radius: 50%;
  cursor: pointer;
`;
