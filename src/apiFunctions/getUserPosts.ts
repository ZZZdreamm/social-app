import { axiosBase } from "../globals/apiPaths";

export async function getUserPosts(username: string, postsToGet: number) {
  return (
    await axiosBase.get<postDTO[]>(
      `posts/userPosts/${username}?amount=${postsToGet}`
    )
  ).data;
}
