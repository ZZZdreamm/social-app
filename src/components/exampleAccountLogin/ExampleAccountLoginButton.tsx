import { useNavigate } from "react-router-dom";
import { saveProfile } from "../../globals/Profile/HandleProfile";
import { userCredentials } from "../../services/Models/auth.models";
import { getClaims, saveToken } from "../../globals/Auth/HandleJWT";
import styled from "styled-components";
import { useAuthData } from "../../hooks/useAuthData";
import { loginInDB } from "../../apiFunctions/login";
import { isHerokuServerAwake } from "../../_utils/getHerokuServerState/getHerokuState";

export function ExampleAccountLoginButton() {
  const { setClaims } = useAuthData();
  const navigate = useNavigate();

  async function login(credentials: userCredentials) {
    const herokuState = await isHerokuServerAwake();
    if (herokuState === false) {
      alert("Heroku server need to wake up, wait 10 seconds and try again!");
      return;
    }
    try {
      const { data } = await loginInDB(credentials);
      saveToken(data.token);
      saveProfile(data.user.Id, data.user.Email, data.user.ProfileImage);
      setClaims(getClaims());

      if (data) {
        navigate("/");
        navigate(0);
      }
    } catch (error) {}
  }
  return (
    <LoginButton
      className="auth-submit"
      onClick={() => login({ email: "mag@gmail.com", password: "Example1@" })}
    >
      Login with example account
    </LoginButton>
  );
}

const LoginButton = styled.button`
  border-radius: 1.6rem;
  border: 1px solid #ff4b2b;
  background-color: #ff4b2b;
  color: #ffffff;
  font-weight: bold;
  padding: 12px 50px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  margin: 20px 0;
  width: 80%;
`;
