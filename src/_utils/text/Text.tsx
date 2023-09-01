import { styled } from "styled-components";

enum FontSize {
  vsmall = "0.4rem",
  small = "0.8rem",
  medium = "1.2rem",
  large = "1.6rem",
  vlarge = "2rem",
}

interface TextProps {
  fontSize?: FontSize;
  opacity?: number;
  children: string;
}

export function Text({
  children,
  fontSize = FontSize.medium,
  opacity = 1,
}: TextProps) {
  return (
    <TextContainer fontSize={fontSize} opacity={opacity}>
      {children}
    </TextContainer>
  );
}

const TextContainer = styled.div<TextProps>`
  font-size: ${({ fontSize }) => fontSize};
  opacity: ${({ opacity }) => opacity};
`;
