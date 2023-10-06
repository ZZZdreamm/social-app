import { axiosBase } from "../globals/apiPaths";

export async function getPosts(previousPostDate: string) {
  const response = await axiosBase.get<postDTO[]>(
    `posts/all/${previousPostDate}`
  );
  const newPosts = response.data;
  return newPosts;
}
