import { useCallback } from "react";
import { ONE_HOUR } from "../globals/constants";
import { useQuery, useQueryClient } from "react-query";
import { getFriendsRequests } from "../apiFunctions/getFriendsRequests";

const queryKey = ["friendsRequests"];

export function useFriendsRequests() {
  const queryClient = useQueryClient();

  const { data } = useQuery(queryKey, getFriendsRequests, {
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
