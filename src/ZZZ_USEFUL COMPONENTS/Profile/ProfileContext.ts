import React from "react";
import { userCredentials } from "../auth/auth.models";
import { profileDTO } from "./profiles.models.d";

const profile: profileDTO = { id: "", email: "" };
const ProfileContext = React.createContext<{
    profileDTO:profileDTO;
    updateProfile(profileDTO:profileDTO):void;
}>({profileDTO:profile,updateProfile: () => {}});

export default ProfileContext;




