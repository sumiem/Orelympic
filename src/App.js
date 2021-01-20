import React, { useEffect } from "react";
import { auth } from "./firebase";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, login, logout } from "./features/userSlice";
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import Mainpage from "./Mainpage";

// 認証機能の実装
import Login from "./Login";
import SportsExp from "./SportsExp";
import Home from "./Home";
import SportsForm from "./SportsForm";

import Main from "./Main";
import Mydetail from "./Mydetail";
import SportsResister from "./SportsResister";
import SportsList from "./SportsList";
import SportsAct from "./SportsAct";
import UserInfo from "./UserInfo";
// import UserInfoTEST from "./UserInfoTEST"
// import Test from "./Test"
import MySports from "./MySports";

const App = (props) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      // if (authUser){
      // }else{ props.history.push("login"); };
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photoUrl: authUser.photoURL,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return () => unSub();
  }, [dispatch]);
  // 素の文章
  //       !authUser && props.history.push("login");

  // ログインしてる場合の表示（マイページ）
  return (
    <>
      <Router>
        {/* user.uid ? (userいる時):(いない時) */}
        {/* 
      <div>
        <Mainpage />
      </div> */}
        {/* ): ( */}
        {/* <Login /> */}
        {/* // userいるとき、Feed　いない時Auth */}
        {/* )} */}
        <Switch>
          {user.uid ? (
            <Route exact path="/" component={Mainpage} />
          ) : (<Route exact path="/login" component={Login} />)};

          <Route exact path="/home" component={Home} />
          <Route exact path="/sportsexp" component={SportsExp} />
          <Route exact path="/sportsform" component={SportsForm} />
          <Route exact path="/sportslist" component={SportsList} />
          <Route exact path="/sportsresister" component={SportsResister} />
          <Route exact path="/mysports" component={MySports} />
        </Switch>
      </Router>
      {/* <div>
    <Mainpage />
    </div> */}
      {/* <button
        onClick={async () => { try {
            await auth.signOut();
            props.history.push("login");
          } catch (error) { alert(error.message) }}}>LOGOUT
      </button> */}
    </>
  );
};
export default App;
// 
// {/* <div><Mainpage /></div> */}
            // {/* // <Route exact path="/home" component={Home} /> */}
            // {/* <Route exact path="/login" component={Login} /> */}