import React from "react";
import { userCredentials } from "../auth/auth.models";
import { profileDTO } from "./profiles.models";

const profile: profileDTO = { Id: "", Email: "" };
const ProfileContext = React.createContext<{
    myProfile:profileDTO;
    updateProfile(myProfile:profileDTO):void;
}>({myProfile:profile,updateProfile: () => {}});

export default ProfileContext;



const friends: profileDTO[] =[];
export const ProfileFriendsContext = React.createContext<{
    myFriends:profileDTO[] | undefined;
    updateFriends(myFriends:profileDTO[]):void;
}>({myFriends:friends,updateFriends: () => {}});


const friendsRequests: profileDTO[] = []
export const FriendRequestsContext = React.createContext<{
    myFriendRequests:profileDTO[] | undefined;
    updateFriendRequests(myFriendRequests:profileDTO[]):void;
}>({myFriendRequests:friendsRequests,updateFriendRequests: () => {}});


const sentFriendRequests: profileDTO[] = []
export const SentFriendRequestsContext = React.createContext<{
    mySentRequests:profileDTO[] | undefined;
    updateSentFriendRequests(mySentRequests:profileDTO[]):void;
}>({mySentRequests:sentFriendRequests,updateSentFriendRequests: () => {}});



export const OpenedChatsContext = React.createContext<{
    openedChats:profileDTO[];
    updateOpenedChats(openedChats:profileDTO[]):void;
}>({openedChats:[], updateOpenedChats: () => {}});

