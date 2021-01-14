import React, { useState, useEffect } from "react";
import styles from "./Post.module.css";
import { db } from "../firebase";
import firebase from "firebase/app";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MessageIcon from "@material-ui/icons/Message";
import SendIcon from "@material-ui/icons/Send";

// Reduxじゃない書き方
import { auth, provider, storage } from "../firebase";

// スポーツの情報がpropsに入ってる場合
const SportsAct = (props) => {
    const classes = useStyles();
    // Redux
    const user = useSelector(selectUser);
    // コメントの表示非表示の切り替え
    //   const [openComments, setOpenComments] = useState(false);
  //   コメント追加用
  const [act, setAct] = useState("");
  //   過去のコメントを取得
  const [acts, setActs] = useState([
    {
      id: "",
      avatar: "",
      acttitle: "",
      actimage: "",
      actcomment: "",
      level: "",
      username: "",
      uid: "",
      timestampui: null,
      sportid: "",
    },
  ]);

//   データをとってくる sportsにアクセスして、その中のactを取得してuseStateで代入
    useEffect(() => {
        const unSub = db
        .collection("sports")
        .doc(props.sportId)
        .collection("acts")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
            setActs(
            snapshot.docs.map((doc) => ({
                id: doc.id,
                sportsid: doc.sportsid,
                avatar: doc.data().avatar,
                acttitle: doc.data().acttitle,
                actcomment: doc.data().actcomment,
                level: doc.data().level,
                username: doc.data().username,
                // ここは確かめる
                uid: doc.data().uid,
                timestamp: doc.data().timestamp,
                sportsid: doc.sportsid,
                }))
            );
        });
        return () => {
        unSub();
        };
        // 投稿のIDが変わった場合は対象の投稿のコメントを入れる。
    }, [props.sportId]);

    // actはsports毎につくので
    const newComment = (e) => {
        e.preventDefault();
        db.collection("posts").doc(props.postId).collection("comments").add({
          // コメントするユーザのデータと、入力テキストをcommentsに追加する
          avatar: user.photoUrl,
          text: comment,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          username: user.displayName,
        });
        setComment("");
      };
    






    return (
        <div>
            
        </div>
    )
}

export default SportsAct
