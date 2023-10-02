import { axiosBase } from "../globals/apiPaths";
import { messageDTO } from "../services/Models/message.models";

export async function getMessageToMessageWithId(
  profileId: string,
  messageSenderId: string,
  messageReceiverId: string,
  messageId: string
) {
  const senderId =
    messageSenderId === profileId ? messageReceiverId : messageSenderId;
  const response = await axiosBase.get<messageDTO[]>(
    `messages/getMessagesToMessageWithId?userId=${profileId}&friendId=${senderId}&messageId=${messageId}`
  );
  const message = response.data;
  return message;
}
