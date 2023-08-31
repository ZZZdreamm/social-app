import "./style.scss";
import { useContext } from "react";
import { postDataToServer } from "../../../services/Firebase/FirebaseFunctions";
import SearchOption from "../../Users/SearchOption";
import { profileDTO } from "../../../services/Models/profiles.models";

import MessagerSearchOption from "../MessagerSearchOption";
import ProfileContext from "../../../services/Contexts/ProfileContext";
import SearchTypeahead from "../../../_utils/SearchTypeahead";

interface MessagerSearchTypeaheadProps {
  setChoosenFriend: (profile: profileDTO) => void;
}

export default function MessagerSearchTypeahead({
  setChoosenFriend,
}: MessagerSearchTypeaheadProps) {
  const { myProfile } = useContext(ProfileContext);
  function typeaheadChildren(profile: profileDTO): React.ReactElement {
    return (
      <MessagerSearchOption
        profile={profile}
        setChoosenFriend={setChoosenFriend}
      />
    );
  }

  async function searchFriends(
    query: string,
    setProfiles: (profiles: profileDTO[]) => void
  ) {
    if (query) {
      const response = await postDataToServer(
        { userId:myProfile.Id, searchQuery: query },
        "search-friends"
      );
      setProfiles(response);
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
