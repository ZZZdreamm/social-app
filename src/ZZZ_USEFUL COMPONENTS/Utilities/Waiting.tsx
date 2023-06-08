import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Counter from "./Counter";

//@ts-ignore
export default function Waiting({
  message,
  time,
  setTime,
  possibleLeave,
  eventMessage
}: WaitingProps) {
  const navigate = useNavigate();
  const [waiting, setWaiting] = useState(true);
  useEffect(() => {
    localStorage.setItem("time", `${time!}`);
    if (time! < 1 && waiting) {
      setWaiting(false);
    }
  }, [time]);
  return (
    <>
      {waiting ? (
        <>
          <div>
            <div className="loader">
              <span className="loader__element"></span>
              <span className="loader__element"></span>
              <span className="loader__element"></span>
            </div>
            <h1>{message}</h1>
            {eventMessage && <h2 className="event-message">
              {eventMessage}
            </h2>}
            <Counter
              time={time!}
              setTime={setTime}
              bonusStyling={{ display: "none" }}
            />
          </div>

          {possibleLeave && (
            <button
              onClick={() => {
                navigate("/");
              }}
            >
              Leave game
            </button>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
}

interface WaitingProps {
  message: string;
  time?: number;
  setTime: (time: any) => void;
  possibleLeave: boolean;
  eventMessage?:string
}
