import RightBarFriend from "../../../Messages/RightBarFriend";
import "./style.scss";
import "../style.scss";
import { useProfilesRelationsContext } from "../../../../services/Contexts/ProfileDataContext";

export default function RightBar() {
  const { friends } = useProfilesRelationsContext();

  return (
    <>
      <div className="bar bar-right">
        <h5 className="large-font">Friends</h5>
        <ul>
          {friends &&
            friends.length > 0 &&
            friends.map((friend) => (
              <RightBarFriend key={friend.Id} friend={friend} />
            ))}
        </ul>
      </div>
    </>
  );
}
