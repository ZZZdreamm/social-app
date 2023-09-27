import { ReactElement, useEffect, useState } from "react";
import { useAuthData } from "../../hooks/useAuthData";

export default function Authorized(props: authorizedProps) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const { claims } = useAuthData();

  useEffect(() => {
    if (props.role) {
      const index = claims.findIndex(
        (claim) => claim.name === "role" && claim.value === props.role
      );
      setIsAuthorized(index > -1);
    } else {
      setIsAuthorized(claims.length > 0);
    }
  }, [claims, props.role]);
  return <>{isAuthorized ? props.isAuthorized : props.notAuthorized}</>;
}
interface authorizedProps {
  isAuthorized: ReactElement;
  notAuthorized?: ReactElement;
  role?: string;
}
