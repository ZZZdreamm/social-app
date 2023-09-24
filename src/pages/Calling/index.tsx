import "./style.scss";
import { useEffect, useRef, useState } from "react";
import { socket } from "../../App";
import { useParams } from "react-router-dom";
import ReactDOM from "react-dom";
import { ReadyImagesURL } from "../../globals/appUrls";
import Portal from "../../_utils/Portal/Portal";

const config = {
  //   iceServers: [{ urls: ["stun.commpeak.com:3478", "stun.comtube.com:3478"] }],
};
const pc = new RTCPeerConnection(config);

export default function Calling() {
  const { who, userId, friendId, roomId } = useParams();
  const constraints = { audio: true, video: true };
  const selfVideo = useRef<HTMLVideoElement | null>(null);
  const remoteVideo = useRef<HTMLVideoElement | null>(null);

  const [targetUrl, setTargetUrl] = useState("");

  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [microOn, setMicroOn] = useState("on");
  const [videoOn, setVideoOn] = useState("on");

  const [userLeft, setUserLeft] = useState(false);


  useEffect(() => {
    if (!roomId) return;
    setTargetUrl(`${roomId}`);
  }, [roomId]);

  useEffect(() => {
    if (!userId) return;
    if (!friendId) return;
    if (!who) return;
    if (!targetUrl) return;
    socket.emit("join-call", {
      who: who,
      myId: userId,
      friendId: friendId,
      roomId: roomId,
    });
    socket.on("start-peering", () => {
      start();
    });
  }, [who, userId, friendId, targetUrl]);

  async function start() {
    try {
      if (selfVideo.current && remoteVideo.current) {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);

        for (const track of stream.getTracks()) {
          pc.addTrack(track, stream);
        }
        selfVideo.current.srcObject = stream;

        pc.ontrack = ({ track, streams }) => {
          track.onunmute = () => {
            if (remoteVideo.current!.srcObject) {
              return;
            }
            remoteVideo.current!.srcObject = streams[0];
            // remoteVideo.current!.srcObject = stream
          };
        };

        let makingOffer = false;
        if (who == "caller") {
          pc.onnegotiationneeded = async () => {
            try {
              makingOffer = true;
              // const offer = await pc.createOffer();
              setTimeout(async () => {
                await pc.setLocalDescription();
                console.log("sending offer");
                socket.send({
                  type: "video-offer",
                  description: pc.localDescription,
                  target: targetUrl,
                });
              }, 1000);
            } catch (err) {
              console.error(err);
            } finally {
              makingOffer = false;
            }
          };
        }

        pc.onconnectionstatechange = (event) => {
          if (pc.connectionState === "disconnected") {
            setUserLeft(true);
          }
        };

        pc.oniceconnectionstatechange = () => {
          if (pc.iceConnectionState === "failed") {
            pc.restartIce();
          }
        };

        pc.onicecandidate = ({ candidate }) => {
          setTimeout(() => {
            socket.send({ type: "iceCandidate", candidate, target: targetUrl });
          }, 1000);
        };

        let ignoreOffer = false;
        console.log(Date.now());
        socket.on("message", async (data) => {
          try {
            if (data.description) {
              const offerCollision =
                data.description.type === "offer" &&
                (makingOffer || pc.signalingState !== "stable");

              ignoreOffer =
                //   !polite &&
                offerCollision;
              if (ignoreOffer) {
                return;
              }
              console.log("remote description");
              await pc.setRemoteDescription(data.description);
              if (data.description.type === "offer") {
                await pc.setLocalDescription();
                socket.send({
                  type: "video-answer",
                  description: pc.localDescription,
                  target: targetUrl,
                });
              }
            } else if (data.answer) {
              await pc.setRemoteDescription(data.answer);
              console.log(data.answer);
            } else if (data.candidate && pc.remoteDescription) {
              try {
                await pc.addIceCandidate(data.candidate);
              } catch (err) {
                if (!ignoreOffer) {
                  throw err;
                }
              }
            }
          } catch (err) {
            console.error(err);
          }
        });
      } else {
        throw new Error("selfVideo.current is null");
      }
    } catch (err) {
      console.error(err);
    }
  }

  function setMuting(pc: RTCPeerConnection, muting: boolean) {
    let senderList = pc.getSenders();

    senderList.forEach((sender) => {
      const track = sender.track;
      if (track?.kind == "audio") {
        track.enabled = !muting;
      }
    });
    setAudioEnabled(!muting);
    setMicroOn(muting ? "off" : "on");
  }

  function setCameraVisibility(pc: RTCPeerConnection, muting: boolean) {
    let senderList = pc.getSenders();

    senderList.forEach((sender) => {
      const track = sender.track;
      if (track?.kind == "video") {
        track.enabled = !muting;
      }
    });
    setVideoEnabled(!muting);
    setVideoOn(muting ? "off" : "on");
  }

  function muteOthers(pc: RTCPeerConnection) {
    let receiverList = pc.getReceivers();

    receiverList.forEach((receiver) => {
      receiver.track!.enabled = !receiver.track!.enabled;
    });
  }

  function leaveCall() {
    // socket.emit("leave-call", { userId: userId, target: targetUrl });
    window.close();
  }

  return (
    <Portal>
      <div className="call">
        {!userLeft ? (
          <>
            <video
              id="video"
              className="video"
              muted
              autoPlay={true}
              ref={selfVideo}
            ></video>
            <video
              id="friendVideo"
              className="friendVideo"
              ref={remoteVideo}
              autoPlay={true}
            ></video>
          </>
        ) : (
          <div
            className="flex-column-center full-container"
            style={{ color: "white" }}
          >
            <h1>User left call</h1>
          </div>
        )}

        <div className="call-options">
          {selfVideo.current && (
            <>
              <img
                className="call-options-option"
                src={`${ReadyImagesURL}/micro-${microOn}.png`}
                onClick={() => setMuting(pc, audioEnabled)}
                alt=""
              />
              <img
                className="call-options-option"
                src={`${ReadyImagesURL}/camera-${videoOn}.png`}
                onClick={() => setCameraVisibility(pc, videoEnabled)}
                alt=""
              />

              <img
                className="call-options-option"
                src={`${ReadyImagesURL}/friends.png`}
                onClick={() => muteOthers(pc)}
                alt=""
              />
            </>
          )}

          <img
            src={`${ReadyImagesURL}/leave-call.png`}
            className="call-options-option"
            onClick={leaveCall}
            alt=""
          />
        </div>
      </div>
    </Portal>
  );
}
