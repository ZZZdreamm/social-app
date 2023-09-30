import { axiosBase } from "../globals/apiPaths";

export async function deletePost(postId: string) {
  const status = (
    await axiosBase.delete<responseStatus>(`posts/delete?postId=${postId}`)
  ).data;
  return { status, postId };
}
