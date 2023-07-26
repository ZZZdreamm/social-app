import { forwardRef, useEffect, useRef, useState } from "react";
import "./style.scss";
import useAutosizeTextArea from "../2Hooks/useAutosizeTextarea";

interface DivInputProps extends React.HTMLAttributes<HTMLTextAreaElement> {
  text:string;
  setText: (text: string) => void;
}

const Textarea = forwardRef(({ text, setText, ...props }: DivInputProps, ref) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const realRef = ref || textAreaRef;

  //@ts-ignore
  useAutosizeTextArea(realRef?.current, text);

  return (
    <textarea
    //@ts-ignore
      ref={realRef}
      value={text}
      className="divInput"
      onInput={(e: any) => {
        setText(e.target.value);
      }}
      rows={1}
      {...props}
    />
  );
});

export default Textarea;
