import { axiosBase } from "../globals/apiPaths";
import { profileDTO } from "../models/profiles.models";

export async function searchFriends(
  query: string,
  profileId: string | undefined
) {
  const response = await axiosBase.get<profileDTO[]>(
    `profiles/searchFriends/${profileId}?query=${query}`
  );
  const friendsSearched = response.data;
  return friendsSearched;
}
