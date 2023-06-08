import { useEffect } from "react";

const UnloadPrompt = () => {
  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      event.preventDefault();
      event.returnValue = ""; // This is necessary for Chrome
    };
    window.addEventListener("beforeunload", handleBeforeUnload);


    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return null;
};

export default UnloadPrompt;
