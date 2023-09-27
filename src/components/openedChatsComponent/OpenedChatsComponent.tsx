import { useOpenedChatsContext } from "../../services/Contexts/OpenedChatsContext";
import OpenedChats from "../Messages/OpenedChats";

export function OpenedChatsComponent() {
  const { openedChats } = useOpenedChatsContext();
  return <OpenedChats openedChats={openedChats} />;
}
