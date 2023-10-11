import axios from "axios";
import { logout } from "./Auth/HandleJWT";

export let serverURL = "https://cacarrot-server.herokuapp.com/";
export let socketURL = "https://cacarrot-server.herokuapp.com/";
export const localServerURL = "http://localhost:5000/";
export const localSocketURL = "http://localhost:5000/";

if (process.env.NODE_ENV == `development`) {
  serverURL = localServerURL;
  socketURL = localSocketURL;
}

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
};

export const axiosBase = axios.create({
  baseURL: serverURL,
  headers: headers,
});

const loginUrl = "/login";

axiosBase.interceptors.response.use(
  (response) => response,
  (error) => {
    if (process.env.NODE_ENV == `development`) {
      console.log(error.response);
    }
    if (error.response.status === 403) {
      return;
    } else if (error.response.status === 401) {
      logout();
      window.location.href = loginUrl;
    }
    return;
  }
);
