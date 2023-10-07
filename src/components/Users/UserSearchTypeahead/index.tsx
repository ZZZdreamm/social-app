import "./style.scss";
import SearchOption from "../SearchOption";
import { profileDTO } from "../../../services/Models/profiles.models";
import SearchTypeahead from "../../../_utils/SearchTypeahead";
import { axiosBase } from "../../../globals/apiPaths";
import { useAuthenticationContext } from "../../../services/Contexts/AuthenticationContext";

export default function UserSearchTypeahead() {
  const { profile } = useAuthenticationContext();
  function typeaheadChildren(profile: profileDTO): React.ReactElement {
    return <SearchOption userProfile={profile} />;
  }

  async function searchProfiles(
    query: string,
    setProfiles: (profiles: profileDTO[]) => void
  ) {
    if (query) {
      const response = await axiosBase.get<profileDTO[]>(
        `profiles/search/${query}?userId=${profile?.Id}`
      );
      const searchedUsers = response.data;
      setProfiles(searchedUsers);
    } else {
      setProfiles([]);
    }
  }
  return (
    <SearchTypeahead
      listOfData={[]}
      itemChildren={typeaheadChildren}
      handleSearch={searchProfiles}
      bonusClassName="navbar-typeahead"
    />
  );
}
