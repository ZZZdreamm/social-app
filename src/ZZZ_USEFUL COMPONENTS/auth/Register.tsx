import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import DisplayErrors from "../Utilities/DisplayErrors";
import { userCredentials } from "./auth.models";
import AuthenticationContext from "./AuthenticationContext";
import AuthForm from "./AuthForm";
import { getClaims, saveToken } from "./HandleJWT";
import { saveProfile } from "../Profile/HandleProfile";
import { sendCredentials } from "./AuthFunctions";

export default function Register() {
  const [errors, setErrors] = useState<string[]>([]);
  const { update } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  async function register(credentials: userCredentials) {
    try {
      setErrors([]);
      const response = await sendCredentials(credentials, "register");
      saveToken(response.token);
      update(getClaims());
      saveProfile(response.user.id, response.user.email);

      if (response) {
        navigate("/");
        navigate(0);
      }
    } catch (error) {
      setErrors(["The name is already taken"]);
    }
  }

  return (
    <>
      <h1>Register</h1>
      <DisplayErrors errors={errors} />
      <AuthForm
        model={{ email: "", password: "" }}
        onSubmit={async (values) => await register(values)}
        submitButtonName="Register"
      />
    </>
  );
}
