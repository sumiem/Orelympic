import React, { useEffect } from "react";
import { auth } from "./firebase";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, login, logout } from "./features/userSlice";

import Mainpage from "./Mainpage";

// 認証機能の実装
import Login from "./Login";

const App = (props) => {
  // const user = useSelector(selectUser);
  // const dispatch = useDispatch();
  
  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser){

      }else{ props.history.push("login"); };
      // if (authUser) {
      //   dispatch(
      //     login({
      //       uid: authUser.uid,
      //       photoUrl: authUser.photoURL,
      //       displayName: authUser.displayName,
      //     })
      //   );
      // } else {
      //   dispatch(logout());
      // }

// 素の文章
      // !authUser && props.history.push("login");


    });
    return () => unSub();
  }, 
  // [dispatch]
  );

  // ログインしてる場合の表示（マイページ）
  return (
    <>
    {/* user.uid ? (userいる時):(いない時) */}
    {/* {user.uid ? (
      <div>
        <Mainpage />
      </div>
    ): (
      <Login />
      // userいるとき、Feed　いない時Auth
    )} */}
    
    <div>
    <Mainpage />
    </div>
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
