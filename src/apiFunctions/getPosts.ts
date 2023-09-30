import { axiosBase } from "../globals/apiPaths";

export async function getPosts(previousPostDate: string) {
  const newPosts = (
    await axiosBase.get<postDTO[]>(`posts/all/${previousPostDate}`)
  ).data;
  return newPosts;
}
