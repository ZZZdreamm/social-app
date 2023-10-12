import { useEffect } from "react";
import { getReels } from "../../apiFunctions/getReels";
import { useInfiniteReels } from "../../hooks/useInfiniteReels";
import { useAuthenticationContext } from "../../services/Contexts/AuthenticationContext";
import { ReelsList } from "../reelsList/ReelsList";
import styled from "styled-components";
import { useQuery } from "react-query";
interface ReelsPanelProps {
  queryName: string;
}

export function ReelsPanel({ queryName }: ReelsPanelProps) {
  const { data: reels, isFetchedAfterMount } = useQuery(queryName, () =>
    getReels(undefined, 10)
  );

  return (
    <div>
      {(isFetchedAfterMount || (reels && reels.length > 0)) && (
        <ReelsList reels={reels} />
      )}
    </div>
  );
}
