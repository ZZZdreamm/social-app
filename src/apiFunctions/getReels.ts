import { axiosBase } from "../globals/apiPaths";
import { ReelsDto } from "../services/Models/reels.models";

export async function getReels(startingPoint: number, amount: number = 10) {
  const response = await axiosBase.get<ReelsDto[]>(`/reels/getReels?lastReelsDate=${startingPoint}&amount=${amount}`);
  return response.data;
}
