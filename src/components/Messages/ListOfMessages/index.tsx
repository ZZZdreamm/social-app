import {
  messageDTO,
  messageResponseDTO,
} from "../../../services/Models/message.models";
import "./style.scss";
import Message from "../Message";

interface ListOfMessagesProps {
  messages: messageDTO[] | undefined;
  fetchNextPage: () => void;
  setResponseToMessage: (message: messageResponseDTO) => void;
  toWhom: string;
  optionsOpen: string;
  setOptionsOpen: (name: string) => void;
}

export default function ListOfMessages({
  messages,
  fetchNextPage,
  setResponseToMessage,
  toWhom,
  optionsOpen,
  setOptionsOpen,
}: ListOfMessagesProps) {
  return (
    <div className="listOfMessages">
      {messages ? (
        messages.map((message, index) => (
          <>
            {index === 9 && <span id={`scrollable-span`}></span>}
            <Message
              message={message}
              key={message.Id}
              fetchNextPage={fetchNextPage}
              setResponseToMessage={setResponseToMessage}
              notResponding={true}
              toWhom={toWhom}
              optionsOpen={optionsOpen}
              setOptionsOpen={setOptionsOpen}
            />
          </>
        ))
      ) : (
        <span style={{ padding: "0.5rem" }}>Loading messages...</span>
      )}
    </div>
  );
}
