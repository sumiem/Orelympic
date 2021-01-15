import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Route, BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";
// import * as serviceWorker from "./serviceWorker";
import store from "./app/store";

import Login from "./Login";
import Home from "./Home";
import Album from "./Album";

import Main from "./Main";
import Mainpage from "./Mainpage";
import Mydetail from "./Mydetail";
import SportsResister from "./SportsResister";
import SportsList from "./SportsList";
import SportsExp from "./SportsExp";
import SportsAct from "./SportsAct";

ReactDOM.render(
  <BrowserRouter>
    <>
      {/* <Provider store={store}>
        <App />
        <Login />
        <Mainpage />
      </Provider>
      <Route exact path="/" component={App} /> */}

      {/* ログインしたときはAppを表示 */}
      <Route exact path="/" component={App} />
      {/* ログインしていないときはLoginを表示 */}
      <Route exact path="/login" component={Login} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/album" component={Album} />
      {/* <Route exact path="/users" component={Users} /> */}
      <Route exact path="/mydetail" component={Mydetail} />
      <Route exact path="/sportsresister" component={SportsResister} />
      <Route exact path="/sportslist" component={SportsList} />
      <Route exact path="/sportsexp" component={SportsExp} />
      <Route exact path="/sportact" component={SportsAct} />

      {/* 内容確認用 */}
      <Route exact path="/main" component={Main} />
    </>
  </BrowserRouter>,
  document.getElementById("root")
);

// serviceWorker.unregister();

// {/* ログインしたときはAppを表示 */}
// <Route exact path="/" component={App} />
// {/* ログインしていないときはLoginを表示 */}
// <Route exact path="/login" component={Login} />
// <Route exact path="/home" component={Home} />
// <Route exact path="/album" component={Album} />

// {/* 内容確認用 */}
// <Route exact path="/main" component={Main} />
// {/* <Route exact path="/mydetail" component={Mydetail} /> */}
