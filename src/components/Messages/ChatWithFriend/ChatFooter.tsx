import "./style.scss";
import { useRef, useState } from "react";
import uuid4 from "uuid4";
import { socket } from "../../../App";
import { storageRef } from "../../../services/Firebase/FirebaseConfig";
import {
  messageCreationDTO,
  messageResponseDTO,
} from "../../../services/Models/message.models";

import { removeOnlyText } from "../../../_utils/1Functions/DivControl";
import { ReadyImagesURL } from "../../../globals/appUrls";
import MultipleFileInput from "../../Posts/MultipleFileInput";
import RecordMessager from "../RecordMessager";
import { useAuthenticationContext } from "../../../services/Contexts/AuthenticationContext";
import { FriendProps } from ".";

interface ChatFooterAttributes extends FriendProps {
  newestMessagesRef: any;
  respondTo: messageResponseDTO | undefined;
  setRespondTo: (message: messageResponseDTO | undefined) => void;
}

export const ChatFooter = ({
  friend,
  newestMessagesRef,
  respondTo,
  setRespondTo,
}: ChatFooterAttributes) => {
  const { profile } = useAuthenticationContext();
  const [textToSend, setTextToSend] = useState("");
  const [audioURL, setAudioURL] = useState("");
  const [voiceMessage, setVoiceMessage] = useState<Blob>();
  const [removedVoiceMes, setRemovedVoiceMes] = useState(false);
  const [filesArray, setFilesArray] = useState<[File, string][]>([]);
  const inputMessageRef = useRef<HTMLDivElement | null>(null);
  const wholeMessageRef = useRef<HTMLDivElement | null>(null);

  async function sendMessage() {
    let messageToSend: messageCreationDTO = {
      SenderId: profile?.Id ?? "",
      ReceiverId: friend.Id,
      SenderName: profile?.Email.split("@")[0] ?? "",
      TextContent: textToSend,
      MediaFiles: [],
      VoiceFile: "",
      Date: Date.now(),
      Emojis: [],
      AmountOfEmojis: 0,
      responseTo: respondTo,
    };
    let filesUrls: Promise<string>[] = [];

    if (filesArray.length > 0) {
      filesUrls = filesArray.map(async ([file, _]) => {
        const imageRef = storageRef.child(
          `/messageImages/${file?.name}+${uuid4()}`
        );
        await imageRef.put(file!);
        const url = await imageRef.getDownloadURL();
        return url;
      });
    }
    messageToSend.MediaFiles = await Promise.all(filesUrls);

    if (voiceMessage) {
      const voiceRef = storageRef.child(`/messageVoices/${uuid4()}`);
      await voiceRef.put(voiceMessage!);
      const url = await voiceRef.getDownloadURL();
      messageToSend.VoiceFile = url;
    }
    socket.emit("send-message", messageToSend);
    setTimeout(() => {
      setFilesArray([]);
      setVoiceMessage(undefined);
      setAudioURL("");
      setRemovedVoiceMes(true);
      setTextToSend("");
      setRespondTo(undefined);
      removeOnlyText(inputMessageRef);
      if (newestMessagesRef.current) {
        newestMessagesRef.current.scrollIntoView();
      }
    }, 500);
  }

  const inputSize =
    textToSend !== "" || filesArray.length > 0 || audioURL !== ""
      ? "80%"
      : "45%";

  const handleFileChange = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64Data = reader.result;
      //@ts-ignore
      setFilesArray((filesArray: [File, string][]) => {
        return [...filesArray, [file, base64Data]];
      });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  function eraseChoosenFile(name: string) {
    const newFilesArray = filesArray.filter(([file, _]) => file.name !== name);
    setFilesArray(newFilesArray);
  }
  return (
    <div className="chat-footer">
      {textToSend === "" && !voiceMessage && filesArray.length <= 0 && (
        <div style={{ width: "3rem", height: "3rem", padding: "0.2rem" }}>
          <MultipleFileInput handleFileChange={handleFileChange} />
        </div>
      )}
      <RecordMessager
        setVoiceMessage={setVoiceMessage}
        setAudioURL={setAudioURL}
        voiceMessage={voiceMessage}
        removedVoiceMes={removedVoiceMes}
        setRemovedVoiceMes={setRemovedVoiceMes}
      />
      {respondTo && (
        <div className="chat-footer-input-responseTo flexColumnLeft medium-font">
          <img
            className="erase-image"
            onClick={() => setRespondTo(undefined)}
            src={`${ReadyImagesURL}/close.png`}
            alt=""
          />
          <span>
            You respond to{" "}
            <span className="bolder">{respondTo.SenderName}</span>
          </span>
          {respondTo.MediaFiles.length > 0 && <span>Image</span>}
          <span className="chat-footer-input-responseTo__text">
            {respondTo.TextContent}
          </span>
        </div>
      )}

      <div className="chat-footer-container" style={{ width: inputSize }}>
        <div ref={wholeMessageRef} className="chat-footer-input">
          <div
            ref={inputMessageRef}
            style={{ height: "100%", width: "100%", outline: "none" }}
            contentEditable={true}
            onInput={(e: any) => setTextToSend(e.target.innerText)}
          ></div>
          {filesArray && filesArray.length > 0 && (
            <span className="chat-footer-input-images-container">
              <div style={{ width: "3rem", height: "3rem" }}>
                <MultipleFileInput handleFileChange={handleFileChange} />
              </div>
              {filesArray.map(([file, displayFile]) => (
                <div
                  className="chat-footer-input-image"
                  style={{ width: "3rem" }}
                >
                  <img
                    style={{ height: "100%", width: "3rem", outline: "none" }}
                    src={displayFile}
                    alt=""
                  />
                  <img
                    className="erase-image"
                    src={`${ReadyImagesURL}/redX.png`}
                    onClick={() => eraseChoosenFile(file.name)}
                    alt=""
                  />
                </div>
              ))}
            </span>
          )}
          {voiceMessage && audioURL && (
            <audio style={{ width: "100%" }} src={audioURL} controls={true} />
          )}
        </div>
      </div>
      <img
        className="chat-footer-send"
        src={
          !textToSend && filesArray.length === 0 && !voiceMessage
            ? `${ReadyImagesURL}/like.png`
            : `${ReadyImagesURL}/sendBtn.png`
        }
        onClick={sendMessage}
        alt=""
      />
    </div>
  );
};
