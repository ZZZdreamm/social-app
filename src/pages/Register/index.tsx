import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../globals/Auth/AuthForm/AuthForm";
import { saveProfile } from "../../globals/Profile/HandleProfile";
import { sendCredentials } from "../../globals/Auth/AuthFunctions";
import "./styles.scss";
import AuthenticationContext from "../../services/Contexts/AuthenticationContext";
import { userCredentials } from "../../services/Models/auth.models";
import { getClaims, saveToken } from "../../globals/Auth/HandleJWT";

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
          submitButtonName="Register"
        />
      </div>
    </div>
  );
}
