import { useContext, useEffect, useState } from "react";
import { message } from "./message.models";
import ProfileContext from "../ZZZ_USEFUL COMPONENTS/Profile/ProfileContext";
import { ReadyImagesURL } from "../ZZZ_USEFUL COMPONENTS/appUrls";

export default function Message({ message }: MessageProps) {
  const { myProfile } = useContext(ProfileContext);
  const [styling, setStyling] = useState({});
  const [fromFriend, setFromFriend] = useState(false);

  useEffect(() => {
    if (!myProfile) return;
    if (myProfile.Id == message.SenderId) {
      setStyling({ alignSelf: "flex-end" });
    } else {
      setStyling({ alignSelf: "flex-start" });
      setFromFriend(true);
    }
  }, [myProfile]);
  const contentBackgroundColor = fromFriend ? '#89CFF0' : ''
  return (
    <div className="message" style={styling}>
      <div className="message-content" style={{backgroundColor:contentBackgroundColor}}>
        {message.TextContent}
        {message.MediaFile && <img src={message.MediaFile}/>}
      </div>
    </div>
  );
}

interface MessageProps {
  message: message;
}
