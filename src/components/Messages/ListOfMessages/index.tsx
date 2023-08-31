
import { messageDTO, messageResponseDTO } from "../../../services/Models/message.models";
import "./style.scss";
import Message from "../Message";

interface ListOfMessagesProps {
  messages: messageDTO[] | undefined;
  setMessages: (messages: messageDTO[]) => void;
  setResponseToMessage: (message: messageResponseDTO) => void;
  toWhom: string;
  optionsOpen: string;
  setOptionsOpen: (name: string) => void;
}

export default function ListOfMessages({
  messages,
  setMessages,
  setResponseToMessage,
  toWhom,
  optionsOpen,
  setOptionsOpen,
}: ListOfMessagesProps) {
  return (
    <div className="listOfMessages">
      {messages ? (
        messages.map((message) => (
          <>
            {message.Id ? (
              <Message
                message={message}
                key={message.Id}
                setMessages={setMessages}
                setResponseToMessage={setResponseToMessage}
                notResponding={true}
                toWhom={toWhom}
                optionsOpen={optionsOpen}
                setOptionsOpen={setOptionsOpen}
              />
            ) : (
              <span id={`scrollable-span`}></span>
            )}
          </>
        ))
      ) : (
        <span style={{ padding: "0.5rem" }}>Loading messages...</span>
      )}
    </div>
  );
}
