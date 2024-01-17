import { axiosBase } from "../globals/apiPaths";
import { profileDTO } from "../models/profiles.models";

export async function searchUsers(query: string, profileId: string | undefined) {
  const response = await axiosBase.get<profileDTO[]>(
    `profiles/search/${query}?userId=${profileId}`
  );
  const searchedUsers = response?.data;
  return searchedUsers;
}
