import React from "react";
import { claim } from "../Models/auth.models"

const AuthenticationContext = React.createContext<{
    claims:claim[];
    update(claims:claim[]):void;
}>({claims:[], update: () => {}});

export default AuthenticationContext;

