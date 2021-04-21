import * as React from "react";
import { useState, useEffect, useRef } from "react";
import SocketIOClient from "socket.io-client";
import ChatMessage from "./ChatMessage";

type AppProps = {
  socket: any;
  username: string;
};

const ChatList = ({ socket, username }: AppProps): JSX.Element => {
  const [messageList, setMessageList] = useState<[string, string][]>();
  const scrollableRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    socket.on("message-list", (messages: [string, string][]) => {
      setMessageList(messages);
    });
  }, []);

  function generateMessages(): any {
    return messageList?.map((message: [string, string], key: any) => {
      if (message[0] === username && key === messageList.length) {
        if (scrollableRef.current !== null) {
          scrollableRef.current.scrollTop =
            scrollableRef.current.scrollHeight -
            scrollableRef.current.clientHeight;
        }
      }
      return message[0] === username ? (
        <div className="w-full flex justify-end" key={key}>
          <div className="mr-4">
            <ChatMessage ownMessage message={message[1]} />
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-start" key={key}>
          <div className="ml-4">
            <ChatMessage user={message[0]} message={message[1]} />
          </div>
        </div>
      );
    });
  }
  return (
    <div
      id="scrollable"
      ref={scrollableRef}
      className="w-full h-full mx-auto overflow-auto flex flex-col justify-start items-center"
    >
      {generateMessages()}
    </div>
  );
};

export default ChatList;
