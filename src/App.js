import React, { useEffect, Component } from "react";
import { db, auth } from "./firebase"; 

// 転移ページ
import Mainpage from "./Mainpage";
// import Feed from "./Feed";

// 認証機能の実装
     // その際に[user]内に格納される＝空だったら何も起こらない
     // !user = false→ユーザーがログインしていない状態の時はログインページに飛ばす
const App = (props) => {
  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      !user && props.history.push("login");
    });
    return () => unSub();
  });

// class App extends Component {
//     render() {
//       return (
//         <div className="App">
//           <Router>
//             <div>
//               <Route exact path='/' component={App}/>
//               <Route path='/home' component={Home}/>
//               <Route path="/feed" component={Feed} />
//             </div>
//           </Router>
//         </div>
//       );
//     }
//   };



  // ログインしてる場合の表示（マイページ）
  return (
    <>
    {/* <Router>
      <div>
        <ul>
          <li><Link to="/"> Main</Link></li>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/feed">Feed</Link></li>
        </ul>

        <hr/>
        <Route exact path="/" component={Mainpage}/>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/feed" component={Feed}/>
      </div>
    </Router> */}

    <div>
      {/* ログアウト用のボタン */}
      {/* <button
        onClick={async () => {
          try {
            await auth.signOut();
            props.history.push("login");
          } catch (error) {
            alert(error.message);
          }
        }}>
          LOGOUT<ExitToAppIcon />
      </button> */}
      <div className="wrap"> 
      {/* <h1>Orelympic Mainpage</h1> */}
      <Mainpage />

      </div>
    </div>
    </>
  );
};
export default App;

