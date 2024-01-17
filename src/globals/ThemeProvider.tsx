import { ThemeProvider as Provider } from "styled-components";
import { darkTheme, theme } from "./constants";
import { useEffect, useState } from "react";
import { useNightModeContext } from "services/Contexts/NightModeContext";

interface Props {
  children: React.ReactNode;
}
export default function ThemeProvider({ children }: Props) {
  const { nightMode } = useNightModeContext();
  const [currentTheme, setCurrentTheme] = useState(() => {
    return nightMode ? darkTheme : theme;
  });

  useEffect(() => {
    setCurrentTheme(nightMode ? darkTheme : theme);
  }, [nightMode]);

  return <Provider theme={currentTheme}>{children}</Provider>;
}
