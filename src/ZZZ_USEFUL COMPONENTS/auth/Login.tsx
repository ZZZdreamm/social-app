import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userCredentials } from "./auth.models";
import AuthenticationContext from "./AuthenticationContext";
import AuthForm from "./AuthForm";
import { getClaims, saveToken } from "./HandleJWT";
import { saveProfile } from "../Profile/HandleProfile";
import { sendCredentials } from "./AuthFunctions";

export default function Login() {
  const [errors, setErrors] = useState<string[]>([]);
  const { update } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  async function login(credentials: userCredentials) {
    try {
      setErrors([]);
      const response = await sendCredentials(credentials, "login")
      saveToken(response.token);
      update(getClaims());
      saveProfile(response.user.id, response.user.email)
      if(response){
        navigate("/");
        navigate(0);
      }
    } catch (error) {
      setErrors(["Your login or password was wrong!"]);
    }
  }
  return (
    <>
      <h1 style={{ fontSize: "3em" }}>Login</h1>
      <AuthForm
        model={{ email: "", password: "" }}
        onSubmit={async (values) => await login(values)}
        submitButtonName="Login"
      />
      <span style={{ color: "red" }}>{errors}</span>
    </>
  );
}
