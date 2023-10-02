import { axiosBase } from "../globals/apiPaths";

export async function deleteMessage(
  senderId: string,
  receiverId: string,
  messageId: string
) {
  axiosBase.delete(
    `messages/delete?userId=${senderId}&friendId=${receiverId}&messageId=${messageId}`
  );
  return { messageId: messageId, friendId: receiverId };
}
