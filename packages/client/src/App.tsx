import * as React from "react";
import { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

const App = (): JSX.Element => {
  const [data, setData] = useState();
  const [socket, setSocket] = useState(null || socketIOClient);

  useEffect(() => {
    if (socket === null) {
      const client = socketIOClient("/");
      setSocket(client);
    }
    socket.on("date", (response: any) => {
      setData(response);
    });
    socket.on("alert-message", (response: any) => {
      window.alert(response);
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  function getHello() {
    socket.emit("button-message");
  }
  return (
    <div>
      <button
        onClick={(e) => {
          e.preventDefault();
          getHello();
        }}
      >
        Click me
      </button>
      {data && <h3>{data}</h3>}
    </div>
  );
};

export default App;
