import "./style.scss";
import FriendsList from "../../components/Users/FriendsList";
import { getFriends } from "../../apiFunctions/getFriends";
import { ONE_HOUR } from "../../globals/constants";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { UserFriendsSkeleton } from "./skeleton";

export default function UserFriends() {
  const { id } = useParams();

  const { data: friends } = useQuery(
    [`friends/${id}`],
    () => getFriends(id ?? ""),
    {
      enabled: id != undefined,
      staleTime: ONE_HOUR,
    }
  );

  return (
    <div className="friends">
      {friends?.data ? (
        <>
          <h2 className="mv-1">Your friends</h2>
          <span className="friends-container">
            <FriendsList friends={friends?.data} />
          </span>
        </>
      ) : (
        <UserFriendsSkeleton />
      )}
    </div>
  );
}
