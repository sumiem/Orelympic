import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import Post from "./Post";
import TweetInput from "./TweetInput";
// import TaskItem from "./TaskItem";
import ClearIcon from "@material-ui/icons/Clear";

// import "./style.css";

// 以下テンプレ
import AppBar from '@material-ui/core/AppBar';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';



const Feed = () => {
  const [posts, setPosts] = useState([
    {
      id: "",
      name:"",
      image: "",
      text: "",
      timestamp: null,
    },
  ]);

  //記述２.useEffectの処理を書きます
  useEffect(() => {
    const firebaseData = db
      .collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
            image: doc.data().image,
            text: doc.data().text,
            timestamp: doc.data().timestamp,
          }))
        )
      );
    return () => {
      firebaseData();
    };
  }, []);

  // console.log(posts);

  return (
    <div className="tweetwrap">
        {/* TweetInputｗｐ読み込み */}
        <TweetInput />
      {/* 記述３　POSTコンポーネントを表示するロジックを書きます。 */}
      {/* postにでーたがあったらひょうじしますよという書き方 */}
      {posts && (
        <div  className="tweeti"> 
          {posts.map((postItem) => (
            <>
            <Post
              key={postItem.id}
              name={postItem.name}
              image={postItem.image}
              text={postItem.text}
              timestamp={postItem.timestamp}
              id={postItem.id}
  
            />
            {/* <TaskItem id={postItem.id} />  */}
            </>
          
          ))}
        </div>
      )}
      {/*  */}
    </div>
  );
};

export default Feed;
