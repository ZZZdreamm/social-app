import { axiosBase } from "../globals/apiPaths";

export async function getComments(
  postId: string,
  lastCommentDate: number,
  amount: number = 10
) {
  const response = await axiosBase.get<commentsDTO[]>(
    `comments/all?postId=${postId}&lastCommentDate=${lastCommentDate}&amount=${amount}`
  );
  const newComments = response.data;
  return newComments;
}
