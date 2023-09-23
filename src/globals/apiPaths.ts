import axios from "axios";

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
};

export const axiosBase = axios.create({
  baseURL: serverURL,
  headers: headers,
});

export const axiosBasePosts = axios.create({
  baseURL: serverURL + "posts/",
  headers: headers,
});

export const axiosBaseProfiles = axios.create({
  baseURL: serverURL + "profiles/",
  headers: headers,
});

export const axiosBaseComments = axios.create({
  baseURL: serverURL + "comments/",
  headers: headers,
});

export const axiosBaseMessages = axios.create({
  baseURL: serverURL + "messages/",
  headers: headers,
});
