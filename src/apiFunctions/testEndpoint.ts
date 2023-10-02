import { axiosBase } from "../globals/apiPaths";

export async function testEndpoint(message: any) {
  const response = await axiosBase.get(`/messages/test`);
  return { response, message };
}
