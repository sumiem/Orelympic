import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import store from "./app/store";

import Login from "./Login";
import Home from "./Home";

import Main from "./Main";
import Mainpage from "./Mainpage";
import Mydetail from "./Mydetail";
import SportsResister from "./SportsResister";
import SportsList from "./SportsList";
import SportsExp from "./SportsExp";
import SportsAct from "./SportsAct";
import UserInfo from "./UserInfo"
import UserInfoTEST from "./UserInfoTEST"
import Test from "./Test"

function renderApp() {
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      {/* <BrowserRouter>
    <div>
      <Route exact path="/" component={App} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/sportslist" component={SportsList} />
      <Route exact path="/sportsexp" component={SportsExp} />
      <Route exact path="/sportact" component={SportsAct} /> */}

      {/* ログインしたときはAppを表示 */}
      {/* <Route exact path="/" component={App} /> */}
      {/* ログインしていないときはLoginを表示 */}

      {/* <Route exact path="/users" component={Users} /> */}
      {/* <Route exact path="/mydetail" component={Mydetail} /> */}
      {/* <Route exact path="/sportsresister" component={SportsResister} /> */}

      {/* <Route exact path="/userinfomation" component={UserInfo} /> */}
      {/* <Route exact path="/test" component={Test} />  */}

      {/* <Route exact path="/userinfotest" component={UserInfoTEST} /> */}

      {/* 内容確認用 */}
      {/* <Route exact path="/main" component={Main} /> */}
    {/* </div>
      </BrowserRouter>, */}
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
    }
    renderApp();

serviceWorker.unregister();

// {/* ログインしたときはAppを表示 */}
// <Route exact path="/" component={App} />
// {/* ログインしていないときはLoginを表示 */}
// <Route exact path="/login" component={Login} />
// <Route exact path="/home" component={Home} />
// <Route exact path="/album" component={Album} />

// {/* 内容確認用 */}
// <Route exact path="/main" component={Main} />
// {/* <Route exact path="/mydetail" component={Mydetail} /> */}
