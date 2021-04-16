import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import ChatHub from "./pages/ChatHub";
import Chatroom from "./pages/Chatroom";

const App = (): JSX.Element => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={ChatHub} />
        <Route path="/chat" exact component={Chatroom} />
        <Redirect to={"/"} />
      </Switch>
    </Router>
  );
};

export default App;
