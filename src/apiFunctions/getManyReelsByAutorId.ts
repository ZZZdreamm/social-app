import { axiosBase } from "../globals/apiPaths";

export async function getManyUsersReelsByIds(autorsIds: string[]) {
  const response = await axiosBase.post(`/reels/getUserReels`, autorsIds);
  return response.data;
}
