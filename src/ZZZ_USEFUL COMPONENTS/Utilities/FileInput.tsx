import React, { useEffect, useState } from "react";
import { ReadyImagesURL } from "../appUrls";

export default function FileInput({ imageFunction, fileFunction, callback }: FileInputProps) {
  const [fileData, setFileData] = useState(null);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64Data = reader.result;

      fileFunction(file)
      imageFunction(base64Data)
      //@ts-ignore
      setFileData(base64Data);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
    callback()
  };


  return (
    <>

      <input
        className="custom-file-input"
        type="file"
        accept=".jpg,.jpeg,.png"
        onChange={handleFileChange}
      />
      {/* <img className="file-input-image" src={`${ReadyImagesURL}/question-image.png`} /> */}
    </>
  );
}

interface FileInputProps {
  imageFunction: (image:any) => void;
  fileFunction: (file:any) => void;
  callback:()=> void
}
