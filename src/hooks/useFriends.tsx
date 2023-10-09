import { useCallback } from "react";
import { getFriends } from "../apiFunctions/getFriends";
import { ONE_HOUR } from "../globals/constants";
import { useQuery, useQueryClient } from "react-query";
import { useAuthenticationContext } from "../services/Contexts/AuthenticationContext";

export function useFriends() {
  const { profile } = useAuthenticationContext();
  const queryClient = useQueryClient();
  const queryKey = [`friends/${profile?.Id}`];

  const { data, isFetchedAfterMount } = useQuery(
    queryKey,
    () => getFriends(profile?.Id!),
    {
      enabled: profile?.Id != undefined,
      staleTime: ONE_HOUR,
    }
  );

  const invalidateFriends = useCallback(() => {
    queryClient.invalidateQueries(queryKey);
  }, [queryClient]);

  return {
    friends: data?.data,
    setFriends: invalidateFriends,
    fetchedFriendsAfterMount: isFetchedAfterMount,
  };
}
