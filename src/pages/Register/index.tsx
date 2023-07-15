import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import DisplayErrors from "../../ZZZ_USEFUL COMPONENTS/Utilities/DisplayErrors";
import { userCredentials } from "../../ZZZ_USEFUL COMPONENTS/auth/auth.models";
import AuthenticationContext from "../../ZZZ_USEFUL COMPONENTS/auth/AuthenticationContext";
import AuthForm from "../../ZZZ_USEFUL COMPONENTS/auth/AuthForm";
import { getClaims, saveToken } from "../../ZZZ_USEFUL COMPONENTS/auth/HandleJWT";
import { saveProfile } from "../../ZZZ_USEFUL COMPONENTS/Profile/HandleProfile";
import { sendCredentials } from "../../ZZZ_USEFUL COMPONENTS/auth/AuthFunctions";
import "./styles.scss"

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
      saveProfile(response.user.id, response.user.email, response.user.profileImage);

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
      <AuthForm
        model={{ email: "", password: "" }}
        onSubmit={async (values) => await register(values)}
        submitButtonName="Register"
      />
    </>
  );
}
