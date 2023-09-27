import { useCallback } from "react";
import { getFriends } from "../apiFunctions/getFriends";
import { ONE_HOUR } from "../globals/constants";
import { useQuery, useQueryClient } from "react-query";
import { getFriendsRequests } from "../apiFunctions/getFriendsRequests";
import { getSentFriendsRequests } from "../apiFunctions/getSentFriendsRequests";

const queryKey = ["sentFriendsRequests"];

export function useSentFriendsRequests() {
  const queryClient = useQueryClient();

  const { data } = useQuery(queryKey, getSentFriendsRequests, {
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
