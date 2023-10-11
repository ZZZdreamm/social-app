import { useEffect } from "react";
import { getReels } from "../../apiFunctions/getReels";
import { useInfiniteReels } from "../../hooks/useInfiniteReels";
import { useAuthenticationContext } from "../../services/Contexts/AuthenticationContext";
import { ReelsList } from "../reelsList/ReelsList";
import styled from "styled-components";
interface ReelsPanelProps {
  queryName: string;
}

export function ReelsPanel({ queryName }: ReelsPanelProps) {
  const { profile } = useAuthenticationContext();

  const { reels, fetchNextPage, isFetchedAfterMount } = useInfiniteReels(
    getReels,
    queryName
  );

  useEffect(() => {
    if (!profile?.Id) return;
    if (reels && reels.length > 0) return;
    fetchNextPage();
  }, [profile]);

  return (
    <>
      {(isFetchedAfterMount || (reels && reels.length > 0)) && (
        <ReelsList reels={reels} />
      )}
    </>
  );
}

