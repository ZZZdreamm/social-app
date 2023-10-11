type ButtonColor = "default";

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
    <button onClick={onClick} {...props}>
      {children}
    </button>
  );
}

export const buttonColors = {
  default: "var(--navColor)",
};
