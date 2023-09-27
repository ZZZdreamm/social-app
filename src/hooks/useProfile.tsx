import { useEffect, useState } from "react";
import { profileDTO } from "../services/Models/profiles.models";
import { getProfile } from "../globals/Profile/HandleProfile";

export function useProfile() {
  const [profile, setProfile] = useState<profileDTO>();

  useEffect(() => {
    setProfile(getProfile());
  }, []);

  useEffect(() => {
    setProfile(getProfile());
  }, [localStorage]);

  return { profile, setProfile };
}
