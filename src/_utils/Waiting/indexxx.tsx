import "./style.scss";

export default function Waiting({ message, eventMessage }: WaitingProps) {
  return (
    <>
      <div style={{ margin: "0 auto", alignSelf: "center" }}>
        <div className="loader">
          <span className="loader__element"></span>
          <span className="loader__element"></span>
          <span className="loader__element"></span>
        </div>
        {message && <h1>{message}</h1>}
        {eventMessage && <h2 className="event-message">{eventMessage}</h2>}
      </div>
    </>
  );
}

interface WaitingProps {
  message: string;
  eventMessage?: string;
}
