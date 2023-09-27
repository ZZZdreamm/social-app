import { createContext, useContext, useMemo } from "react";
import { profileDTO } from "../Models/profiles.models";
import { useFriends } from "../../hooks/useFriends";
import { useFriendsRequests } from "../../hooks/useFriendsRequests";
import { useSentFriendsRequests } from "../../hooks/useSentFriendsRequests";
import { useProfile } from "../../hooks/useProfile";

interface ContextProps {
  profile: profileDTO | undefined;
  friends: profileDTO[] | undefined;
  friendsRequests: profileDTO[] | undefined;
  sentFriendsRequests: profileDTO[] | undefined;
  setProfile: (profile: profileDTO) => void;
  setFriends: (friends: profileDTO[]) => void;
  setFriendsRequests: (friendsRequests: profileDTO[]) => void;
  setSentFriendsRequests: (sentFriendsRequests: profileDTO[]) => void;
}

interface Props {
  children: React.ReactNode;
}

export const ProfileRelationsContext = createContext<ContextProps>({
  profile: undefined,
  friends: [],
  friendsRequests: [],
  sentFriendsRequests: [],
  setProfile: () => {},
  setFriends: () => {},
  setFriendsRequests: () => {},
  setSentFriendsRequests: () => {},
});

export function ProfileDataProvider({ children }: Props) {
  const { profile, setProfile } = useProfile();
  const { friends, setFriends } = useFriends();
  const { friendsRequests, setFriendsRequests } = useFriendsRequests();
  const { sentFriendsRequests, setSentFriendsRequests } =
    useSentFriendsRequests();

  const states = useMemo(
    () => ({
      profile,
      friends,
      friendsRequests,
      sentFriendsRequests,
      setProfile,
      setFriends,
      setFriendsRequests,
      setSentFriendsRequests,
    }),
    [
      profile,
      friends,
      friendsRequests,
      sentFriendsRequests,
      setProfile,
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
