import { createContext, useContext, useMemo } from "react";
import { claim } from "../Models/auth.models";
import { useAuthData } from "../../hooks/useAuthData";

interface ContextProps {
  claims: claim[];
  setClaims(claims: claim[]): void;
  gotClaims: boolean;
}

interface Props {
  children: React.ReactNode;
}

const AuthenticationContext = createContext<ContextProps>({
  claims: [],
  setClaims: () => {},
  gotClaims: false,
});

export function AuthenticationDataProvider({ children }: Props) {
  const { claims, setClaims, gotClaims } = useAuthData();

  const states = useMemo(
    () => ({
      claims,
      setClaims,
      gotClaims,
    }),
    [claims, setClaims, gotClaims]
  );
  return (
    <AuthenticationContext.Provider value={states}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export const useAuthenticationContext = () =>
  useContext(AuthenticationContext);
