import { axiosBase } from "../globals/apiPaths";
import { messageDTO } from "../services/Models/message.models";

export async function getMessages(
  profileId: string,
  friendId: string,
  startingPoint: number,
  amount: number = 10
) {
  const response = await axiosBase.get<messageDTO[]>(
    `messages/getChatMessages?userId=${profileId}&friendId=${friendId}&lastMessageDate=${startingPoint}&amount=${amount}`
  );
  const messages = response.data;
  return messages;
}
