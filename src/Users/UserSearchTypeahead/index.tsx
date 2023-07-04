import "./style.scss";
import { postDataToServer } from "../../Firebase/FirebaseFunctions";
import { profileDTO } from "../../ZZZ_USEFUL COMPONENTS/Profile/profiles.models";
import SearchTypeahead from "../../ZZZ_USEFUL COMPONENTS/Utilities/SearchTypeahead";
import SearchOption from "../SearchOption";

export default function UserSearchTypeahead() {
  function typeaheadChildren(profile: profileDTO): React.ReactElement {
    return <SearchOption profile={profile} />;
  }

  async function searchProfiles(
    query: string,
    setProfiles: (profiles: profileDTO[]) => void
  ) {
    if (query) {
      const response = await postDataToServer({ name: query }, "search-users");
      const searchedUsers = response.users.slice(0, 5);
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
