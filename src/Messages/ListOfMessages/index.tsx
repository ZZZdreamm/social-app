import GenericList from "../../ZZZ_USEFUL COMPONENTS/Utilities/GenericList";
import Waiting from "../../ZZZ_USEFUL COMPONENTS/Utilities/Waiting/indexxx";
import Message from "../Message";
import { messageDTO } from "../../Models/message.models";
import "./style.scss"

interface ListOfMessagesProps {
  messages: messageDTO[] | undefined;
}

export default function ListOfMessages({ messages }: ListOfMessagesProps) {
  return (
    <div className="listOfMessages">
      {messages ? (
        messages.map((message) => (
          <>
            {message.Id ? (
              <Message message={message} key={message.Id} />
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


