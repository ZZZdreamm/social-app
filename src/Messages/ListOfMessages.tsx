import GenericList from "../ZZZ_USEFUL COMPONENTS/Utilities/GenericList";
import Waiting from "../ZZZ_USEFUL COMPONENTS/Utilities/Waiting";
import Message from "./Message";
import { message } from "./message.models";

export default function ListOfMessages({ messages }: ListOfMessagesProps) {
  return (
    <div className="listOfMessages">
      {messages ? (
        messages.map((message) => (
          <>
            {message.Id ? (
              <Message message={message} key={message.Id} />
            ) : (
              <span id={`scrollable-span/${message.ReceiverId}`}></span>
            )}
          </>
        ))
      ) : (
        <span style={{ padding: "0.5rem" }}>Loading messages...</span>
      )}
    </div>
  );
}

interface ListOfMessagesProps {
  messages: message[] | undefined;
}
