import { axiosBase } from "../globals/apiPaths";
import { userCredentials } from "../models/auth.models";

export async function loginInDB(credentials: userCredentials) {
  const userCredentials = {
    Email: credentials.email,
    Password: credentials.password,
  };
  const response = await axiosBase.post("profiles/login", userCredentials);
  const responseData = response.data;
  return { data: responseData, status: response.status };
}
