import "./style.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import uuid4 from "uuid4";
import { socket } from "../../../App";
import { storageRef } from "../../../services/Firebase/FirebaseConfig";
import { postDataToServer } from "../../../services/Firebase/FirebaseFunctions";
import ListOfMessages from "../../Messages/ListOfMessages";
import RecordMessager from "../../Messages/RecordMessager";
import {
  messageCreationDTO,
  messageDTO,
  messageResponseDTO,
} from "../../../services/Models/message.models";
import MultipleFileInput from "../../Posts/MultipleFileInput";
import { openCallWindow } from "../../WebRTC/CallFunctions";
import ProfileContext from "../../../services/Contexts/ProfileContext";
import { profileDTO } from "../../../ZZZ_USEFUL COMPONENTS/Profile/profiles.models";
import { removeOnlyText } from "../../../ZZZ_USEFUL COMPONENTS/Utilities/DivControl";
import useIsInViewport from "../../../ZZZ_USEFUL COMPONENTS/Utilities/IsInViewPort";
import { ReadyImagesURL } from "../../../globals/appUrls";
import ChatWithFriend from "../../Messages/ChatWithFriend";

interface MessagerChatProps {
  friend: profileDTO;
  setChoosenFriend: (profile: profileDTO | undefined) => void;
  fullScreen?: boolean;
}

export default function MessagerChat({
  friend,
  setChoosenFriend,
  fullScreen,
}: MessagerChatProps) {
  const chatSize = fullScreen ? { width: "100%" } : {};

  const closer = fullScreen ? (
    <img
      className="chat-header-userProfile-image"
      style={{ marginRight: "1rem" }}
      src={`${ReadyImagesURL}/goBackArrow.png`}
      onClick={() => setChoosenFriend(undefined)}
      alt=""
    />
  ) : undefined;
  return (
    <section className="messager-chat" style={chatSize}>
      {friend && (
        <ChatWithFriend
          key={friend.Id}
          friend={friend}
          chatInMessager={true}
          smallChatClose={closer}
        />
      )}
    </section>
  );
}
