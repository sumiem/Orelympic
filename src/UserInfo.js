import React, { useState, useEffect } from "react";
import { storage, db, auth } from "./firebase";
import firebase from "firebase/app";

// StyleImport
import { makeStyles } from "@material-ui/core/styles";



const UserInfo = () => {
    // const classes = useStyles();

    // const [inputImage, setInputImage] = useState(null);
    // const [userNickname, setUserNickname] = useState("");
    // const [detail, setDetail] = useState("");
    // const [userBD, setUserBD] = useState("");
  
    // const onChangeImageHandler = (e) => {
    //   if (e.target.files[0]) {
    //     setInputImage(e.target.files[0]);
    //     e.target.value = "";
    //   }
    // };

    return (
      <div>
        {/* <div>
              <h1>USER登録をする</h1>
              <h1> UID: {user && user.uid} </h1>
              <h1> Username: {user && user.email} </h1>
              </div> */}
        <h1>USER登録をする</h1>
        {/* <h1> UID: {user.uid} </h1> */}
        {/* <h1> UID: {user.uid} </h1>
           <h1> Username: {user.email} </h1> */}
      </div>
    );
  };
  
  export default UserInfo;
  

//     const [user, initialising, error] = auth.onAuthStateChanged(function (user){
//     // useAuthStateChanged(firebase.auth());
//     if (initialising) {
//       return <div>Initialising...</div>;
//     }
//     if (error) {
//       return <div>Error: {error}</div>;
//     }
//     if (!user) {
//       return <div>ユーザーではありません</div>;
//     }
//     return (
//       <div>
//         User: {user.email}
//       </div>
//     );
//   }

//   export default UserInfo;
  
//   const rootElement = document.getElementById("root");
//   ReactDOM.render(<App />, rootElement);
  