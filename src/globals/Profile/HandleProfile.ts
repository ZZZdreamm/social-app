import { profileDTO } from "../../models/profiles.models";
import { ReadyImagesURL } from "../appUrls";

export function saveProfile(
  userId: string,
  email: string,
  profileImage: string
) {
  localStorage.setItem("id", userId);
  localStorage.setItem("email", email);
  localStorage.setItem("profileImage", profileImage);
}
export function getProfile(): profileDTO {
  const id = localStorage.getItem("id");
  const email = localStorage.getItem("email");
  const profileImage =
    localStorage.getItem("profileImage") || `${ReadyImagesURL}/noProfile.jpg`;
  const response: profileDTO = { Id: id!, Email: email! };
  if (profileImage) {
    response.ProfileImage = profileImage;
  } else {
    response.ProfileImage = `${ReadyImagesURL}/noProfile.jpg`;
  }
  return response;
}
