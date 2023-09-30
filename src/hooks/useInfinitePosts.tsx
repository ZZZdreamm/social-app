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
      let response: postDTO[];
      if (username) {
        response = await getPostsFn(username, pageParam);
      } else {
        response = await getPostsFn(pageParam);
      }
      return response;
    },
    {
      getNextPageParam: (lastPage: any) => {
        if (lastPage?.length === 0) return undefined;
        if (!lastPage || lastPage.length === 0) return;
        console.log(lastPage);
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

  return { posts, fetchNextPage, isFetchingNextPage, hasNextPage };
}
