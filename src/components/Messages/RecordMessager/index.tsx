import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { ReadyImagesURL } from "../../../globals/appUrls";
import { useState } from "react";

import "./style.scss"

export default function RecordMessager({
  setVoiceMessage,
  setAudioURL,
  voiceMessage,
  removedVoiceMes,
  setRemovedVoiceMes
}: RecordMessagerProps) {
  const [recording, setRecording] = useState(false);
  const recorderControls = useAudioRecorder();

  function toggleRecording() {
    if (recording) {
      recorderControls.stopRecording();
      setRecording(false);
    } else {
      setRemovedVoiceMes(false)
      recorderControls.startRecording();
      setRecording(true);
    }
  }

  const getVoiceMessage = (blob: any) => {
    if(removedVoiceMes) return
    const url = URL.createObjectURL(blob);
    setAudioURL(url);
    setVoiceMessage(blob);
  };

  function eraseRecording() {
    setRemovedVoiceMes(true)
    setVoiceMessage(undefined);
    setAudioURL("");
  }

  const visibleImage = recording ? `${ReadyImagesURL}/stop-record.png` : `${ReadyImagesURL}/micro-on-chat.png`
  return (
    <div className="recordMessager">
      {!voiceMessage ? (
        <>
          <img
            src={visibleImage}
            onClick={toggleRecording}
            alt=""
          />
          <style>
            {
              `.audio-recorder{
                display: none;
              }`
            }
          </style>
          <AudioRecorder
            onRecordingComplete={(blob) => getVoiceMessage(blob)}
            recorderControls={recorderControls}
          />
        </>
      ) : (
        <img src={`${ReadyImagesURL}/close.png`} onClick={eraseRecording} alt=""/>
      )}
    </div>
  );
}

interface RecordMessagerProps {
  setVoiceMessage: (blob: Blob | undefined) => void;
  setAudioURL: (url: string) => void;
  voiceMessage: Blob | undefined;
  removedVoiceMes: boolean;
  setRemovedVoiceMes: (bool: boolean) => void;
}
