import { axiosBase } from "../globals/apiPaths";

export async function getPosts(postsOffset: number) {
  const newPosts = (await axiosBase.get<postDTO[]>(`posts/all/${postsOffset}`))
    .data;
  return newPosts;
}
