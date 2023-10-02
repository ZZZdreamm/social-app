import { createContext, useContext, useMemo } from "react";
import { profileDTO } from "../Models/profiles.models";
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
});

export function ProfileDataProvider({ children }: Props) {
  const { friends, setFriends } = useFriends();
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
    }),
    [
      friends,
      friendsRequests,
      sentFriendsRequests,
      setFriends,
      setFriendsRequests,
      setSentFriendsRequests,
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
