import { useCallback } from "react";
import { getFriends } from "../apiFunctions/getFriends";
import { ONE_HOUR } from "../globals/constants";
import { useQuery, useQueryClient } from "react-query";
import { useAuthenticationContext } from "../services/Contexts/AuthenticationContext";

const queryKey = ["friends"];

export function useFriends() {
  const { profile } = useAuthenticationContext();
  const queryClient = useQueryClient();

  const { data } = useQuery(queryKey, getFriends, {
    enabled: profile?.Id != undefined,
    staleTime: ONE_HOUR,
  });

  const invalidateFriends = useCallback(() => {
    queryClient.invalidateQueries(queryKey);
  }, [queryClient]);

  return { friends: data?.data, setFriends: invalidateFriends };
}
