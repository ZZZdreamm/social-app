import styled from "styled-components";

type ButtonColor = "default" | "blue";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  color?: ButtonColor;
}

export default function Button({
  children,
  color = "default",
  onClick = () => {},
  ...props
}: ButtonProps) {
  return (
    <StyledButton onClick={onClick} color={color} {...props}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button<{ color: ButtonColor }>`
  background-color: ${({ color }) => buttonColors[color]};
`;

export const buttonColors = {
  default: "var(--navColor)",
  blue: "var(--testColor3)",
};
