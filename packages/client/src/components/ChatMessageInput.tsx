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
      <form
        className="w-full mx-auto flex justify-center"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
      >
        <input
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          type="text"
          placeholder="Say something in the chat!"
          className="bg-gray-200 rounded-sm text-black h-12 sm:h-16 pl-1 ml-1 sm:ml-0 sm:pl-4 w-2/3 sm:w-3/4 text-xs sm:text-sm mr-1 sm:mr-0 sm:text-base focus:outline-none focus:ring-1 focus:ring-gray-300 "
        />
        <button
          type="submit"
          className="rounded-lg w-8 sm:w-16 sm:h-16 w-12 p-0 focus:outline-none focus:ring-1 focus:ring-green-600"
          style={{ backgroundColor: "#28a745" }}
        >
          <SendIcon className="text-white" />
        </button>
      </form>
    </div>
  );
};

export default ChatMessageInput;
