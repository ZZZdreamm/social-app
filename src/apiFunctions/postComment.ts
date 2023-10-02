import { axiosBase } from "../globals/apiPaths";

export async function postComment(
  postId: string,
  autorId: string,
  textContent: string
) {
  const commentCreateDto = {
    PostId: postId,
    UserId: autorId,
    TextContent: textContent,
    Date: Date.now(),
  };
  const response = await axiosBase.post<commentsDTO>(
    `comments/create`,
    commentCreateDto
  );
  const comment = response.data;
  return comment;
}
