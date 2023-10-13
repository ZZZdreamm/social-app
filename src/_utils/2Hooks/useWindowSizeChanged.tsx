import { useEffect, useState } from "react";
interface Props {
  callback?: any;
}

export default function useWindowSizeChanged({ callback = () => {} }: Props) {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    });
  }, [windowSize]);

  useEffect(() => {
    if (!callback) return;
    if (!windowSize) return;
    callback(windowSize);
  }, [windowSize]);

  return windowSize;
}
