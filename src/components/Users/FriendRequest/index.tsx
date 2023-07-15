import "./style.scss";
import { useContext } from "react";
import { profileDTO } from "../../../ZZZ_USEFUL COMPONENTS/Profile/profiles.models";
import { ReadyImagesURL } from "../../../globals/appUrls";
import ProfileContext, { FriendRequestsContext, ProfileFriendsContext, SentFriendRequestsContext } from "../../../services/Contexts/ProfileContext";
import { postDataToServer } from "../../../services/Firebase/FirebaseFunctions";

export default function FriendRequest({ friend, sent }: FriendProps) {
  const {myProfile} = useContext(ProfileContext)
  const {myFriends, updateFriends} = useContext(ProfileFriendsContext)
  const {myFriendRequests,updateFriendRequests} = useContext(FriendRequestsContext)
  const {mySentRequests, updateSentFriendRequests} = useContext(SentFriendRequestsContext)

  async function acceptRequest() {
    const addedFriend = await postDataToServer({userId:myProfile.Id, friendId:friend.Id}, "accept-friend-request")
    const newFriendRequests = myFriendRequests!.filter((tempFriend) => tempFriend.Id != friend.Id)
    updateFriendRequests(newFriendRequests)
    let newFriends = [...myFriends!]
    newFriends.push(addedFriend)
    updateFriends(newFriends)
  }
  async function cancelRequest() {
    if(sent){
      console.log(myProfile.Id)
      const deletedFriend = await postDataToServer({userId:myProfile.Id, friendId:friend.Id}, "cancel-friend-request/user")
      const newFriends = mySentRequests!.filter((tempFriend) => tempFriend.Id != deletedFriend.Id)
      updateSentFriendRequests(newFriends)
    }else{
      const deletedFriend = await postDataToServer({userId:friend.Id, friendId:myProfile.Id}, "cancel-friend-request/friend")
      const newFriends = myFriendRequests!.filter((tempFriend) => tempFriend.Id != deletedFriend.Id)
      updateFriendRequests(newFriends)
    }
  }
  return (
    <div className="friend-request">
      <span className="friend-request-profile">
        <img src={friend.ProfileImage || `${ReadyImagesURL}/noProfile.jpg`} alt=""/>
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
