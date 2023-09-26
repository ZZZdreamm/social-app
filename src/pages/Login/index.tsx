import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../globals/Auth/AuthForm/AuthForm";
import { saveProfile } from "../../globals/Profile/HandleProfile";
import "./styles.scss";
import AuthenticationContext from "../../services/Contexts/AuthenticationContext";
import { userCredentials } from "../../services/Models/auth.models";
import { getClaims, saveToken } from "../../globals/Auth/HandleJWT";
import { axiosBase } from "../../globals/apiPaths";
import { ExampleAccountLoginButton } from "../../components/exampleAccountLogin/ExampleAccountLoginButton";

export default function Login() {
  const [errors, setErrors] = useState<string[]>([]);
  const { update } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  async function login(credentials: userCredentials) {
    try {
      setErrors([]);
      const userCredentials = {
        Email: credentials.email,
        Password: credentials.password,
      };
      const response = await axiosBase.post("profiles/login", userCredentials);
      const responseData = response.data;
      saveToken(responseData.token);
      saveProfile(
        responseData.user.Id,
        responseData.user.Email,
        responseData.user.ProfileImage
      );
      update(getClaims());

      if (response) {
        navigate("/");
        navigate(0);
      }
    } catch (error) {
      setErrors(["Your login or password was wrong!"]);
    }
  }

  return (
    <div className="notLogged">
      <div className="auth-container">
        <h1 className="auth-title">Login</h1>
        <AuthForm
          model={{ email: "example@gmail.com", password: "Example1@" }}
          onSubmit={async (values) => await login(values)}
          submitButtonName="Login"
        />
        <div>Or</div>
        <ExampleAccountLoginButton />
        <div className="auth-link">
          <div>
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              style={{
                textDecoration: "underline",
                color: "highlight",
                cursor: "pointer",
              }}
            >
              Register here!
            </span>
          </div>
        </div>
        <span style={{ color: "red" }}>{errors}</span>
      </div>
    </div>
  );
}
