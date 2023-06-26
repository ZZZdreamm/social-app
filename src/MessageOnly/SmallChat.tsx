import uuid4 from "uuid4";
import ListOfMessages from "../Messages/ListOfMessages";
import { openCallWindow } from "../WebRTC/CallFunctions";
import { profileDTO } from "../ZZZ_USEFUL COMPONENTS/Profile/profiles.models";
import { ReadyImagesURL } from "../ZZZ_USEFUL COMPONENTS/appUrls";
import { socket } from "../App";
import MultipleFileInput from "../Posts/MultipleFileInput";
import RecordMessager from "../Messages/RecordMessager";
import { removeOnlyText } from "../ZZZ_USEFUL COMPONENTS/Utilities/DivControl";
import { storageRef } from "../Firebase/FirebaseConfig";
import { messageCreationDTO, messageDTO } from "../Messages/message.models";
import { useEffect, useRef, useState, useContext } from "react";
import { postDataToServer } from "../Firebase/FirebaseFunctions";
import useIsInViewport from "../ZZZ_USEFUL COMPONENTS/Utilities/IsInViewPort";
import ProfileContext from "../ZZZ_USEFUL COMPONENTS/Profile/ProfileContext";

interface MessagerChatProps {
    friend: profileDTO;
  }

export default function SmallChat({friend}: MessagerChatProps){
    const { myProfile } = useContext(ProfileContext);
  const [messages, setMessages] = useState<any[]>([]);
  const [textToSend, setTextToSend] = useState("");
  const [audioURL, setAudioURL] = useState("");
  const [voiceMessage, setVoiceMessage] = useState<Blob>();
  const [removedVoiceMes, setRemovedVoiceMes] = useState(false);

  const [chatOpen, setChatOpen] = useState(false);
  const [fetchedAllMessages, setFetchedAllMessages] = useState<boolean | string>(false);
  const [filesArray, setFilesArray] = useState<[File, string][]>([]);
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
          }, 1000);
        }
      });
    }
  }, [myProfile, newestMessagesRef, friend.Id]);
  async function getMessages() {
    if (fetchedAllMessages == friend.Id) return;
    const messagesToGet = messages?.length + numberOfMessages;
    // const messes =
    postDataToServer(
      {
        userId: myProfile.Id,
        friendId: friend.Id,
        numberOfMessages: messagesToGet,
      },
      "get-chat-messages"
    ).then((messes) => {
      if (messes && messages && messes.length == messages.length) {
        setFetchedAllMessages(friend.Id);
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
    });
  }

  useEffect(() => {
    if (!friend.Id) return;
    const scrollableSpan = document.getElementById(`scrollable-span`);
    if (scrollableSpan) {
      scrollableSpan.scrollIntoView();
    }
  }, [messages, friend.Id]);

  async function sendMessage() {
    let messageToSend: messageCreationDTO = {
      SenderId: myProfile.Id,
      ReceiverId: friend.Id,
      TextContent: textToSend,
      MediaFiles: [],
      VoiceFile: "",
      Date: Date.now(),
    };
    let filesUrls: any = [];

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
      removeOnlyText(inputMessageRef);
      if (newestMessagesRef.current) {
        newestMessagesRef.current.scrollIntoView();
      }
    }, 500);
  }

  const inputSize =
    textToSend != "" || filesArray.length > 0 || audioURL != "" ? "80%" : "30%";

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
    <section className="messager-small-chat">
      <div className="messager-chat-header shadow-beneath">
        <span className="messager-chat-header-userProfile">
          <img className="messager-chat-header-userProfile-image" src={image} />
          {friend.Email}
        </span>
        <img
          className="messager-chat-header-call"
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
      </div>
      <div id={`chat-body/${friend.Id}`} className="messager-chat-body">
        <div className="messager-chat-body-start">
          <img src={image} />
          <h5>{friend.Email}</h5>
        </div>
        <span ref={messagesEndRef}></span>
        <ListOfMessages messages={messages} />
        <span ref={newestMessagesRef}></span>
      </div>
      <div className="messager-chat-footer shadow-above">
        <span
          style={{
            display: "flex",
            height: "80%",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          {textToSend == "" && !voiceMessage && filesArray.length <= 0 && (
            <MultipleFileInput handleFileChange={handleFileChange} />
          )}
          <RecordMessager
            setVoiceMessage={setVoiceMessage}
            setAudioURL={setAudioURL}
            voiceMessage={voiceMessage}
            removedVoiceMes={removedVoiceMes}
            setRemovedVoiceMes={setRemovedVoiceMes}
          />
        </span>
        <div
          className="messager-chat-footer-container"
          style={{ width: inputSize }}
        >
          <div ref={wholeMessageRef} className="messager-chat-footer-input">
            <div
              ref={inputMessageRef}
              style={{ height: "100%", width: "100%", outline: "none" }}
              contentEditable={true}
              onInput={(e: any) => setTextToSend(e.target.innerText)}
            ></div>
            {filesArray && filesArray.length > 0 && (
              <span className="messager-chat-footer-input-images-container">
                <div style={{ width: "5rem", height: "5rem" }}>
                  <MultipleFileInput handleFileChange={handleFileChange} />
                </div>
                {filesArray.map(([file, displayFile]) => (
                  <div className="messager-chat-footer-input-image">
                    <img
                      style={{ height: "100%", width: "100%", outline: "none" }}
                      src={displayFile}
                    />
                    <img
                      className="erase-image"
                      src={`${ReadyImagesURL}/redX.png`}
                      onClick={() => eraseChoosenFile(file.name)}
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
          className="messager-chat-footer-send"
          src={
            !textToSend && filesArray.length == 0 && !voiceMessage
              ? `${ReadyImagesURL}/like.png`
              : `${ReadyImagesURL}/sendBtn.png`
          }
          onClick={sendMessage}
        />
      </div>
    </section>
  );
}