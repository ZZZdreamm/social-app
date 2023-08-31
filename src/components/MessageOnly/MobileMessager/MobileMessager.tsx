import "./style.scss";
import { useNavigate } from "react-router-dom";
import { ProfileFriendsContext } from "../../../services/Contexts/ProfileContext";
import { profileDTO } from "../../../services/Models/profiles.models";

import { ReadyImagesURL } from "../../../globals/appUrls";
import MessagerChat from "../MessagerChat";
import MessagerFriendIcon from "../MessagerFriendIcon";
import MessagerMobileFriend from "../MessagerMobileFriend";
import MessagerSearchTypeahead from "../MessagerSearchTypeahead";
import {useContext} from 'react';


interface MobileMessagerProps{
    setChoosenFriend:(profile:profileDTO | undefined) => void;
    choosenFriend:profileDTO | undefined;
}

export default function MobileMessager({setChoosenFriend, choosenFriend}:MobileMessagerProps){
    const navigate = useNavigate()
    const {myFriends} = useContext(ProfileFriendsContext)
    return (
        <>
        <div className="messager-mobile-header flex">
          <img
            src={`${ReadyImagesURL}/goBackArrow.png`}
            onClick={() => navigate("/")}
            alt=""
          />
          <h3 className="very-large-font">Chats</h3>
        </div>
        <div className="messager-mobile-options">
          <MessagerSearchTypeahead setChoosenFriend={setChoosenFriend} />
          {myFriends && (
            <div className="messager-mobile-options-friends">
              {myFriends.map((friend) => (
                <MessagerFriendIcon
                  key={friend.Id}
                  profile={friend}
                  setChoosenFriend={setChoosenFriend}
                />
              ))}
            </div>
          )}
        </div>
        <div className="messager-mobile-body">
          {myFriends &&
            myFriends.map((friend) => (
              <MessagerMobileFriend
                key={friend.Id}
                profile={friend}
                setChoosenFriend={setChoosenFriend}
              />
            ))}
        </div>
        <div className="messager-mobile-footer"></div>
        {choosenFriend && (
          <div className="whole-page">
            <MessagerChat
              friend={choosenFriend}
              fullScreen={true}
              setChoosenFriend={setChoosenFriend}
            />
          </div>
        )}
      </>
    )
}