import { axiosBase } from "../globals/apiPaths";
import { profileDTO } from "../models/profiles.models";

export async function getSentFriendsRequests() {
  const profileId = localStorage.getItem("id");
  return await axiosBase.get<profileDTO[]>(
    `profiles/getSentFriendRequests/${profileId}`
  );
}
