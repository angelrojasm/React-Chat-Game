import * as React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const ChatHub = (): JSX.Element => {
  const history = useHistory();
  const [username, setUsername] = useState("");

  const verifyName = () => {};
  return (
    <div className="h-screen w-screen bg-purple-200 flex flex-col items-center justify-center">
      <h3 className="font-normal text-4xl leading-4 font-sans mt-9 mr-6">
        Welcome to the Chat
      </h3>
      <p className="text-gray-500 text-md my-3 mr-6 mb-9">
        Tell us your name to access the chat.
      </p>
      <form
        className="mb-96"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="text"
          className="focus:outline-none leading-2 h-12 rounded p-1"
          placeholder="What's Your name?"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <button
          className="bg-purple-600 hover:bg-purple-500 focus:outline-none focus: ring-1 focus:ring-purple-600 rounded-md p-3 text-white font-medium w-32 sm:inline-block ml-2"
          onClick={(e) => {
            e.preventDefault();
            verifyName();
            history.push("/chat", { username: username });
          }}
        >
          Join the Chat
        </button>
      </form>
    </div>
  );
};

export default ChatHub;
