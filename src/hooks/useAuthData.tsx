import { useEffect, useState } from "react";
import { claim } from "../models/auth.models";
import { getClaims } from "../globals/Auth/HandleJWT";

export function useAuthData() {
  const [claims, setClaims] = useState<claim[]>([]);
  const [gotClaims, setGotClaims] = useState(false);

  useEffect(() => {
    setClaims(getClaims());
  }, []);

  useEffect(() => {
    setClaims(getClaims());
    setGotClaims(true);
  }, [localStorage]);

  return { claims, setClaims, gotClaims };
}
