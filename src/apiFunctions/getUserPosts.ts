import { axiosBase } from "../globals/apiPaths";

export async function getUserPosts(username: string, previousPostDate: string) {
  return (
    await axiosBase.get<postDTO[]>(
      `posts/userPosts/${username}?previousPostDate=${previousPostDate}`
    )
  ).data;
}
