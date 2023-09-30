import { useInfiniteQuery } from "react-query";

export function useInfinitePosts(
  getPostsFn: any,
  queryName: string,
  username?: string
) {
  const {
    data: _posts,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    [queryName],
    async ({ pageParam }) => {
      let response;
      if (username) {
        response = await getPostsFn(username, pageParam);
      } else {
        response = await getPostsFn(pageParam);
      }
      return response;
    },
    {
      getNextPageParam: (pages) => {
        if (!pages || pages.length === 0) return;
        const lastPageId = Array.isArray(pages[0])
          ? pages[0].slice(-1)[0].Date
          : pages.slice(-1)[0].Date;
        return lastPageId;
      },
      initialData: {
        pages: [],
        pageParams: [],
      },
    }
  );

  const posts = _posts?.pages.flatMap((page) => page);

  return { posts, fetchNextPage, isFetchingNextPage, hasNextPage };
}
