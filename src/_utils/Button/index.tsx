export default function Button({ children, onClick, ...props }: buttonProps) {
  return (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  );
}
interface buttonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?(): void;
}
