import * as React from "react";
import { useState, useEffect } from "react";

type AppProps = {
  ownMessage?: boolean;
  user?: string;
  message: string;
};
const ChatMessage = ({ ownMessage, user, message }: AppProps): JSX.Element => {
  return ownMessage ? (
    <div className="sm:px-6 py-4 px-2 sm:max-w-sm mx-auto bg-green-200 rounded-xl shadow-md flex items-center space-x-4 border my-2 max-w-xs">
      <div className="px-2 sm:max-w-sm truncate whitespace-normal ">
        <p className="text-xs sm:text-sm font-medium text-black">{message}</p>
      </div>
    </div>
  ) : (
    <div className="sm:px-6 py-3 px-2 sm:max-w-sm mx-auto bg-gray-200 rounded-xl shadow-md flex items-center space-x-4 border my-2 max-w-xs">
      <div className="px-2 sm:max-w-sm truncate whitespace-normal">
        <p className="text-gray-500 text-xs">{user}</p>
        <p className="text-xs sm:text-sm font-medium text-black">{message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
