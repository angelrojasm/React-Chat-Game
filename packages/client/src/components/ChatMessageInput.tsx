import * as React from "react";
import { useState, useEffect } from "react";
import SendIcon from "@material-ui/icons/Send";

const ChatMessageInput = ({ socket }: any): JSX.Element => {
  const [message, setMessage] = useState<string>("");

  function sendMessage() {
    socket.emit("new-message", message);
    setMessage("");
  }

  return (
    <div className="w-full flex justify-center">
      <input
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        type="text"
        placeholder="Say something in the chat!"
        className="bg-gray-200 rounded-sm text-black h-16 pl-4 w-3/4 focus:outline-none focus:ring-1 focus:ring-gray-300 "
      />
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        className="rounded-lg h-16 w-16 p-0 focus:outline-none focus:ring-1 focus:ring-green-600"
        style={{ backgroundColor: "#28a745" }}
      >
        <SendIcon className="text-white" />
      </button>
    </div>
  );
};

export default ChatMessageInput;
