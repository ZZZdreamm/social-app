import { useEffect, useRef, useState } from "react";
import Waiting from "../../../_utils/Waiting/indexxx";
import ListOfMessages from "../ListOfMessages";
import { ChatWithFriendSkeleton } from "./skeleton";
import { socket } from "../../../App";
import { isVisibleInViewport } from "../../../_utils/1Functions/IsVisibleInViewport";
import useIsInViewport from "../../../_utils/2Hooks/IsInViewPort";
import { testEndpoint } from "../../../apiFunctions/testEndpoint";
import { useMutation, useQueryClient } from "react-query";
import { useInfiniteMessages } from "../../../hooks/useInfiniteMessages";
import { getMessages } from "../../../apiFunctions/getMessages";
import { messageResponseDTO } from "../../../models/message.models";
import { FriendProps } from ".";
import { ReadyImagesURL } from "../../../globals/appUrls";
import { useAuthenticationContext } from "../../../services/Contexts/AuthenticationContext";

interface ChatBodyProps extends FriendProps {
  setRespondTo: (message: messageResponseDTO | undefined) => void;
  newestMessagesRef: any;
  chatWontBeOpened?: boolean;
}

export const ChatBody = ({
  friend,
  setRespondTo,
  newestMessagesRef,
}: ChatBodyProps) => {
  const queryClient = useQueryClient();
  const { profile } = useAuthenticationContext();
  const [chatOpen, setChatOpen] = useState(false);
  const [additionalOptions, setAdditionalOptions] = useState("");
  const image = friend.ProfileImage || `${ReadyImagesURL}/noProfile.jpg`;
  const messagesEndRef = useRef<HTMLSpanElement>(null);

  const {
    messages,
    fetchPreviousPage,
    isFetchingPreviousPage,
    isFetchedAfterMount,
    hasPreviousPage,
  } = useInfiniteMessages(getMessages, `getMessages/${friend.Id}`, friend.Id);

  const { mutate: receiveMessage } = useMutation({
    mutationFn: (message) => {
      return testEndpoint(message);
    },
    onSuccess: (response) => {
      queryClient.setQueryData(`getMessages/${friend.Id}`, (oldData: any) => {
        return {
          pages: [...oldData.pages, response.message],
          pageParams: [],
        };
      });
    },
    onError: () => {
      alert("There was some error while receiving message");
    },
  });

  useEffect(() => {
    if (!newestMessagesRef.current) return;
    newestMessagesRef.current.scrollIntoView();
  }, [newestMessagesRef, chatOpen]);

  var scrolledChatUp = useIsInViewport(messagesEndRef, "0px");
  useEffect(() => {
    if (scrolledChatUp) {
      fetchPreviousPage();
    }
  }, [scrolledChatUp, fetchPreviousPage]);

  useEffect(() => {
    if (!messagesEndRef.current) return;
    if (isVisibleInViewport(messagesEndRef.current) && hasPreviousPage) {
      fetchPreviousPage();
    }
  }, [messagesEndRef, messages]);

  useEffect(() => {
    if (!profile?.Id || !newestMessagesRef || !friend.Id) return;
    fetchPreviousPage();
    setChatOpen(true);
    socket.off(`receive-message/${profile?.Id}/${friend.Id}`);
    socket.on(`receive-message/${profile?.Id}/${friend.Id}`, (message) => {
      receiveMessage(message);
      setTimeout(() => {
        if (newestMessagesRef.current) {
          newestMessagesRef.current.scrollIntoView();
        }
      }, 400);
    });
  }, [
    profile?.Id,
    newestMessagesRef,
    friend.Id,
    fetchPreviousPage,
    receiveMessage,
  ]);

  useEffect(() => {
    if (!friend.Id) return;
    if (isFetchingPreviousPage) return;
    const scrollableSpan = document.getElementById(`scrollable-span`);
    if (scrollableSpan) {
      scrollableSpan.scrollIntoView();
    }
  }, [isFetchingPreviousPage, friend.Id]);

  return (
    <div id={`chat-body/${friend.Id}`} className="chat-body">
      <div className="chat-body-start">
        <img src={image} alt="" />
        <h3>{friend.Email}</h3>
        {/* {messages?.length === 0 && (
            <div className="large-font">
              Send a message to new friend
            </div>
          )} */}
      </div>
      <div className="chat-body-messages">
        <span ref={messagesEndRef}></span>
        {messages && isFetchedAfterMount ? (
          <>
            {isFetchingPreviousPage && <Waiting message="Loading..." />}
            <ListOfMessages
              messages={messages}
              fetchNextPage={fetchPreviousPage}
              setResponseToMessage={setRespondTo}
              toWhom={friend.Id}
              optionsOpen={additionalOptions}
              setOptionsOpen={setAdditionalOptions}
            />
            <span ref={newestMessagesRef}></span>
          </>
        ) : (
          <ChatWithFriendSkeleton />
        )}
      </div>
    </div>
  );
};
