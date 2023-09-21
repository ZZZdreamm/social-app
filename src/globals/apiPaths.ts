import axios from "axios";

export let serverURL = "https://cacarrot-server.herokuapp.com/";
export let socketURL = "https://cacarrot-server.herokuapp.com/";
export const localServerURL = "http://localhost:5000/";
export const localSocketURL = "http://localhost:5000/";

if (process.env.NODE_ENV == `development`) {
  serverURL = localServerURL;
  socketURL = localSocketURL;
}

export const axiosBase = axios.create({
  baseURL: serverURL,
});

export const axiosBasePosts = axios.create({
  baseURL: serverURL + "posts/",
});

export const axiosBaseProfiles = axios.create({
    baseURL: serverURL + "profiles/",
});

export const axiosBaseComments = axios.create({
    baseURL: serverURL + "comments/",
});

export const axiosBaseMessages = axios.create({
    baseURL: serverURL + "messages/",
});

