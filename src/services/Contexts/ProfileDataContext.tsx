import { createContext, useContext, useMemo } from "react";
import { profileDTO } from "../../models/profiles.models";
import { useFriends } from "../../hooks/useFriends";
import { useFriendsRequests } from "../../hooks/useFriendsRequests";
import { useSentFriendsRequests } from "../../hooks/useSentFriendsRequests";

interface ContextProps {
  friends: profileDTO[] | undefined;
  friendsRequests: profileDTO[] | undefined;
  sentFriendsRequests: profileDTO[] | undefined;
  setFriends: (friends: profileDTO[]) => void;
  setFriendsRequests: (friendsRequests: profileDTO[]) => void;
  setSentFriendsRequests: (sentFriendsRequests: profileDTO[]) => void;
  fetchedFriendsAfterMount: boolean;
}

interface Props {
  children: React.ReactNode;
}

export const ProfileRelationsContext = createContext<ContextProps>({
  friends: [],
  friendsRequests: [],
  sentFriendsRequests: [],
  setFriends: () => {},
  setFriendsRequests: () => {},
  setSentFriendsRequests: () => {},
  fetchedFriendsAfterMount: false,
});

export function ProfileDataProvider({ children }: Props) {
  const { friends, setFriends, fetchedFriendsAfterMount } = useFriends();
  const { friendsRequests, setFriendsRequests } = useFriendsRequests();
  const { sentFriendsRequests, setSentFriendsRequests } =
    useSentFriendsRequests();

  const states = useMemo(
    () => ({
      friends,
      friendsRequests,
      sentFriendsRequests,
      setFriends,
      setFriendsRequests,
      setSentFriendsRequests,
      fetchedFriendsAfterMount,
    }),
    [
      friends,
      friendsRequests,
      sentFriendsRequests,
      setFriends,
      setFriendsRequests,
      setSentFriendsRequests,
      fetchedFriendsAfterMount,
    ]
  );

  return (
    <ProfileRelationsContext.Provider value={states}>
      {children}
    </ProfileRelationsContext.Provider>
  );
}

export const useProfilesRelationsContext = () =>
  useContext(ProfileRelationsContext);
