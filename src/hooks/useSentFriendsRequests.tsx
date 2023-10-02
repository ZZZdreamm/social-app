import { useCallback } from "react";
import { ONE_HOUR } from "../globals/constants";
import { useQuery, useQueryClient } from "react-query";
import { getSentFriendsRequests } from "../apiFunctions/getSentFriendsRequests";
import { useAuthenticationContext } from "../services/Contexts/AuthenticationContext";

const queryKey = ["sentFriendsRequests"];

export function useSentFriendsRequests() {
  const { profile } = useAuthenticationContext();
  const queryClient = useQueryClient();

  const { data } = useQuery(queryKey, getSentFriendsRequests, {
    enabled: profile?.Id != undefined,
    staleTime: ONE_HOUR,
  });

  const invalidateSentFriendsRequests = useCallback(() => {
    queryClient.invalidateQueries(queryKey);
  }, [queryClient]);

  return {
    sentFriendsRequests: data?.data,
    setSentFriendsRequests: invalidateSentFriendsRequests,
  };
}
