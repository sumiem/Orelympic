import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Route, BrowserRouter } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Album from "./Album"

ReactDOM.render(
  <BrowserRouter>
    <>
      {/* ログインしたときはAppを表示 */}
      <Route exact path="/" component={App} />
      {/* ログインしていないときはLoginを表示 */}
      <Route exact path="/login" component={Login} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/album" component={Album} />
    </>
  </BrowserRouter>,
  document.getElementById("root")
);