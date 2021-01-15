import React, { useState, useEffect } from "react";
import { storage, db, auth } from "./firebase";
import firebase from "firebase/app";

// StyleImport
import { makeStyles } from "@material-ui/core/styles";

// USER情報をとってくる（firebaseの Authから）

// const useAuth = () => {
    // const fireUser = firebase.auth().currentUser;
//     const [user, setUser] = useState(null);
  
//     useEffect(() => {
//       const unsub = firebase.auth().onAuthStateChanged((user) => {
//         user ? setUser(user) : setUser(null);
//       });
//       return () => {
//         unsub();
//       };
//     });
//     return user;
//   };

const UserInfoTEST = () => {


//   const [user, setUser] = useState(null);
//   useEffect(() => {
//     return firebase.auth().onAuthStateChanged((user) => {
//       setUser(user);
//     });
//   }, []);

  // これ！！！！ USER情報をとってくる（firebaseの Authから）
  const [user, setUser] = useState(null);
  useEffect(() => {
      const unSub = auth.onAuthStateChanged((authUser) => {
        if (authUser){ setUser(authUser);
        }else{ setUser(null);
        };
      });
        return () => unSub();
      },);

  return (
    <>
      <div>
            <h1>USER登録をする</h1>
            <h1> UID: {user && user.uid} </h1>
            <h1> Username: {user && user.email} </h1>
        </div>

      {/* <div>
        <h1>USER登録をする</h1>
        <h1> UID: {user.uid} </h1>
        <h1> Username: {user.email} </h1>
      </div> */}
    </>
  );
};

export default UserInfoTEST;


    // const user = useAuth();

//   const [user, setUser] = useState(null);
//   useEffect(() => {
//       const unSub = firebase.auth().onAuthStateChanged(
//      user => {
//          user
//          ? setUser(user)
//          : setUser(null);
//         },
//     );
//     return () => {
//         unSub();
//     };
//   });
//    return user;
// };





    // const user = firebase.auth().currentUser;
    // if (user) {
    //  console.log(user.uid);
    // }

  //     var user = firebase.auth().currentUser;
  //     var name, email, photoUrl, uid, ;

  //     if (user != null){
  //         name = user.displayname;
  //         email = user.email;
  //         photoUrl = user.photoURL;
  //         uid = user.uid;

  //     };

