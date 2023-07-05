import { useContext, useEffect, useState } from "react";
import { messageDTO } from "../../Models/message.models";
import ProfileContext from "../../Contexts/ProfileContext";
import BigImageModal from "../../ZZZ_USEFUL COMPONENTS/Utilities/BigImageModal";
import { ReadyImagesURL } from "../../ZZZ_USEFUL COMPONENTS/appUrls";
import ScrollingMediaFiles from "../../ZZZ_USEFUL COMPONENTS/Utilities/ScrollingMediaFiles";

import "./style.scss";
import MessageOptions from "./MessageOptions";

interface MessageProps {
  message: messageDTO;
  setMessages: (messages: messageDTO[]) => void;
}

export default function Message({ message, setMessages }: MessageProps) {
  const { myProfile } = useContext(ProfileContext);
  const [styling, setStyling] = useState({});
  const [fromFriend, setFromFriend] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [optionsVisible, setOptionsVisible] = useState(false);

  function toggleModal(isOpen: any, setIsOpen: any) {
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
  const contentStyle = fromFriend
    ? { backgroundColor: "#E4E6EB" }
    : { backgroundColor: "#0084ff" };
  const color = fromFriend ? "#2f2f2f" : "#ffffff";

  const gridSize =
    message.MediaFiles.length < 4 ? message.MediaFiles.length : 4;
  function showBigImages() {
    setIsOpen(true);
  }
  return (
    <div
      className="message"
      style={styling}
      onMouseEnter={() => {
        setOptionsVisible(true);
      }}
      onMouseLeave={() => {
        setOptionsVisible(false);
      }}
    >
      <BigImageModal
        isOpen={isOpen}
        toggleModal={toggleModal}
        children={
          <div
            className="full-container flex-column-center"
            style={{ height: "100vh" }}
          >
            <span className="header">
              <img
                className="pointer"
                src={`${ReadyImagesURL}/goBackArrow.png`}
                onClick={() => toggleModal(isOpen, setIsOpen)}
                alt=""
              />
            </span>
            <span className="body" style={{ height: "90%" }}>
              <ScrollingMediaFiles mediaFiles={message.MediaFiles} />
            </span>
          </div>
        }
      />

      <div
        className="message-content medium-font"
        style={{ color: color, ...contentStyle }}
      >
        {message.TextContent}
        {message.MediaFiles.length > 0 && (
          <div
            className="message-content-media"
            onClick={showBigImages}
            style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
          >
            {message.MediaFiles.map((mediaFile) => (
              <img src={mediaFile} alt="" />
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
      <div style={{ opacity: optionsVisible ? "1" : "0" }}>
        <MessageOptions message={message} setMessages={setMessages}/>
      </div>
    </div>
  );
}
