import * as React from "react";
import { useState, useEffect } from "react";
import SocketIOClient from "socket.io-client";

const ChatList = (): JSX.Element => {
  const [userNames, setUserNames] = useState();
  const [socket, setSocket] = useState(null || SocketIOClient);
  useEffect(() => {}, [socket]);
  return <></>;
};

export default ChatList;
