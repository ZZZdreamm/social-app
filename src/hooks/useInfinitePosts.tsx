import { useInfiniteQuery } from "react-query";
import { useProfilesRelationsContext } from "../services/Contexts/ProfileDataContext";
import { useAuthenticationContext } from "../services/Contexts/AuthenticationContext";

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
      getNextPageParam: (lastPage: any) => {
        if (lastPage?.length === 0) return undefined;
        if (!lastPage || lastPage.length === 0) return;
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
