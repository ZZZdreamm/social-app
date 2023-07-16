import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../globals/Auth/AuthForm/AuthForm";
import { saveProfile } from "../../globals/Profile/HandleProfile";
import { sendCredentials } from "../../globals/Auth/AuthFunctions";
import "./styles.scss";
import AuthenticationContext from "../../services/Contexts/AuthenticationContext";
import { userCredentials } from "../../services/Models/auth.models";
import { getClaims, saveToken } from "../../globals/Auth/HandleJWT";

export default function Login() {
  const [errors, setErrors] = useState<string[]>([]);
  const { update } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  async function login(credentials: userCredentials) {
    try {
      setErrors([]);
      const response = await sendCredentials(credentials, "login");
      saveToken(response.token);
      update(getClaims());
      saveProfile(
        response.user.id,
        response.user.email,
        response.user.profileImage
      );
      if (response) {
        navigate("/");
        navigate(0);
      }
    } catch (error) {
      setErrors(["Your login or password was wrong!"]);
    }
  }

  const loginForm = document.forms[0];
  useEffect(() => {
    if (!loginForm) return;
    const inputs = loginForm.getElementsByTagName("input");
    const email = inputs[0];
    const password = inputs[1];
    const exampleEmail = "example@gmail.com";
    const examplePassword = "Example1@";

    for (let index = 0; index < exampleEmail.length; index++) {
      setTimeout(() => {
        email.value += exampleEmail[index];
      }, index * 80);
    }
    for (let index = 0; index < examplePassword.length; index++) {
      setTimeout(() => {
        password.value += examplePassword[index];
      }, index * 100);
    }
  }, [loginForm]);
  return (
    <div className="notLogged">
      <div className="auth-container">
        <h1 className="auth-title">Login</h1>
        <AuthForm
          model={{ email: "example@gmail.com", password: "Example1@" }}
          onSubmit={async (values) => await login(values)}
          submitButtonName="Login"
        />
        <span style={{ color: "red" }}>{errors}</span>
      </div>
    </div>
  );
}
