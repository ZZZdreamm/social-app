import { axiosBase } from "../globals/apiPaths";

export async function getOneReel(reelId: string) {
  const response = await axiosBase.get(`reels/getReel/${reelId}`);
  return response.data;
}
