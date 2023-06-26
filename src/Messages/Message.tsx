import { useContext, useEffect, useState } from "react";
import { messageDTO } from "./message.models";
import ProfileContext from "../ZZZ_USEFUL COMPONENTS/Profile/ProfileContext";
import { ReadyImagesURL } from "../ZZZ_USEFUL COMPONENTS/appUrls";
import MyModal from "../ZZZ_USEFUL COMPONENTS/Utilities/Modal";

interface MessageProps {
  message: messageDTO;
}

export default function Message({ message }: MessageProps) {
  const { myProfile } = useContext(ProfileContext);
  const [styling, setStyling] = useState({});
  const [fromFriend, setFromFriend] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal(isOpen: any, setIsOpen: any) {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    if (!myProfile) return;
    if (myProfile.Id == message.SenderId) {
      setStyling({ alignSelf: "flex-end" });
    } else {
      setStyling({ alignSelf: "flex-start" });
      setFromFriend(true);
    }
  }, [myProfile]);
  const contentStyle = fromFriend ? {} : { backgroundColor: "#0084ff", color: "white" };

  const gridSize = message.MediaFiles.length < 4 ? message.MediaFiles.length : 4;
  function showBigImages() {
    setIsOpen(true);
  }
  return (
    <div className="message" style={styling}>
      <MyModal isOpen={isOpen} toggleModal={toggleModal} children={<></>} submitButtonText={""} onSubmit={undefined} />
      <div
        className="message-content medium-font"
        style={contentStyle}
      >
        {message.TextContent}
        {message.MediaFiles.length > 0 && (
          <div className="message-content-media" onClick={showBigImages} style={{gridTemplateColumns:`repeat(${gridSize}, 1fr)`}}>
            {message.MediaFiles.map((mediaFile) => (
              <img src={mediaFile} />
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
    </div>
  );
}


