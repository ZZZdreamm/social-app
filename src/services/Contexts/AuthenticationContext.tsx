import { createContext, useContext, useMemo } from "react";
import { claim } from "../Models/auth.models";
import { useAuthData } from "../../hooks/useAuthData";
import { useProfile } from "../../hooks/useProfile";
import { profileDTO } from "../Models/profiles.models";

interface ContextProps {
  claims: claim[];
  setClaims(claims: claim[]): void;
  profile: profileDTO | undefined;
  gotClaims: boolean;
  setProfile(profile: profileDTO): void;
  loading: boolean;
}

interface Props {
  children: React.ReactNode;
}

const AuthenticationContext = createContext<ContextProps>({
  claims: [],
  setClaims: () => {},
  profile: undefined,
  gotClaims: false,
  setProfile: () => {},
  loading: true,
});

export function AuthenticationDataProvider({ children }: Props) {
  const { claims, setClaims, gotClaims } = useAuthData();
  const { profile, setProfile, loading } = useProfile();

  const states = useMemo(
    () => ({
      claims,
      setClaims,
      profile,
      gotClaims,
      setProfile,
      loading,
    }),
    [claims, setClaims, gotClaims, profile, setProfile, loading]
  );
  return (
    <AuthenticationContext.Provider value={states}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export const useAuthenticationContext = () => useContext(AuthenticationContext);
