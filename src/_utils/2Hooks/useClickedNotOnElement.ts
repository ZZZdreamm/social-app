import { useEffect } from "react";

const useClickedNotOnElement = (ref: any, callback: any) => {
  const handleClick = (e: any) => {
    try {
      const clickedElement = e.target;
      const targetElement = ref.current;

      if (targetElement.contains(clickedElement) === false) {
        callback();
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    window.addEventListener("click", (e) => handleClick(e));
  }, []);
};

export default useClickedNotOnElement;
