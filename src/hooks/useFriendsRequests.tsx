import { useCallback } from "react";
import { ONE_HOUR } from "../globals/constants";
import { useQuery, useQueryClient } from "react-query";
import { getFriendsRequests } from "../apiFunctions/getFriendsRequests";
import { useAuthenticationContext } from "../services/Contexts/AuthenticationContext";

const queryKey = ["friendsRequests"];

export function useFriendsRequests() {
  const queryClient = useQueryClient();
  const { profile } = useAuthenticationContext();

  const { data } = useQuery(queryKey, getFriendsRequests, {
    enabled: profile?.Id != undefined,
    staleTime: ONE_HOUR,
  });

  const invalidateFriendsRequests = useCallback(() => {
    queryClient.invalidateQueries(queryKey);
  }, [queryClient]);

  return {
    friendsRequests: data?.data,
    setFriendsRequests: invalidateFriendsRequests,
  };
}
