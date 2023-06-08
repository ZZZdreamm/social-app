import { useRef, useState } from "react";

//@ts-ignore
export default function MyInput({ value, setValue, placeholder, characterLimit, visibleWarning }) {
    const elementRef = useRef(null)
    const [warning, setWarning] = useState('')
  const handleInput = (divRef: any) => {
    const content = divRef.current.value;
    if (content.length > characterLimit) {
      divRef.current.value = content.slice(0, characterLimit);
      if(visibleWarning){
        setWarning(`Template name can only have ${characterLimit} characters length.`)
      }
    }else{
        setWarning('')
    }
  };
  return (
    <>
    <input
    ref={elementRef}
      className="my-input"
      style={{ margin: "1rem", fontSize: "1.5rem" }}
      placeholder={placeholder}
      value={value}
      onChange={(event) => {
        handleInput(elementRef)
        setValue(event.target.value);
      }}
    />
    <div className="error" style={{padding:'10px'}}>{warning}</div>
    </>
  );
}
