import { createContext, useContext, useMemo } from "react";
import { useOpenedChats } from "../../hooks/useOpenedChats";
import { profileDTO } from "../../models/profiles.models";

interface ContextProps {
  openedChats: profileDTO[];
  setOpenedChats(openedChats: profileDTO[]): void;
}

interface Props {
  children: React.ReactNode;
}

const OpenedChatsContext = createContext<ContextProps>({
  openedChats: [],
  setOpenedChats: () => {},
});

export function OpenedChatsProvider({ children }: Props) {
  const { openedChats, setOpenedChats } = useOpenedChats();
  const states = useMemo(
    () => ({
      openedChats,
      setOpenedChats,
    }),
    [openedChats, setOpenedChats]
  );

  return (
    <OpenedChatsContext.Provider value={states}>
      {children}
    </OpenedChatsContext.Provider>
  );
}

export const useOpenedChatsContext = () => useContext(OpenedChatsContext);
