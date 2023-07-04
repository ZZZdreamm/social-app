import "./style.scss";
import { useNavigate } from "react-router-dom";
import { profileDTO } from "../../ZZZ_USEFUL COMPONENTS/Profile/profiles.models";
import { ReadyImagesURL } from "../../ZZZ_USEFUL COMPONENTS/appUrls";
import { postDataToServer } from "../../Firebase/FirebaseFunctions";
import { useContext } from "react";
import ProfileContext, { ProfileFriendsContext } from "../../ZZZ_USEFUL COMPONENTS/Profile/ProfileContext";

export default function Friend({ friend }: FriendProps) {
    const navigate = useNavigate()
    const {myProfile} = useContext(ProfileContext)
    const {myFriends, updateFriends} = useContext(ProfileFriendsContext)
  async function removeFriend(){
    const deletedFriend = await postDataToServer({userId:myProfile.Id, friendId:friend.Id}, "remove-friend")
    const newFriends = myFriends!.filter((tempFriend) => tempFriend.Id != deletedFriend.Id)
    updateFriends(newFriends)
  }
  return (
    <div className="friend">
      <img src={friend.ProfileImage || `${ReadyImagesURL}/noProfile.jpg`} onClick={()=> navigate(`/user-profile/${friend.Id}`)} alt=""/>
      <span className="friend-info">
        <span className="large-font">{friend.Email}</span>
        <button className="friend-remove medium-font" onClick={removeFriend}>Remove friend</button>
      </span>
    </div>
  );
}

interface FriendProps {
  friend: profileDTO;
}
