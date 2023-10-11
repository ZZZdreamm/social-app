import { axiosBase } from "../globals/apiPaths";
import { ReelsCreationDto } from "../services/Models/reels.models";

export async function postReels(reelsCreationDto: ReelsCreationDto) {
  console.log(reelsCreationDto);

  const formData = new FormData();
  Object.entries(reelsCreationDto).forEach(([key, value]) => {
    formData.append(key, value);
  });
  const response = await axiosBase.post("reels/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  const createdReel = response.data;
  console.log(createdReel);
  return createdReel;
}
