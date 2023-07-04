import { getMetadata } from "firebase/storage";
import { storageRef } from "../../Firebase/FirebaseConfig";
import { useEffect, useRef, useState } from "react";

interface AdjustedImageProps {
  image: string;
}

export default function AdjustedImage({ image }: AdjustedImageProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageSizeStyles, setImageSizeStyles] = useState({});
  const getMeta = (url: string, cb: any) => {
    const img = new Image();
    img.onload = () => cb(null, img);
    img.onerror = (err) => cb(err);
    img.src = url;
  };
  useEffect(() => {
    if (!imageRef.current) return;
    const parentElement = imageRef.current.parentNode as HTMLElement;
    getMeta(image, (err: any, img: any) => {
      const imageWidth = img.naturalWidth;
      const imageHeight = img.naturalHeight;
        const parentWidth = parentElement.offsetWidth
        const parentHeight = parentElement.offsetHeight
      if (parentWidth < imageWidth) {
        setImageSizeStyles({ width: `${parentWidth}px`, height: `100%` });
      } else if(parentHeight < imageHeight){
        setImageSizeStyles({ width: `100%`, height: `${parentHeight}px` });
      }
    });
  }, [imageRef]);

  return <img ref={imageRef} style={imageSizeStyles} src={image} alt=""/>;
}
