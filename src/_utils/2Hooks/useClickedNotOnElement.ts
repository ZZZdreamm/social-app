import { useEffect } from "react";

const useClickedNotOnElement = (ref: any, callback: any) => {
  const handleClick = (e: any) => {
    const clickedElement = e.target;
    const targetElement = ref.current;
    if (
      (clickedElement === targetElement ||
        targetElement.contains(clickedElement)) == false
    ) {
      callback();
    }
  };

  useEffect(() => {
    window.addEventListener("click", (e) => handleClick(e));
  }, []);
};

export default useClickedNotOnElement;
