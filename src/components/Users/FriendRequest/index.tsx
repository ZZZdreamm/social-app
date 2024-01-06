import "./style.scss";
import { profileDTO } from "../../../services/Models/profiles.models";
import { ProfileImage } from "../../ProfileImage/ProfileImage";
import { axiosBase } from "../../../globals/apiPaths";
import { useProfilesRelationsContext } from "../../../services/Contexts/ProfileDataContext";
import { useAuthenticationContext } from "../../../services/Contexts/AuthenticationContext";

export default function FriendRequest({ friend, sent }: FriendProps) {
  const { profile } = useAuthenticationContext();
  const {
    friends,
    friendsRequests,
    sentFriendsRequests,
    setFriends,
    setFriendsRequests,
    setSentFriendsRequests,
  } = useProfilesRelationsContext();

  async function acceptRequest() {
    const response = await axiosBase.patch<profileDTO>(
      `profiles/acceptFriendRequest?userId=${profile?.Id}&friendId=${friend.Id}`
    );
    const addedFriend = response.data;
    const newFriendRequests = friendsRequests!.filter(
      (tempFriend) => tempFriend.Id != friend.Id
    );
    setFriendsRequests(newFriendRequests);
    let newFriends = [...friends!];
    newFriends.push(addedFriend);
    setFriends(newFriends);
  }

  async function cancelRequest() {
    if (sent) {
      const deletedFriend = (
        await axiosBase.delete<{ Id: string }>(
          `profiles/removeFriendRequest?userId=${profile?.Id}&friendId=${friend.Id}`
        )
      ).data;
      const newFriends = sentFriendsRequests!.filter(
        (tempFriend) => tempFriend.Id != deletedFriend.Id
      );
      setSentFriendsRequests(newFriends);
    } else {
      const deletedFriend = (
        await axiosBase.delete<{ Id: string }>(
          `profiles/removeFriendRequest?userId=${friend?.Id}&friendId=${profile?.Id}`
        )
      ).data;

      console.log(deletedFriend);
      const newFriends = friendsRequests!.filter(
        (tempFriend) => tempFriend.Id != deletedFriend.Id
      );
      console.log(newFriends);
      setFriendsRequests(newFriends);
    }
  }
  return (
    <div className="friend-request">
      <span className="friend-request-profile">
        <ProfileImage sizeInRem={4} imageURL={friend.ProfileImage} />
        <span className="friend-request-email large-font">{friend.Email}</span>
      </span>
      <span className="friend-request-options">
        {!sent && <button onClick={acceptRequest}>Accept request</button>}
        <button onClick={cancelRequest}>Cancel request</button>
      </span>
    </div>
  );
}

interface FriendProps {
  friend: profileDTO;
  sent: boolean;
}
