import { axiosBase } from "../globals/apiPaths";

export async function postPost(post: postCreationDTO) {
  return (await axiosBase.post<postDTO>("posts/create", post)).data;
}
