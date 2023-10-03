import { axiosBase } from "../globals/apiPaths";
import { profileDTO } from "../services/Models/profiles.models";

export async function searchFriends(profileId: string, query: string) {
  const response = await axiosBase.get<profileDTO[]>(
    `profiles/searchFriends/${profileId}?query=${query}`
  );
  const friendsSearched = response.data;
}
