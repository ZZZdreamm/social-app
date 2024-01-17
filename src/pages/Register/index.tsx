import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../globals/Auth/AuthForm/AuthForm";
import { saveProfile } from "../../globals/Profile/HandleProfile";
import "./styles.scss";
import { userCredentials } from "../../models/auth.models";
import { getClaims, saveToken } from "../../globals/Auth/HandleJWT";
import { axiosBase } from "../../globals/apiPaths";
import { useAuthData } from "../../hooks/useAuthData";
import { isHerokuServerAwake } from "../../_utils/getHerokuServerState/getHerokuState";

export default function Register() {
  const [, setErrors] = useState<string[]>([]);
  const { setClaims } = useAuthData();
  const navigate = useNavigate();

  async function register(credentials: userCredentials) {
    try {
      setErrors([]);
      const userCredentials = {
        Email: credentials.email,
        Password: credentials.password,
      };
      const response = (
        await axiosBase.post("profiles/register", userCredentials)
      ).data;
      saveToken(response.token);
      setClaims(getClaims());
      saveProfile(
        response.user.Id,
        response.user.Email,
        response.user.ProfileImage
      );

      if (response) {
        navigate("/");
        navigate(0);
      }
    } catch (error) {
      setErrors(["The name is already taken"]);
    }
  }

  return (
    <div className="notLogged">
      <div className="auth-container">
        <h1 className="auth-title">Register</h1>
        <AuthForm
          model={{ email: "", password: "" }}
          onSubmit={async (values) => await register(values)}
          formName="Register"
        />
      </div>
    </div>
  );
}
