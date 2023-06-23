import { useContext, useEffect, useRef, useState } from "react";
import { profileDTO } from "../ZZZ_USEFUL COMPONENTS/Profile/profiles.models";
import { ReadyImagesURL } from "../ZZZ_USEFUL COMPONENTS/appUrls";
import ProfileContext, {
  OpenedChatsContext,
} from "../ZZZ_USEFUL COMPONENTS/Profile/ProfileContext";
import { message } from "./message.models";
import ListOfMessages from "./ListOfMessages";
import { socket } from "../App";
import { storageRef } from "../Firebase/FirebaseConfig";
import uuid4 from "uuid4";
import FileInput from "../ZZZ_USEFUL COMPONENTS/Utilities/FileInput";
import { postDataToServer } from "../Firebase/FirebaseFunctions";
import useEffectAfterSecondRender from "../ZZZ_USEFUL COMPONENTS/Utilities/useEffectAfterSecondRender";
import useIsInViewport from "../ZZZ_USEFUL COMPONENTS/Utilities/IsInViewPort";
import { removeOnlyText } from "../ZZZ_USEFUL COMPONENTS/Utilities/DivControl";
import { openCallWindow } from "../WebRTC/CallFunctions";
import RecordMessager from "./RecordMessager";

export default function ChatWithFriend({ friend }: ChatWithFriendProps) {
  const { openedChats, updateOpenedChats } = useContext(OpenedChatsContext);
  const { myProfile } = useContext(ProfileContext);
  const [messages, setMessages] = useState<any[]>([]);
  const [textToSend, setTextToSend] = useState("");
  const [choosenImage, setChoosenImage] = useState("");
  const [file, setFile] = useState<File>();
  const [audioURL, setAudioURL] = useState("");
  const [voiceMessage, setVoiceMessage] = useState<Blob>();
  const [removedVoiceMes, setRemovedVoiceMes] = useState(false);

  const [chatOpen, setChatOpen] = useState(false);
  const [fetchedAllMessages, setFetchedAllMessages] = useState(false);
  const image = friend.ProfileImage || `${ReadyImagesURL}/noProfile.jpg`;
  let numberOfMessages = 10;

  const messagesEndRef = useRef(null);
  const newestMessagesRef = useRef<HTMLElement | null>(null);
  const inputMessageRef = useRef<HTMLDivElement | null>(null);
  const wholeMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!newestMessagesRef.current) return;
    newestMessagesRef.current.scrollIntoView();
  }, [newestMessagesRef, chatOpen]);
  var scrolledPageBottom = useIsInViewport(messagesEndRef, "400px");
  useEffect(() => {
    if (scrolledPageBottom) {
      getMessages();
    }
  }, [scrolledPageBottom]);

  useEffect(() => {
    if (myProfile.Id && newestMessagesRef) {
      getMessages();
      socket.on(`receive-message/${myProfile.Id}/${friend.Id}`, (message) => {
        if (!messages.includes(message)) {
          setMessages((messages: message[]) => {
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
  }, [myProfile, newestMessagesRef]);
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
    messes.forEach((message: any, index: number) => {
      if (messages?.length == index + 1) {
        newMesses.push("empty");
      }
      newMesses.push(message);
    });
    setMessages(newMesses.reverse());
  }
  useEffect(() => {
    const scrollableSpan = document.getElementById(
      `scrollable-span/${friend.Id}`
    );
    if (scrollableSpan) {
      scrollableSpan.scrollIntoView();
    }
  }, [messages]);

  async function sendMessage() {
    let messageToSend = {
      SenderId: myProfile.Id,
      ReceiverId: friend.Id,
      TextContent: textToSend,
      MediaFile: "",
      VoiceFile: "",
      Date: Date.now(),
    };
    if (file) {
      const imageRef = storageRef.child(
        `/messageImages/${file?.name}+${uuid4()}`
      );
      await imageRef.put(file!);
      const url = await imageRef.getDownloadURL();
      messageToSend.MediaFile = url;
    }
    if (voiceMessage) {
      const voiceRef = storageRef.child(`/messageVoices/${uuid4()}`);
      await voiceRef.put(voiceMessage!);
      const url = await voiceRef.getDownloadURL();
      messageToSend.VoiceFile = url;
    }
    socket.emit("send-message", messageToSend);
    setTimeout(() => {
      setChoosenImage("");
      setFile(undefined);
      setVoiceMessage(undefined);
      setAudioURL("");
      setRemovedVoiceMes(true);
      setTextToSend("");
      removeOnlyText(inputMessageRef);
      if (newestMessagesRef.current) {
        newestMessagesRef.current.scrollIntoView();
      }
    }, 500);
  }

  function closeChat() {
    const chats = openedChats.filter((chat) => chat.Id != friend.Id);
    updateOpenedChats(chats);
  }
  const inputSize =
    textToSend != "" || choosenImage != "" || audioURL != "" ? "80%" : "30%";

  function eraseChoosenImage() {
    setChoosenImage("");
    setFile(undefined);
  }

  useEffect(() => {
    console.log(audioURL);
  }, [audioURL]);

  return (
    <section className="chat">
      <div className="chat-header">
        <span className="chat-header-userProfile">
          <img className="chat-header-userProfile-image" src={image} />
          {friend.Email}
        </span>
        <img
          className="chat-header-call"
          src={`${ReadyImagesURL}/video-call.png`}
          onClick={() => {
            const roomId = uuid4();
            socket.emit("create-join-room", {
              myId: myProfile.Id,
              friendId: friend.Id,
              roomId: roomId,
            });
            openCallWindow(myProfile, friend, roomId, "caller");
          }}
        />
        <img
          className="chat-header-close"
          src={`${ReadyImagesURL}/redX.png`}
          onClick={closeChat}
        />
      </div>
      <div id={`chat-body/${friend.Id}`} className="chat-body">
        <div className="chat-body-start">
          <img src={image} />
          <h5>{friend.Email}</h5>
        </div>
        <span ref={messagesEndRef}></span>
        <ListOfMessages messages={messages} />
        <span ref={newestMessagesRef}></span>
      </div>
      <div className="chat-footer">
        {textToSend == "" && !voiceMessage && choosenImage == "" && (
          <div style={{ width: "3rem", height: "3rem", padding:'0.2rem' }}>
            <FileInput
              imageFunction={setChoosenImage}
              fileFunction={setFile}
              callback={() => {}}
            />
          </div>
        )}
        <RecordMessager
          setVoiceMessage={setVoiceMessage}
          setAudioURL={setAudioURL}
          voiceMessage={voiceMessage}
          removedVoiceMes={removedVoiceMes}
          setRemovedVoiceMes={setRemovedVoiceMes}
        />
        <div className="chat-footer-container" style={{ width: inputSize }}>
          <div ref={wholeMessageRef} className="chat-footer-input">
            <div
              ref={inputMessageRef}
              style={{ height: "100%", width: "100%", outline: "none" }}
              contentEditable={true}
              onInput={(e: any) => setTextToSend(e.target.innerText)}
            ></div>
            {choosenImage && (
              <span style={{ display: "flex", gap: "0.3rem" }}>
                <div style={{ width: "3rem", height: "3rem" }}>
                  <FileInput
                    imageFunction={setChoosenImage}
                    fileFunction={setFile}
                    callback={() => {}}
                  />
                </div>
                <div className="chat-footer-input-image">
                  <img
                    style={{ height: "100%", width: "100%", outline: "none" }}
                    src={choosenImage}
                  />
                  <img
                    className="erase-image"
                    src={`${ReadyImagesURL}/redX.png`}
                    onClick={eraseChoosenImage}
                  />
                </div>
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
            !textToSend && !file && !voiceMessage
              ? `${ReadyImagesURL}/like.png`
              : `${ReadyImagesURL}/sendBtn.png`
          }
          onClick={sendMessage}
        />
      </div>
    </section>
  );
}

interface ChatWithFriendProps {
  friend: profileDTO;
}
