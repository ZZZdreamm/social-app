import { useRef, useState } from "react";
import { ReadyImagesURL } from "../../globals/appUrls";
import "./style.scss";
import useClickedNotOnElement from "../2Hooks/useClickedNotOnElement";
import imagesNames from "../../globals/images";
interface OpenedOptionsProps {
    children: any;
    position: {right: string, top: string, transform?:string}
}
const OpenedOptions = ({ children, position }: OpenedOptionsProps) => {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const toggleRef = useRef(null);
  useClickedNotOnElement(toggleRef, () => {
    setOptionsOpen(false);
  });
  function toggleOptions(open:boolean) {
    setOptionsOpen(!optionsOpen);
  }
  return (
    <>
      <div
        ref={toggleRef}
        className="optionsToggle"
        style={{ backgroundImage: `url(${imagesNames.options})`, ...position }}
        onClick={() => toggleOptions(!optionsOpen)}
      ></div>
      {optionsOpen && <div className="openedOptions">{children}</div>}
    </>
  );
};


export default OpenedOptions;