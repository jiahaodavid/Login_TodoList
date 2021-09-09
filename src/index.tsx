import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";
import { TodoList } from "./pages/TodoList";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/todolist">
          <TodoList />
        </Route>
        <Route path="/">
          <App />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
