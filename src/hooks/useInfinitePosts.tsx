import { useInfiniteQuery } from "react-query";
import { useAuthenticationContext } from "../services/Contexts/AuthenticationContext";

const PAGE_SIZE = 10;

export function useInfinitePosts(
  getPostsFn: any,
  queryName: string,
  username?: string
) {
  const { profile } = useAuthenticationContext();
  const {
    data: _posts,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isFetchedAfterMount,
  } = useInfiniteQuery(
    [queryName],
    async ({ pageParam }) => {
      let response: postDTO[];
      if (!profile?.Id) return [];
      if (username) {
        response = await getPostsFn(username, pageParam);
      } else {
        response = await getPostsFn(pageParam);
      }
      return response;
    },
    {
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
        return lastPageDate;
      },
      initialData: {
        pages: [],
        pageParams: [],
      },
    }
  );

  const posts = _posts?.pages.flatMap((page) => page);

  return {
    posts,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isFetchedAfterMount,
  };
}
