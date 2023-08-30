import { useEffect, useState } from "react";

export default function useWindowSizeChanged(callback:any) {
  const [windowSize, setWindowSize] = useState({width: window.innerWidth, height: window.innerHeight});

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize({width: window.innerWidth, height: window.innerHeight});
    });
  }, [windowSize]);

  useEffect(()=>{
    if(!callback) return
    if(!windowSize) return
    callback(windowSize)
  },[windowSize])

  return windowSize;
}
