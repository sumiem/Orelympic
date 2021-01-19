import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import Sports from "./Sports";
import SportsInput from "./SportsInput";
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
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';



const Sportsfeed = () => {
    // firebaseに作成した項目を受け取るための変数=useState
    // use Stateの準備をする(firebaseと同じオブジェクト（データの塊をうけとる)
  const [sports, setSports] = useState([
    {
      id: "",
      title:"",
      image: "",
      desc: "",
      sports_id:"",
    },
  ]);

  //記述２.useEffectの処理を書きます(画面がレンダリングされた直後にDBにデータを取得)
  useEffect(() => {
    const firebaseData = db
      .collection("sports")
      .orderBy("sports_id", "desc")
      .onSnapshot((snapshot) =>
        setSports(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().title,
            image: doc.data().image,
            desc: doc.data().desc,
            sports_id: doc.data().sports_id,
          }))
        )
      );
    return () => {
      firebaseData();
    };
  }, []);

  // console.log(sports);

  return (
    <div className="tweetwrap">
        {/* TweetInputｗｐ読み込み */}
        <SportsInput />
      {/* 記述３　POSTコンポーネントを表示するロジックを書きます。 */}
      {/* postにでーたがあったらひょうじしますよという書き方 */}
      {sports && (
        <div  className="tweeti"> 
          {sports.map((sportsItem) => (
            <>
            <Sports
              key={sportsItem.id}
              title={sportsItem.title}
              image={sportsItem.image}
              desc={sportsItem.text}
              id={sportsItem.id}
  
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

export default Sportsfeed;
