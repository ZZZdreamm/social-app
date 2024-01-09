import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthenticationContext } from "../services/Contexts/AuthenticationContext";

const login = "/login?redirected=true";


export const withPrivateRoute = (WrappedComponent: any) => {
  const useHocComponent = ({ ...props }) => {
    const navigate = useNavigate();
    const { profile, loading } = useAuthenticationContext();

    useEffect(() => {
      console.log(profile);   
      if (!profile?.Id) {
        navigate(login);
      }else{
        console.log("logged in");
      }
    }, [profile, loading]);

    return (
      <>{!loading ? <WrappedComponent {...props} /> : <div>Loading...</div>}</>
    );
  };

  return useHocComponent;
};
