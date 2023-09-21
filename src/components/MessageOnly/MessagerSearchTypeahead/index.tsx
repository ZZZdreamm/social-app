import "./style.scss";
import { useContext } from "react";
import SearchOption from "../../Users/SearchOption";
import { profileDTO } from "../../../services/Models/profiles.models";

import MessagerSearchOption from "../MessagerSearchOption";
import ProfileContext from "../../../services/Contexts/ProfileContext";
import SearchTypeahead from "../../../_utils/SearchTypeahead";
import { axiosBaseProfiles } from "../../../globals/apiPaths";

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
      const response = await axiosBaseProfiles.get<profileDTO[]>(
        `searchFriends/${myProfile.Id}?query=${query}`
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
