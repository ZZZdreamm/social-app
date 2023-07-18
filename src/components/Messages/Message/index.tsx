import { useContext, useEffect, useState } from "react";
import ProfileContext from "../../../services/Contexts/ProfileContext";
import {
  messageDTO,
  messageResponseDTO,
} from "../../../services/Models/message.models";

import MessageOptions from "../../../components/Messages/Message/MessageOptions";
import ShowFullImages from "../../../_utils/ShowFullImages";
import "./style.scss";
import BigImageModal from "../../../_utils/BigImageModal/index";
import { postDataToServer } from "../../../services/Firebase/FirebaseFunctions";

interface MessageProps {
  message: messageDTO;
  setMessages: (messages: messageDTO[]) => void;
  setResponseToMessage: (message: messageResponseDTO) => void;
  toWhom: string;
  optionsOpen: string;
  setOptionsOpen: (name: string) => void;
  notResponding?: boolean;
}

export default function Message({
  message,
  setMessages,
  setResponseToMessage,
  notResponding,
  toWhom,
  optionsOpen,
  setOptionsOpen,
}: MessageProps) {
  const { myProfile } = useContext(ProfileContext);
  const [styling, setStyling] = useState({});
  const [fromFriend, setFromFriend] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [optionsVisible, setOptionsVisible] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    if (!myProfile) return;
    if (myProfile.Id == message.SenderId) {
      setStyling({ alignSelf: "flex-end", flexDirection: "row-reverse" });
    } else {
      setStyling({ alignSelf: "flex-start", flexDirection: "row" });
      setFromFriend(true);
    }
  }, [myProfile]);
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
      <BigImageShown
        message={message}
        isOpen={isOpen}
        toggleModal={toggleModal}
      />
      <MessageContent
        message={message}
        fromFriend={fromFriend}
        toggleModal={toggleModal}
        setMessages={setMessages}
      />
      {notResponding && (
        <div style={{ opacity: optionsVisible ? "1" : "0" }}>
          <MessageOptions
            message={message}
            setMessages={setMessages}
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
  setMessages: (messages: messageDTO[]) => void;
}

const MessageContent = ({
  message,
  fromFriend,
  toggleModal,
  setMessages,
}: MessageContentProps) => {
  const { myProfile } = useContext(ProfileContext);
  const [scrollToMessage, setScrollToMessage] = useState(false);
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
    console.log(message.MediaFiles);
    toggleModal();
  }

  async function goToResponse() {
    const responseMessage = document.getElementById(
      `message/${message.responseTo.Id}`
    );
    if (responseMessage) {
      responseMessage.scrollIntoView();
      return;
    }
    const fetchedMessages = await postDataToServer(
      {
        userId: myProfile.Id,
        friendId:
          message.SenderId === myProfile.Id
            ? message.ReceiverId
            : message.SenderId,
        messageId: message.responseTo.Id,
      },
      "get-all-to-message"
    );
    const newMesses: any[] = [];
    fetchedMessages?.forEach((message: messageDTO, index: number) => {
      if (fetchedMessages?.length == index + 1) {
        newMesses.push("empty");
      }
      newMesses.push(message);
    });

    setMessages(newMesses.reverse());
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
