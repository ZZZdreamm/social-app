import "./style.scss";
import { useNavigate } from "react-router-dom";
export default function GoToMenuButton({ appName }: { appName: string }) {
  const navigate = useNavigate();

  return (
    <div
      className="go-back-button"
      onClick={() => {
        navigate("/");
      }}
    >
      {appName}
    </div>
  );
}
