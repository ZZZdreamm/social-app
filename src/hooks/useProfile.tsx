import { useEffect, useState } from "react";
import { profileDTO } from "../models/profiles.models";
import { getProfile } from "../globals/Profile/HandleProfile";

export function useProfile() {
  const [profile, setProfile] = useState<profileDTO>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const profile = getProfile()
    setProfile(profile);
    if (profile) {
      setLoading(false);
    }
  }, []);

  return { profile, setProfile, loading };
}
