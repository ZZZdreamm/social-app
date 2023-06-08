import { useEffect } from "react";

export default function Counter({ time, setTime, bonusStyling }: CounterProps) {
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (time > 0) {
        setTime((timee: number) => timee - 1);
        localStorage.setItem("time", `${time - 1}`);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [time]);
  return (
    <div className="timer" style={bonusStyling}>
      <span style={{ fontSize: "2.5em" }}>{time}</span>
    </div>
  );
}

interface CounterProps {
  time: number;
  setTime: (time: any) => void;
  bonusStyling: any;
}
