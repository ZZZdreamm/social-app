import { ReadyImagesURL } from "../../../../globals/appUrls";
import {
  messageDTO,
  messageResponseDTO,
} from "../../../../services/Models/message.models";
import "./style.scss";
import { useAuthenticationContext } from "../../../../services/Contexts/AuthenticationContext";
import { useMutation } from "react-query";
import { deleteMessage } from "../../../../apiFunctions/deleteMessage";
import { queryClient } from "../../../../App";

interface MessageOptionsProps {
  message: messageDTO;
  setResponseToMessage: (message: messageResponseDTO) => void;
  toWhom: string;
  isOpen: string;
  setIsOpen: (name: string) => void;
}

export default function MessageOptions({
  message,
  setResponseToMessage,
  toWhom,
  isOpen,
  setIsOpen,
}: MessageOptionsProps) {
  // const [isOpen, setIsOpen] = useState("");
  const { profile } = useAuthenticationContext();
  const { mutate: delMessage } = useMutation({
    mutationFn: () =>
      deleteMessage(message.SenderId, message.ReceiverId, message.Id),
    onSuccess: ({ messageId, friendId }) => {
      queryClient.setQueryData(`getMessages/${friendId}`, (oldData: any) => {
        const newPages = oldData.pages.map((page: any[]) => {
          return page.filter((message) => message.Id !== messageId);
        });
        return {
          pages: newPages,
          pageParams: oldData.pageParams,
        };
      });
    },
    onError: (error: any) => {
      alert(error);
    },
  });

  function toggleModal(name: string) {
    if (isOpen === name) {
      setIsOpen("");
    } else {
      setIsOpen(name);
    }
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
        {profile?.Id === message.SenderId && (
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
              onClick={() => delMessage()}
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
