import React from "react";
import { Navigate, Route } from "react-router-dom";
import { useAuthenticationContext } from "../services/Contexts/AuthenticationContext";

interface Props {
  Component: React.FC;
}

const PrivateRoute = ({ Component }: Props) => {
  const { profile, claims } = useAuthenticationContext();
  const isAuthenticated = profile !== undefined && claims.length > 0;

  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
