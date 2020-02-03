import React from "react";
import "./App.css";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Demo from "./container/Demo";
import Socketio from "./container/Socket";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/demo" component={Demo}></Route>
        <Route path="/socket" component={Socketio}></Route>
      </Switch>
    </Router>
  );
}

export default App;
