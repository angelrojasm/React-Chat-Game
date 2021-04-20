import * as React from "react";
import { useState, useEffect } from "react";
import SocketIOClient from "socket.io-client";
import ChatMessage from "./ChatMessage";

type AppProps = {
  socket: any;
  username: string;
};

const ChatList = ({ socket, username }: AppProps): JSX.Element => {
  const [messageList, setMessageList] = useState<[string, string][]>();

  useEffect(() => {
    socket.on("message-list", (messages: [string, string][]) => {
      setMessageList(messages);
    });
  }, []);

  function generateMessages(): any {
    return messageList?.map((message: [string, string], key: any) => {
      return message[0] === username ? (
        <div className="w-full flex justify-end">
          <div className="mr-4">
            <ChatMessage className="" user={message[0]} message={message[1]} />
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-start">
          <div className="mr-4">
            <ChatMessage
              className="ml-2"
              user={message[0]}
              message={message[1]}
            />
          </div>
        </div>
      );
    });
  }
  return (
    <div className="w-full h-full mx-auto overflow-auto flex flex-col justify-start items-center">
      {generateMessages()}
    </div>
  );
};

export default ChatList;
