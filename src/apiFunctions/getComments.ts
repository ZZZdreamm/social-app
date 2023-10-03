import { axiosBase } from "../globals/apiPaths";

const DEFAULT_PAGE_SIZE = 10;

export async function getComments(
  postId: string,
  lastCommentDate: number,
  amount: number = DEFAULT_PAGE_SIZE
) {
  const response = await axiosBase.get<commentsDTO[]>(
    `comments/all?postId=${postId}&lastCommentDate=${lastCommentDate}&amount=${amount}`
  );
  const newComments = response.data;
  return newComments;
}
