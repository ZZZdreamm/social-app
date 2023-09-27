import { useState } from "react";
import { profileDTO } from "../services/Models/profiles.models";

export function useOpenedChats() {
  const [openedChats, setOpenedChats] = useState<profileDTO[]>([]);
  return { openedChats, setOpenedChats };
}
