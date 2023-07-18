import { useContext } from "react";
import { ReadyImagesURL } from "../../../../globals/appUrls";
import ProfileContext from "../../../../services/Contexts/ProfileContext";
import { postDataToServer } from "../../../../services/Firebase/FirebaseFunctions";
import { messageDTO, messageResponseDTO } from "../../../../services/Models/message.models";
import "./style.scss";

interface MessageOptionsProps {
  message: messageDTO;
  setMessages: (messages: messageDTO[]) => void;
  setResponseToMessage: (message: messageResponseDTO) => void;
  toWhom: string;
  isOpen: string;
  setIsOpen: (name: string) => void;
}

export default function MessageOptions({
  message,
  setMessages,
  setResponseToMessage,
  toWhom,
  isOpen,
  setIsOpen,
}: MessageOptionsProps) {
  // const [isOpen, setIsOpen] = useState("");
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
      Id: message.Id,
      SenderName: message.SenderName,
      TextContent: message.TextContent,
      MediaFiles: message.MediaFiles,
    });
  }

  return (
    <>
      <div id={`message-options/${toWhom}`} className="message-options">
        {myProfile?.Id == message.SenderId && (
          <img
            className="message-options__icon"
            src={`${ReadyImagesURL}/moreOptionsChat.png`}
            alt=""
            onClick={() => toggleModal(`moreOptions/${message.Id}`)}
          />
        )}
        <img
          className="message-options__icon"
          src={`${ReadyImagesURL}/response.png`}
          alt=""
          onClick={respondToMessage}
        />


        {isOpen === `moreOptions/${message.Id}` && (
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