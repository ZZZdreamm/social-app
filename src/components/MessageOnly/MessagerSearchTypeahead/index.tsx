import "./style.scss";
import { profileDTO } from "../../../services/Models/profiles.models";
import MessagerSearchOption from "../MessagerSearchOption";
import SearchTypeahead from "../../../_utils/SearchTypeahead";
import { axiosBase } from "../../../globals/apiPaths";
import { useProfilesRelationsContext } from "../../../services/Contexts/ProfileDataContext";
import { useAuthenticationContext } from "../../../services/Contexts/AuthenticationContext";
import { useQuery } from "react-query";
import { searchFriends } from "../../../apiFunctions/searchFriends";

interface MessagerSearchTypeaheadProps {
  setChoosenFriend: (profile: profileDTO) => void;
}

export default function MessagerSearchTypeahead({
  setChoosenFriend,
}: MessagerSearchTypeaheadProps) {
  const { profile } = useAuthenticationContext();
  function typeaheadChildren(profile: profileDTO): React.ReactElement {
    return (
      <MessagerSearchOption
        userProfile={profile}
        setChoosenFriend={setChoosenFriend}
      />
    );
  }

  // const {} = useQuery({
  //   queryKey: ["searchFriends", profile?.Id],
  //   queryFn: () => searchFriends(profile?.Id,)
  // })

  async function searchFriends(
    query: string,
    setProfiles: (profiles: profileDTO[]) => void
  ) {
    if (query) {
      const response = await axiosBase.get<profileDTO[]>(
        `profiles/searchFriends/${profile?.Id}?query=${query}`
      );
      const friendsSearched = response.data;
      setProfiles(friendsSearched);
    } else {
      setProfiles([]);
    }
  }

  return (
    <SearchTypeahead
      listOfData={[]}
      itemChildren={typeaheadChildren}
      handleSearch={searchFriends}
      bonusClassName="messager-typeahead"
    />
  );
}
