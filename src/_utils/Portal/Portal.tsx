import ReactDOM from "react-dom";

export default function Portal({ children }: any) {
    if (typeof document == "undefined") {
      return <>{children}</>;
    }
    return ReactDOM.createPortal(children, document.body);
  }


export function ChoosenPortal({ children, portalDirection }: any) {
    if (typeof document == "undefined") {
      return <>{children}</>;
    }
    return ReactDOM.createPortal(children, portalDirection);
  }