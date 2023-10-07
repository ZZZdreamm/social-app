import { useEffect, useState } from "react";
import {
  messageDTO,
  messageResponseDTO,
} from "../../../services/Models/message.models";

import MessageOptions from "../../../components/Messages/Message/MessageOptions";
import ShowFullImages from "../../../_utils/ShowFullImages";
import "./style.scss";
import BigImageModal from "../../../_utils/BigImageModal/index";
import { useAuthenticationContext } from "../../../services/Contexts/AuthenticationContext";
import { useMutation } from "react-query";
import { getMessageToMessageWithId } from "../../../apiFunctions/getMessagesToMessageWithId";

interface MessageProps {
  message: messageDTO;
  fetchNextPage: () => void;
  setResponseToMessage: (message: messageResponseDTO) => void;
  toWhom: string;
  optionsOpen: string;
  setOptionsOpen: (name: string) => void;
  notResponding?: boolean;
}

type FlexDirection = "row" | "row-reverse";

export default function Message({
  message,
  fetchNextPage,
  setResponseToMessage,
  notResponding,
  toWhom,
  optionsOpen,
  setOptionsOpen,
}: MessageProps) {
  const { profile } = useAuthenticationContext();
  const [isOpen, setIsOpen] = useState(false);
  const [optionsVisible, setOptionsVisible] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  const styling =
    profile?.Id === message.SenderId
      ? { alignSelf: "flex-end", flexDirection: "row-reverse" as FlexDirection }
      : { alignSelf: "flex-start", flexDirection: "row" as FlexDirection };
  const fromFriend = profile?.Id !== message.SenderId;
  return (
    <div
      id={`message/${message.Id}`}
      className="message"
      style={styling}
      onMouseEnter={() => {
        setOptionsVisible(true);
      }}
      onMouseLeave={() => {
        setOptionsVisible(false);
      }}
    >
      {isOpen && (
        <BigImageShown
          message={message}
          isOpen={isOpen}
          toggleModal={toggleModal}
        />
      )}
      <MessageContent
        message={message}
        fromFriend={fromFriend}
        toggleModal={toggleModal}
        fetchNextPage={fetchNextPage}
      />
      {notResponding && (
        <div style={{ opacity: optionsVisible ? "1" : "0" }}>
          <MessageOptions
            message={message}
            setResponseToMessage={setResponseToMessage}
            toWhom={toWhom}
            isOpen={optionsOpen}
            setIsOpen={setOptionsOpen}
          />
        </div>
      )}
    </div>
  );
}

interface MessageChildProps {
  message: messageDTO;
}

interface MessageContentProps extends MessageChildProps {
  fromFriend: boolean;
  toggleModal: any;
  fetchNextPage: any;
}

const MessageContent = ({
  message,
  fromFriend,
  toggleModal,
  fetchNextPage,
}: MessageContentProps) => {
  const { profile } = useAuthenticationContext();
  const { mutate: fetchToResponseToMessage } = useMutation({
    mutationFn: (profileId: string) =>
      getMessageToMessageWithId(
        profileId,
        message.SenderId,
        message.ReceiverId,
        message.responseTo.Id
      ),
    onSuccess: (messages) => {
      fetchNextPage({
        pageParam: {
          date: messages[0].Date,
          amount: messages.length,
        },
      });
    },
  });

  const contentStyle = fromFriend
    ? { backgroundColor: "#E4E6EB" }
    : { backgroundColor: "#0084ff" };
  const color = fromFriend ? "#2f2f2f" : "#ffffff";

  const gridSize =
    message.MediaFiles.length < 4 ? message.MediaFiles.length : 4;

  const responseGridSize =
    message.responseTo && message.responseTo.MediaFiles.length < 4
      ? message.MediaFiles.length
      : 4;

  function showBigImages() {
    toggleModal();
  }

  async function goToResponse() {
    if (!profile?.Id) return;
    const responseMessage = document.getElementById(
      `message/${message.responseTo.Id}`
    );
    if (responseMessage) {
      responseMessage.scrollIntoView();
      return;
    }

    fetchToResponseToMessage(profile?.Id);
  }

  return (
    <div
      className="message-content medium-font"
      style={{ color: color, ...contentStyle }}
    >
      {message.responseTo && (
        <div className="message-responseTo" onClick={goToResponse}>
          <>
            <div className="message-responseTo-content">
              <div className="message-responseTo-content__autor">
                Respond to{" "}
                <span className="bolder">{message.responseTo.SenderName}</span>
              </div>
              <span className="message-responseTo-content__text">
                {message.responseTo.TextContent}
              </span>
              {message.responseTo.MediaFiles.length > 0 && (
                <div
                  className="message-responseTo-content__media"
                  style={{
                    gridTemplateColumns: `repeat(${responseGridSize}, 1fr)`,
                  }}
                >
                  {message.responseTo.MediaFiles.map((mediaFile) => (
                    <img key={mediaFile} src={mediaFile} alt="" />
                  ))}
                </div>
              )}
            </div>
          </>
        </div>
      )}
      {message.TextContent}
      {message.MediaFiles.length > 0 && (
        <div
          className="message-content-media"
          style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
          onClick={showBigImages}
        >
          {message.MediaFiles.map((mediaFile) => (
            <img key={mediaFile} src={mediaFile} alt="" />
          ))}
        </div>
      )}
      {message.VoiceFile && (
        <audio
          className="message-content-audio"
          src={message.VoiceFile}
          controls={true}
        />
      )}
    </div>
  );
};

interface BigImageModalProps extends MessageChildProps {
  isOpen: boolean;
  toggleModal: any;
}
const BigImageShown = ({
  message,
  isOpen,
  toggleModal,
}: BigImageModalProps) => {
  return (
    <BigImageModal
      isOpen={isOpen}
      toggleModal={toggleModal}
      children={
        <div
          className="full-container flex-column-center"
          style={{ height: "100vh" }}
        >
          <span className="body" style={{ height: "100%" }}>
            <ShowFullImages
              images={message.MediaFiles}
              toggleModal={toggleModal}
            />
          </span>
        </div>
      }
    />
  );
};
