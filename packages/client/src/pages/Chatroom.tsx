import * as React from "react";
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import socketIOClient from "socket.io-client";

type AppProps = {
  location: {
    state: {
      username: string;
    };
    key: string;
    pathname: string;
    search: string;
    hash: string;
  };
};
const Chatroom = ({ location }: AppProps): JSX.Element => {
  const [socket, setSocket] = useState(null || socketIOClient);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    if (socket === null) {
      const client = socketIOClient("/");
      setSocket(client);
    }
    socket.on("username-request", () => {
      socket.emit("username-response", location.state.username);
    });
    socket.on("user-list", (response: any) => {
      setUserList(response);
    });
    return () => {
      socket.disconnect();
    };
    //eslint-disable-next-line
  }, [socket, userList]);

  function getUserList() {
    return userList.map((user, key) => {
      return <p key={key}>{user}</p>;
    });
  }
  return location.state ? (
    <div className="h-screen w-screen bg-purple-200 flex justify-center items-center flex-col">
      <h2 className="font-normal text-4xl leading-4 font-sans">Chatroom</h2>
      <div className="bg-white w-3/5 h-3/4 border-gray-300 border rounded my-8 relative shadow m-0 p-0">
        <div className="border-gray-400 border-r h-full absolute bottom-0 left-0 w-1/5 m-0 p-0">
          {/** Insert UserList Component here */}
          {getUserList()}
        </div>
        <div className="absolute top-0 right-0 w-4/5 h-5/6 ">
          {/** Insert ChatList Component here */}
        </div>
        <div className="absolute bottom-0 right-0 w-4/5 h-1/6 border-t border-gray-400 ">
          {/** Insert ChatMessage Component here */}
        </div>
      </div>
    </div>
  ) : (
    <Redirect to="/" />
  );
};

export default Chatroom;
