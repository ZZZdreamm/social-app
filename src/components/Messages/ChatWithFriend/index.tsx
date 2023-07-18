import "./style.scss";

import { ReactElement, useContext, useEffect, useRef, useState } from "react";
import uuid4 from "uuid4";
import { socket } from "../../../App";
import ProfileContext, {
  OpenedChatsContext,
} from "../../../services/Contexts/ProfileContext";
import { storageRef } from "../../../services/Firebase/FirebaseConfig";
import { postDataToServer } from "../../../services/Firebase/FirebaseFunctions";
import {
  messageCreationDTO,
  messageDTO,
  messageResponseDTO,
} from "../../../services/Models/message.models";
import { profileDTO } from "../../../services/Models/profiles.models";

import { removeOnlyText } from "../../../_utils/1Functions/DivControl";
import { ReadyImagesURL } from "../../../globals/appUrls";
import MultipleFileInput from "../../Posts/MultipleFileInput";
import { openCallWindow } from "../../WebRTC/CallFunctions";
import ListOfMessages from "../ListOfMessages";
import RecordMessager from "../RecordMessager";
import useIsInViewport from "../../../_utils/2Hooks/IsInViewPort";

interface ChatWithFriendProps {
  friend: profileDTO;
  chatInMessager?: boolean;
  smallChatClose?: JSX.Element | undefined;
}

export default function ChatWithFriend({
  friend,
  chatInMessager,
  smallChatClose,
}: ChatWithFriendProps) {
  const [respondTo, setRespondTo] = useState<messageResponseDTO>();
  const newestMessagesRef = useRef<HTMLElement | null>(null);

  return (
    <section
      id={`chat/${friend.Id}`}
      className="chat"
      data-testid="chatWithFriend"
    >
      <ChatHeader
        friend={friend}
        chatInMessager={chatInMessager}
        smallChatClose={smallChatClose}
      />
      <ChatBody
        friend={friend}
        setRespondTo={setRespondTo}
        newestMessagesRef={newestMessagesRef}
      />
      <ChatFooter
        friend={friend}
        newestMessagesRef={newestMessagesRef}
        respondTo={respondTo}
        setRespondTo={setRespondTo}
      />
    </section>
  );
}

interface FriendProps {
  friend: profileDTO;
}

interface ChatHeaderProps extends FriendProps {
  smallChatClose?: JSX.Element | undefined;
  chatInMessager?: boolean;
}

const ChatHeader = ({
  friend,
  chatInMessager,
  smallChatClose,
}: ChatHeaderProps) => {
  const { myProfile } = useContext(ProfileContext);
  const { openedChats, updateOpenedChats } = useContext(OpenedChatsContext);
  const image = friend.ProfileImage || `${ReadyImagesURL}/noProfile.jpg`;

  function closeChat() {
    const chats = openedChats.filter((chat) => chat.Id != friend.Id);
    updateOpenedChats(chats);
  }
  function callFriend() {
    const roomId = uuid4();
    socket.emit("create-join-room", {
      myId: myProfile.Id,
      friendId: friend.Id,
      roomId: roomId,
    });
    openCallWindow(myProfile, friend, roomId, "caller");
  }
  return (
    <div id={`chat-header/${friend.Id}`} className="chat-header">
      {<>{smallChatClose}</>}
      <span className="chat-header-userProfile">
        <img className="chat-header-userProfile-image" src={image} alt="" />
        {friend.Email}
      </span>
      <img
        className="chat-header-call"
        src={`${ReadyImagesURL}/video-call.png`}
        onClick={callFriend}
        alt=""
      />
      {!chatInMessager && (
        <img
          data-testid="chatWithFriend-closeChat"
          className="chat-header-close"
          src={`${ReadyImagesURL}/close.png`}
          onClick={closeChat}
          alt=""
        />
      )}
    </div>
  );
};

interface ChatBodyProps extends FriendProps {
  setRespondTo: (message: messageResponseDTO | undefined) => void;
  newestMessagesRef: any;
  chatWontBeOpened?: boolean;
}

const ChatBody = ({
  friend,
  setRespondTo,
  newestMessagesRef,
}: ChatBodyProps) => {
  const { myProfile } = useContext(ProfileContext);
  const [messages, setMessages] = useState<any[]>([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [fetchedAllMessages, setFetchedAllMessages] = useState(false);
  const [additionalOptions, setAdditionalOptions] = useState("");
  const image = friend.ProfileImage || `${ReadyImagesURL}/noProfile.jpg`;
  const messagesEndRef = useRef(null);
  const numberOfMessages = 10;

  useEffect(() => {
    if (!newestMessagesRef.current) return;
    newestMessagesRef.current.scrollIntoView();
  }, [newestMessagesRef, chatOpen]);
  var scrolledChatUp = useIsInViewport(messagesEndRef, "400px");
  useEffect(() => {
    if (scrolledChatUp) {
      getMessages();
    }
  }, [scrolledChatUp]);

  useEffect(() => {
    if (myProfile.Id && newestMessagesRef && friend.Id) {
      getMessages();
      socket.on(`receive-message/${myProfile.Id}/${friend.Id}`, (message) => {
        if (!messages.includes(message)) {
          setMessages((messages: messageDTO[]) => {
            return [...messages, message];
          });
          setTimeout(() => {
            if (newestMessagesRef.current) {
              newestMessagesRef.current.scrollIntoView();
            }
          }, 400);
        }
      });
    }
  }, [myProfile, newestMessagesRef, friend.Id]);
  async function getMessages() {
    if (fetchedAllMessages) return;
    const messagesToGet = messages?.length + numberOfMessages;
    const messes = await postDataToServer(
      {
        userId: myProfile.Id,
        friendId: friend.Id,
        numberOfMessages: messagesToGet,
      },
      "get-chat-messages"
    );
    if (messes && messages && messes.length == messages.length) {
      setFetchedAllMessages(true);
    }
    setChatOpen(true);
    const newMesses: any[] = [];
    messes?.forEach((message: messageDTO, index: number) => {
      if (messages?.length == index + 1) {
        newMesses.push("empty");
      }
      newMesses.push(message);
    });
    setMessages(newMesses.reverse());
  }
  useEffect(() => {
    if (!friend.Id) return;
    const scrollableSpan = document.getElementById(`scrollable-span`);
    if (scrollableSpan) {
      scrollableSpan.scrollIntoView();
    }
  }, [messages, friend.Id]);
  return (
    <div id={`chat-body/${friend.Id}`} className="chat-body">
      <div className="chat-body-start">
        <img src={image} alt="" />
        <h5>{friend.Email}</h5>
      </div>
      <div className="chat-body-messages">
        <span ref={messagesEndRef}></span>
        <ListOfMessages
          messages={messages}
          setMessages={setMessages}
          setResponseToMessage={setRespondTo}
          toWhom={friend.Id}
          optionsOpen={additionalOptions}
          setOptionsOpen={setAdditionalOptions}
        />
        <span ref={newestMessagesRef}></span>
      </div>
    </div>
  );
};

interface ChatFooter extends FriendProps {
  newestMessagesRef: any;
  respondTo: messageResponseDTO | undefined;
  setRespondTo: (message: messageResponseDTO | undefined) => void;
}

const ChatFooter = ({
  friend,
  newestMessagesRef,
  respondTo,
  setRespondTo,
}: ChatFooter) => {
  const { myProfile } = useContext(ProfileContext);
  const [textToSend, setTextToSend] = useState("");
  const [audioURL, setAudioURL] = useState("");
  const [voiceMessage, setVoiceMessage] = useState<Blob>();
  const [removedVoiceMes, setRemovedVoiceMes] = useState(false);
  const [filesArray, setFilesArray] = useState<[File, string][]>([]);
  const inputMessageRef = useRef<HTMLDivElement | null>(null);
  const wholeMessageRef = useRef<HTMLDivElement | null>(null);

  async function sendMessage() {
    let messageToSend: messageCreationDTO = {
      SenderId: myProfile.Id,
      ReceiverId: friend.Id,
      SenderName: myProfile.Email.split("@")[0],
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
    textToSend != "" || filesArray.length > 0 || audioURL != "" ? "80%" : "45%";

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
    const newFilesArray = filesArray.filter(([file, _]) => file.name != name);
    setFilesArray(newFilesArray);
  }
  return (
    <div className="chat-footer">
      {textToSend == "" && !voiceMessage && filesArray.length <= 0 && (
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
          !textToSend && filesArray.length == 0 && !voiceMessage
            ? `${ReadyImagesURL}/like.png`
            : `${ReadyImagesURL}/sendBtn.png`
        }
        onClick={sendMessage}
        alt=""
      />
    </div>
  );
};
