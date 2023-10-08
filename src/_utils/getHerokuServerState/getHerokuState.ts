import axios from "axios";

export async function isHerokuServerAwake() {
  const response = await axios.get(
    "https://status.heroku.com/api/v4/current-status"
  );
  const appStatus = response.data.status[0].status;
  if (appStatus !== "green") return false;
  return true;
}
