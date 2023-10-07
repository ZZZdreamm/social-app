import { useInfiniteQuery } from "react-query";
import { useAuthenticationContext } from "../services/Contexts/AuthenticationContext";
import { messageDTO } from "../services/Models/message.models";

const PAGE_SIZE = 10;
const FETCHING_TIME = 400;

export function useInfiniteMessages(
  getMessagesFn: any,
  queryName: string,
  friendId: string
) {
  const { profile } = useAuthenticationContext();
  const {
    data: _messages,
    isFetchingPreviousPage,
    hasPreviousPage,
    fetchPreviousPage,
  } = useInfiniteQuery(
    [queryName],
    async ({ pageParam }) => {
      let response: messageDTO[];
      if (!profile?.Id) return [];
      await new Promise((resolve) => setTimeout(resolve, FETCHING_TIME));
      response = await getMessagesFn(
        profile.Id,
        friendId,
        pageParam?.date,
        pageParam?.amount
      );
      return response.reverse();
    },
    {
      getPreviousPageParam: (lastPage: any, allPages: any[]) => {
        if (allPages && lastPage?.length === 0) return undefined;
        if (!lastPage || lastPage.length === 0) return [];
        const lastPageDate = Array.isArray(lastPage)
          ? lastPage.slice(0)[0].Date
          : lastPage.Date;
        return { date: lastPageDate, amount: PAGE_SIZE };
      },
      initialData: {
        pages: [],
        pageParams: [],
      },
    }
  );

  const messages = _messages?.pages.flatMap((page) => page);

  return {
    messages,
    fetchPreviousPage,
    isFetchingPreviousPage,
    hasPreviousPage,
  };
}
