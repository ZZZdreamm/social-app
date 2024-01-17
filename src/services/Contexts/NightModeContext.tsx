import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { claim } from "../../models/auth.models";
import { useAuthData } from "../../hooks/useAuthData";
import { useProfile } from "../../hooks/useProfile";
import { profileDTO } from "../../models/profiles.models";

interface ContextProps {
  nightMode: boolean;
  setNightMode(nightMode: boolean): void;
}

interface Props {
  children: React.ReactNode;
}

const NightModeContext = createContext<ContextProps>({
  nightMode: false,
  setNightMode: () => {},
});

export function NightModeProvider({ children }: Props) {
  const [nightMode, setNightMode] = useState(() => {
    const darkMode = localStorage.getItem("nightMode");
    return darkMode === "true" ? true : false;
  });

  const nightModeValue = localStorage.getItem("nightMode");

  useEffect(() => {
    if (nightModeValue === "true") {
      setNightMode(true);
    } else {
      setNightMode(false);
    }
  }, [nightModeValue]);

  const states = useMemo(
    () => ({ nightMode, setNightMode }),
    [nightMode, setNightMode]
  );
  return (
    <NightModeContext.Provider value={states}>
      {children}
    </NightModeContext.Provider>
  );
}

export const useNightModeContext = () => useContext(NightModeContext);
