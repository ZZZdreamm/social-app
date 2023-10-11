import { useInfiniteQuery } from "react-query";
import { useAuthenticationContext } from "../services/Contexts/AuthenticationContext";
import { ReelsDto } from "../services/Models/reels.models";

const PAGE_SIZE = 10;

export function useInfiniteReels(getReelsFn: any, queryName: string) {
  const { profile } = useAuthenticationContext();
  const {
    data: _reels,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isFetchedAfterMount,
  } = useInfiniteQuery(
    [queryName],
    async ({ pageParam }) => {
      let response: ReelsDto[];
      if (!profile?.Id) return [];
      response = await getReelsFn(pageParam);
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
          ? lastPage.slice(-1)[0].CreationTime
          : lastPage.CreationTime;
        return lastPageDate;
      },
      initialData: {
        pages: [],
        pageParams: [],
      },
    }
  );

  const reels = _reels?.pages.flatMap((page) => page);

  return {
    reels,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isFetchedAfterMount,
  };
}
