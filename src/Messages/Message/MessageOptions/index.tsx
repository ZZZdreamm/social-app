import { useState } from "react";
import { ReadyImagesURL } from "../../../ZZZ_USEFUL COMPONENTS/appUrls";
import "./style.scss";
import { messageDTO } from "../../../Models/message.models";
import { postDataToServer } from "../../../Firebase/FirebaseFunctions";

interface MessageOptionsProps {
    message: messageDTO;
    setMessages: (messages: messageDTO[]) => void;
}

export default function MessageOptions({ message,setMessages }: MessageOptionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }
  function deleteMessage() {
    //@ts-ignore
    setMessages((messages:messageDTO[]) => messages.filter((m) => m.Id !== message.Id))
    postDataToServer({ userId: message.SenderId, friendId:message.ReceiverId, messageId: message.Id }, "remove-message")
  }
  return (
    <>


      <div className="message-options">
        <img
          className="message-options__icon"
          src={`${ReadyImagesURL}/moreOptionsChat.png`}
          alt=""
          onClick={toggleModal}
        />
        <img
          className="message-options__icon"
          src={`${ReadyImagesURL}/response.png`}
          alt=""
        />
        <img
          className="message-options__icon"
          src={`${ReadyImagesURL}/emoji.png`}
          alt=""
        />
        {isOpen && (
        <div className="message-options-delete">
          <div className="message-options-delete__text" onClick={deleteMessage}>Delete</div>
          <div className="message-options-delete__text">Share</div>
        </div>
      )}
      </div>
    </>
  );
}
