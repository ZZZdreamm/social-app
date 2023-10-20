import { useEffect } from "react";
import Waiting from "../../_utils/Waiting/indexxx";
import DefaultModal from "../../_utils/defaultModal/DefaultModal";
import { wakeUpDB } from "../../apiFunctions/wakeUpDB";
import { isHerokuServerAwake } from "../../_utils/getHerokuServerState/getHerokuState";

interface LoadingModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function LoadingModal({ isOpen, setIsOpen }: LoadingModalProps) {
  useEffect(() => {
    const wakeUp = async () => {
      const backendState = await isHerokuServerAwake();
      if (backendState) setIsOpen(false);
      let interval = setInterval(async () => {
        const backendState = await isHerokuServerAwake();
        console.log("Backend state: ", backendState);
        if (backendState) {
          setIsOpen(false);
          clearInterval(interval);
        }
      }, 1000);
    };
    wakeUp();
  }, []);

  return (
    <DefaultModal isOpen={isOpen} toggleModal={() => {}}>
      <Waiting message="I don't have money for database so it needs to wake up 10 sec..." />
    </DefaultModal>
  );
}
