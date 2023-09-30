import { axiosBase } from "../globals/apiPaths";

export async function patchPost(post: postDTO) {
  const status = (await axiosBase.patch<responseStatus>(`posts/update`, post))
    .data;

  return { status, post: post };
}
