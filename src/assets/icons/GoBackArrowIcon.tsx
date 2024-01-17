import { ThemeColor } from "globals/constants";
import styled from "styled-components";

interface Props {
  size?: string;
  color?: ThemeColor;
  rotation?: string;
}

export function GoBackArrowIcon({
  size = "1rem",
  color = "black",
  rotation = "0",
}: Props) {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 512.000000 512.000000"
      preserveAspectRatio="xMidYMid meet"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <PathContainer
        transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
        stroke="none"
        color={color}
      >
        <path
          d="M1725 4341 c-57 -27 -1688 -1662 -1710 -1713 -20 -49 -19 -94 4 -143
13 -27 281 -301 852 -871 677 -676 841 -834 873 -844 83 -26 177 14 215 92 25
52 27 95 6 146 -11 26 -217 238 -683 705 l-667 667 2179 0 2180 0 44 21 c134
65 133 259 -2 320 -40 18 -120 19 -2221 19 l-2180 0 672 673 c542 543 673 679
683 711 26 83 -14 177 -92 215 -54 26 -101 26 -153 2z"
        />
      </PathContainer>
    </svg>
  );
}

const PathContainer = styled.g<{
  color: ThemeColor;
}>`
  fill: ${(props) => props.theme.colors[props.color]};
`;
