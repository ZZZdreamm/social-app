import { useInfiniteQuery } from "react-query";
import { useAuthenticationContext } from "../services/Contexts/AuthenticationContext";

const PAGE_SIZE = 10;
const FETCHING_TIME = 300;

export function useInfiniteComments(
  getCommentsFn: any,
  queryName: string,
  postId: string,
  canFetch: boolean = true
) {
  const { profile } = useAuthenticationContext();
  const {
    data: _comments,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    [queryName],
    async ({ pageParam }) => {
      let response: commentsDTO[];
      if (!profile?.Id) return [];
      await new Promise((resolve) => setTimeout(resolve, FETCHING_TIME));
      response = await getCommentsFn(
        postId,
        pageParam?.date,
        pageParam?.amount
      );
      return response;
    },
    {
      enabled: canFetch,
      getNextPageParam: (lastPage: any, allPages: any[]) => {
        if (
          (allPages && lastPage?.length === 0) ||
          lastPage?.length < PAGE_SIZE
        )
          return undefined;
        if (!lastPage || lastPage.length === 0) return [];
        const lastPageDate = Array.isArray(lastPage)
          ? lastPage.slice(-1)[0].Date
          : lastPage.Date;
        return { date: lastPageDate, amount: PAGE_SIZE };
      },
      initialData: {
        pages: [],
        pageParams: [],
      },
    }
  );

  const comments = _comments?.pages.flatMap((page) => page);

  return {
    comments,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  };
}
