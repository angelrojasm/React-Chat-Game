import * as React from "react";
import { useState, useEffect } from "react";
import SocketIOClient from "socket.io-client";
import ChatMessage from "./ChatMessage";

const ChatList = ({ socket }: any): JSX.Element => {
  const [messageList, setMessageList] = useState<[string, string][]>();

  useEffect(() => {
    socket.on("message-list", (messages: [string, string][]) => {
      setMessageList(messages);
    });
  }, []);

  function generateMessages(): any {
    return messageList?.map();
  }
  return (
    <div className="w-full h-full border border-black mx-auto overflow-auto flex flex-col justify-start items-center">
      {generateMessages()}
    </div>
  );
};

export default ChatList;
