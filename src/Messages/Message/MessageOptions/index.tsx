import { useContext, useState } from "react";
import { ReadyImagesURL } from "../../../ZZZ_USEFUL COMPONENTS/appUrls";
import "./style.scss";
import { messageDTO, messageResponseDTO } from "../../../Models/message.models";
import { postDataToServer } from "../../../Firebase/FirebaseFunctions";
import ProfileContext from "../../../Contexts/ProfileContext";

interface MessageOptionsProps {
  message: messageDTO;
  setMessages: (messages: messageDTO[]) => void;
  setResponseToMessage: (message: messageResponseDTO) => void;
}

export default function MessageOptions({
  message,
  setMessages,
  setResponseToMessage,
}: MessageOptionsProps) {
  const [isOpen, setIsOpen] = useState("");
  const { myProfile } = useContext(ProfileContext);

  function toggleModal(name: string) {
    if (isOpen === name) {
      setIsOpen("");
    } else {
      setIsOpen(name);
    }
  }
  function deleteMessage() {
    //@ts-ignore
    setMessages((messages: messageDTO[]) =>
      messages.filter((m) => m.Id !== message.Id)
    );
    postDataToServer(
      {
        userId: message.SenderId,
        friendId: message.ReceiverId,
        messageId: message.Id,
        date: message.Date,
      },
      "remove-message"
    );
  }

  function respondToMessage() {
    setResponseToMessage({
      SenderName: message.SenderName,
      TextContent: message.TextContent,
      MediaFiles: message.MediaFiles,
    });
  }
  return (
    <>
      <div className="message-options">
        {myProfile?.Id == message.SenderId && (
          <img
            className="message-options__icon"
            src={`${ReadyImagesURL}/moreOptionsChat.png`}
            alt=""
            onClick={() => toggleModal("moreOptions")}
          />
        )}
        <img
          className="message-options__icon"
          src={`${ReadyImagesURL}/response.png`}
          alt=""
          onClick={respondToMessage}
        />
        <img
          className="message-options__icon"
          src={`${ReadyImagesURL}/emoji.png`}
          alt=""
        />
        {isOpen == "moreOptions" && (
          <div className="message-options-delete">
            <div
              className="message-options-delete__text"
              onClick={deleteMessage}
            >
              Delete
            </div>
            <div className="message-options-delete__text">Share</div>
          </div>
        )}
      </div>
    </>
  );
}
