import { ReadyImagesURL } from "./appUrls";

const imagesNames = {
    fileInput: `${ReadyImagesURL}/question-image.png`,
    options: `moreOptions.png`,
    goBack: `goBackArrow.png`,
    close: `close.png`,
    noProfile: `noProfile.jpg`,
    homeIcon: `homepage.png`,
    messagerIcon: `messaging-only.png`,
    profileIconArrow: `arrow.png`,
    logout: `logout.png`,
    videoCall: `video-call.png`,
    redClose: `redX.png`,
    likeIcon: `like.png`,
    chatSendIcon: `sendBtn.png`,
    blockSend: `cant-sendBtn.png`,
    messageOptionsIcon: `moreOptionsChat.png`,
    responseIcon: `response.png`,
    microChatOnIcon: `micro-on-chat.png`,
    stopRecord: `stop-record.png`,
    acceptCall: `accept-call.png`,
    leaveCall: `leave-call.png`,
    friendsIcon: `friends.png`,
    cameraOn: `camera-on.png`,
    cameraOff: `camera-off.png`,
    microOn: `micro-on.png`,
    microOff: `micro-off.png`,
}

for (const name in imagesNames){
    //@ts-ignore
    imagesNames[name] = `${ReadyImagesURL}/` + imagesNames[name];
}

export default imagesNames;