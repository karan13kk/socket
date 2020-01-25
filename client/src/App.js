import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Demo from "./container/Demo";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>

        <Switch>
          <Route path="/demo" component={Demo}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
