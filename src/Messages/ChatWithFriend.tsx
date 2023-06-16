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

export default function ChatWithFriend({ friend }: ChatWithFriendProps) {
  const { openedChats, updateOpenedChats } = useContext(OpenedChatsContext);
  const { myProfile } = useContext(ProfileContext);
  const [messages, setMessages] = useState<message[]>([]);
  const [textToSend, setTextToSend] = useState("");
  const [choosenImage, setChoosenImage] = useState("");
  const [file, setFile] = useState<File>();
  const [chatOpen, setChatOpen] = useState(false);
  const [fetchedAllMessages, setFetchedAllMessages] = useState(false)
  const image = friend.ProfileImage || `${ReadyImagesURL}/noProfile.jpg`;
  let numberOfMessages = 10;

  const messagesEndRef = useRef(null);
  const newestMessagesRef = useRef<HTMLElement | null>(null);
  const inputMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!newestMessagesRef.current) return;
    newestMessagesRef.current.scrollIntoView();
  }, [newestMessagesRef, chatOpen]);
  var scrolledPageBottom = useIsInViewport(messagesEndRef, "200px");
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
            newestMessagesRef.current!.scrollIntoView();
          }, 400);
        }
      });
    }
  }, [myProfile, newestMessagesRef]);
  async function getMessages() {
    if(fetchedAllMessages) return
    const messagesToGet = messages?.length + numberOfMessages;
    const messes = await postDataToServer(
      {
        userId: myProfile.Id,
        friendId: friend.Id,
        numberOfMessages: messagesToGet,
      },
      "get-chat-messages"
    );
    if(messes && messages && messes.length == messages.length){
      setFetchedAllMessages(true)
    }
    setChatOpen(true);
    setMessages(messes.reverse());
  }
  async function sendMessage() {
    let messageToSend = {
      SenderId: myProfile.Id,
      ReceiverId: friend.Id,
      TextContent: textToSend,
      MediaFile: "",
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
    socket.emit("send-message", messageToSend);
    setTimeout(() => {
      setChoosenImage("");
      setFile(undefined);
      setTextToSend("");
      removeOnlyText(inputMessageRef);
      if(newestMessagesRef.current){
        newestMessagesRef.current.scrollIntoView();
      }
    }, 500);
  }

  function closeChat() {
    const chats = openedChats.filter((chat) => chat.Id != friend.Id);
    updateOpenedChats(chats);
  }
  const inputSize = textToSend != "" || choosenImage != "" ? "80%" : "50%";

  return (
    <section className="chat">
      <div className="chat-header">
        <span className="chat-header-userProfile">
          <img className="chat-header-userProfile-image" src={image} />
          {friend.Email}
        </span>
        <img
          className="chat-header-close"
          src={`${ReadyImagesURL}/redX.png`}
          onClick={closeChat}
        />
        
      </div>
      <div className="chat-body">
        <div className="chat-body-start">
          <img src={image} />
          <h5>{friend.Email}</h5>
        </div>
        <span ref={messagesEndRef}></span>
        <ListOfMessages messages={messages} />
        <span ref={newestMessagesRef}></span>
      </div>
      <div className="chat-footer">
        {textToSend == "" && (
          <FileInput
            imageFunction={setChoosenImage}
            fileFunction={setFile}
            callback={() => {}}
          />
        )}
        <div className="chat-footer-container" style={{ width: inputSize }}>
          <div
            ref={inputMessageRef}
            className="chat-footer-input"
            contentEditable={true}
            onInput={(e: any) => setTextToSend(e.target.innerText)}
          >
            {choosenImage && (
              <img className="chat-footer-input-image" src={choosenImage} />
            )}
          </div>
        </div>
        <img
          className="chat-footer-send"
          src={
            !textToSend && !file
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
