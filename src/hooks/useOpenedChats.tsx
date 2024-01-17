import { useState } from "react";
import { profileDTO } from "../models/profiles.models";

export function useOpenedChats() {
  const [openedChats, setOpenedChats] = useState<profileDTO[]>([]);
  return { openedChats, setOpenedChats };
}
