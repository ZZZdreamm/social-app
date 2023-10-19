import { axiosBase } from "../globals/apiPaths";

export async function wakeUpDB() {
  const response = await axiosBase.get("profiles/wakeUp");
  return response?.data ?? null;
}
