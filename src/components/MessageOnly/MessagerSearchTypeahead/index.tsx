import "./style.scss";
import { profileDTO } from "../../../models/profiles.models";
import MessagerSearchOption from "../MessagerSearchOption";
import SearchTypeahead from "../../../_utils/SearchTypeahead";
import { axiosBase } from "../../../globals/apiPaths";
import { useProfilesRelationsContext } from "../../../services/Contexts/ProfileDataContext";
import { useAuthenticationContext } from "../../../services/Contexts/AuthenticationContext";
import { useQuery } from "react-query";
import { searchFriends } from "../../../apiFunctions/searchFriends";
import { UserSearchTypeaheadd } from "../../userSearchTypeahead/UserSearchTypeahead";

interface MessagerSearchTypeaheadProps {
  setChoosenFriend: (profile: profileDTO) => void;
}

export default function MessagerSearchTypeahead({
  setChoosenFriend,
}: MessagerSearchTypeaheadProps) {
  const { profile } = useAuthenticationContext();

  const handleSearch = async (query: string) => {
    const friends = await searchFriends(query, profile?.Id);
    return friends;
  };

  function typeaheadChildren(profile: profileDTO): React.ReactElement {
    return (
      <MessagerSearchOption
        userProfile={profile}
        setChoosenFriend={setChoosenFriend}
      />
    );
  }

  return (
    <UserSearchTypeaheadd
      onSearch={handleSearch}
      searchOption={typeaheadChildren}
      expand={false}
      color="navColor"
    />
  );
}
