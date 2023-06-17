import { cloneElement, useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ReactDOM from "react-dom";
import { ReadyImagesURL } from "../ZZZ_USEFUL COMPONENTS/appUrls";
import { socket } from "../App";
import SimplePeer, { Instance } from "simple-peer";

export default function VideoCall() {
  const { userId, friendId } = useParams();
  const [me, setMe] = useState("");
  const [microOn, setMicroOn] = useState("on");
  const [cameraOn, setCameraOn] = useState("on");
  const [videoDisplay, setVideoDisplay] = useState("block");

  const [stream, setStream] = useState<MediaStream>();
  const [receivingCall, setReceivingCall] = useState<boolean | undefined>();
  const [caller, setCaller] = useState();
  const [name, setName] = useState();
  const [callerSignal, setCallerSingal] = useState();
  const [callAccepted, setCallAccepted] = useState<boolean | undefined>();
  const [callEnded, setCallEnded] = useState<boolean>();
  const [idToCall, setIdToCall] = useState();

  const myVideo = useRef<HTMLVideoElement | null>(null);
  const friendVideo = useRef<HTMLVideoElement | null>(null);
  const connectionRef = useRef<Instance | undefined>();

  const [mutedOthers, setMutedOthers] = useState(false);

  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);

  useEffect(() => {
    socket.on("me", (id) => {
      setMe(id);
    });

    socket.on("call-user", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSingal(data.signal);
    });
  }, []);

  useEffect(() => {
    if (!idToCall) return;
    socket.on("user-left", () => {
      leaveCall(true);
    });
  }, [idToCall]);

  useEffect(() => {
    if (!myVideo.current) return;
    allowYourCamera();
  }, [myVideo.current, myVideo]);

  useEffect(() => {
    if (!userId) return;
    if (!me) return;
    socket.on(`friend-id/${userId}`, (data) => {
      setIdToCall(data.callId);
    });
  }, [userId, me]);

  useEffect(() => {
    if (!idToCall) return;
    callUser(idToCall);
  }, [idToCall]);

  const callUser = (id: any) => {
    console.log(id);
    const peer = new SimplePeer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("call-user", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name,
      });
    });

    peer.on("stream", (stream) => {
      friendVideo.current!.srcObject = stream;
    });

    socket.on("call-accepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    peer.on("error", () => {
      window.close();
    });

    connectionRef.current = peer;
    setTimeout(() => {
      socket.emit("call-for-answer");
    }, 3000);
  };

  const leaveCall = (dontDestroy?: boolean) => {
    setCallEnded(true);
    if (dontDestroy) {
      socket.emit("leave-call", { friendId: idToCall });
      window.close();
    }
    if(connectionRef.current?.streams[0]){
      connectionRef.current?.removeStream(stream!);
    }
    socket.emit("leave-call", { friendId: idToCall });
    window.close();
  };

  function allowYourCamera() {
    try {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: true,
        })
        .then((stream) => {
          setStream(stream);
          myVideo.current!.srcObject = stream;
        });
    } catch {
      console.log("error has happened");
    }
  }

  function toggleMuteYourself(peer: SimplePeer.Instance) {
    const audioTrack = stream?.getAudioTracks()[0];
    stream?.getAudioTracks().forEach((track) => {
      if (track == audioTrack) {
        track.enabled = !audioEnabled;
      }
    });
    peer.streams[0] = stream!;
    setAudioEnabled(!audioEnabled);
    setMicroOn(audioEnabled ? "off" : "on");
  }

  const toggleCamera = (peer: SimplePeer.Instance) => {
    const videoTruck = stream?.getVideoTracks()[0];
    stream?.getVideoTracks().forEach((track) => {
      if (track == videoTruck) {
        track.enabled = !videoEnabled;
      }
    });
    peer.streams[0] = stream!;
    setVideoEnabled(!videoEnabled);
    setCameraOn(videoEnabled ? "off" : "on");
  };

  return (
    <Portal>
      <div className="call">
        <video
          id="video"
          className="video"
          muted
          style={{ display: `${videoDisplay}` }}
          autoPlay={true}
          ref={myVideo}
        ></video>
        <video
          id="friendVideo"
          className="friendVideo"
          muted={mutedOthers}
          ref={friendVideo}
          autoPlay={true}
        ></video>
        <div className="call-options">
          <div style={{ color: "white" }}>{me}</div>
          {connectionRef.current && (
            <>
              <img
                className="call-options-option"
                src={`${ReadyImagesURL}/micro-${microOn}.png`}
                onClick={() => toggleMuteYourself(connectionRef.current!)}
              />
              <img
                className="call-options-option"
                src={`${ReadyImagesURL}/camera-${cameraOn}.png`}
                onClick={() => toggleCamera(connectionRef.current!)}
              />
              <img
                src={`${ReadyImagesURL}/leave-call.png`}
                className="call-options-option"
                onClick={() => leaveCall()}
              />{" "}
            </>
          )}
        </div>
      </div>
    </Portal>
  );
}

export function Portal({ children }: any) {
  if (typeof document == "undefined") {
    return <>{children}</>;
  }
  return ReactDOM.createPortal(children, document.body);
}
