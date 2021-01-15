import React, { useState, useEffect } from "react";
import { db, auth, storage } from "./firebase";
import firebase from "firebase/app";
// import { useSelector } from "react-redux";
// import { selectUser } from "./features/userSlice";

import { Avatar, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MessageIcon from "@material-ui/icons/Message";
import SendIcon from "@material-ui/icons/Send";
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';


// Redux書き方
// import { db, auth, provider, storage } from "./firebase";

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: theme.spacing(1),
  },
  root: {
    maxWidth: 360,
    maxHeight: 1200,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

// SportsExpからスポーツの情報(sports)がpropsに入ってる場合
const SportsAct = (props) => {
  const classes = useStyles();
  // Redux
  //   const user = useSelector(selectUser);

  // コメントの表示非表示の切り替え
  //   const [openComments, setOpenComments] = useState(false);
  //   コメント追加用
  const [act, setAct] = useState("");
  const [acttitle, setActtitle] = useState("");
  const [actImage, setActImage] = useState(null);
  const [actcomment, setActcomment] = useState("");
  const [level, setLevel] = useState("");
  const [date, setDate] = useState("");
//   素のデータだけどせっとするから書く
//   const [sportsId, setSportsId] = useState("");
//   const [sportsname, setSportsname] = useState("");
//   const [sportsno, setSportsno] = useState("");
// actsの箱を作る(ここで宣言したから表示できる)
  const [acts, setActs] = useState([
    {
      id: "",
      uid: "",
      avatar: "",
      username: "",
      //  ↑投稿者情報  ↓投稿情報
      acttitle: "",
      actImage: null,
      actcomment: "",
      level: "",
      date: "",
      timestamp: null,
    //   sportsId: "",
    //   sportsname: "",
    //   sportsno: "",
    },
  ]);

  const onChangeImageHandler = (e) => {
    if (e.target.files[0]) {
      setActImage(e.target.files[0]);
      e.target.value = "";
    }
  };
  //   過去のコメントを取得（受信処理）
  //   データをとってくる sports(props)にアクセスして、その中のactを取得してuseStateで代入
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
            // sportsのドキュメントid(上から受信)
            // sportsId: doc.data().sportsId,
            // sportsno: doc.data().sportsno,
            // sportsname: doc.data().sportsname,
            // 投稿の情報
            acttitle: doc.data().acttitle,
            actcomment: doc.data().actcomment,
            level: doc.data().level,
            date: doc.data().date,
            timestamp: doc.data().timestamp,
            // ここは確かめるユーザーデータを使う
            uid: doc.data().uid,
            username: doc.data().username,
            avatar: doc.data().avatar,
          }))
        );
      });
      console.log(acts);
    return () => {
      unSub();
    };
    // 投稿のIDが変わった場合は対象の投稿のコメントを入れる。
  }, [props.sportId]);

  // 送信処理をかくactはsports毎につくので
  const sendAct = (e) => {
    e.preventDefault();
    if (actImage) {
      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const N = 16;
      const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join("");
      const fileName = randomChar + "_" + actImage.name;
      // firebase storageに登録する処理
      const uploadTweetImg = storage.ref(`actimages/${fileName}`).put(actImage);
      uploadTweetImg.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        () => {},
        (err) => {
          alert(err.message);
        },
        async () => {
          await storage
            //   imagesのフォルダを作る↓
            .ref("actimages")
            .child(fileName)
            .getDownloadURL()
            // URLリンクが成功したら、firestoreのpostのimageにurlをいれる
            .then(async (url) => {
              await db
                .collection("sports")
                .doc(props.sportsId)
                .collection("acts")
                .add({
                  // ユーザ情報
                  //   avatar: user.photoUrl,
                  //   uid: user.uid,
                  //   username: user.displayName,
                  //   投稿内容
                  actimage: url,
                  acttitle: acttitle,
                  actcomment: actcomment,
                  level: level,
                  date: date,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                //   sportsId: props.sportsId,
                //   sportsno: props.sportsno,
                //   sportsname: props.sportsname,
                });
            });
        }
      );
    } else {
      db.collection("sports").doc(props.sportsId).collection("acts").add({
        // コメントするユーザのデータと、入力テキストをactに入力（追記する）
        //   Reduxを使わないならここ書き換える↓自分のデータ
        //   uid: user.uid,
        //   avatar: user.photoUrl,
        //   username: user.displayName,
        //入力データ
        actImage: "",
        acttitle: acttitle,
        actcomment: actcomment,
        level: level,
        date: date,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        // スポーツのデータ
        // sportsId: props.sportsId,
        // sportsno: props.sportsno,
        // sportsname: props.sportsname,
      });
    }
    setActImage(null);
    setActtitle("");
    setActcomment("");
    setActtitle("");
    setLevel("");
    setDate("");
    // setSportsId("");
    // setSportsname("");
    // setSportsno("");
    
  };


  return (
    <>
    <Card className={classes.root}> 
      <CardHeader 
        avatar={
            <Avatar src={props.avatar} className={classes.avatar} />
            }
            action={
                <IconButton aria-label="settings">
                <MoreVertIcon />
                </IconButton>
            }
            title={props.sportsname}
            subheader={props.detail}
        />

      {/* <div> */}
        {/* スポーツ情報 */}
        {/* <div> */}
          {/* <Typography>
            <span>{props.sportsname}</span>
          </Typography> */}
        {/* </div> */}
        {/* スポーツの詳細情報を表示 　ーーー　後で設定*/}
        {/* <div>
          <Typography>スポーツ詳細</Typography>
        </div> */}
      {/* </div> */}
      <div>
      {props.image && (
          <CardMedia
          className={classes.media}
          image={props.image}
          title={props.sportsname}
        />
        // <div>
        //   <img src={props.image} alt="sport" />
        // </div>
      )}
      </div>

      <div>
        <div>
        <Typography>ユーザーの体験情報</Typography>
        {/* ユーザのスポーツ情報 */}
        </div>
        <div>
          {acts.map((act) => (
            <div key={act.id}>
              <Avatar src={act.avatar} />
              {/* <span>@{act.username}</span> */}
              <Typography>{act.acttitle} </Typography>
              <Typography>{act.actcomment}</Typography>
              <Typography>{act.level}</Typography>
              <Typography>{act.date}</Typography>
              <Typography>{new Date(act.timestamp?.toDate()).toLocaleString()}</Typography>
        </div>
          ))}
        </div>
        {props.image && (
          <CardMedia
          className={classes.media}
          image={act.actimage}
          title={act.acttitle}
        />
      )}
      </div>
      <div>
      {/* コメント用フォーム */}
        <form onSubmit={sendAct}>
            <div>
                <input
                type="acttitle"
                placeholder="一言コメント"
                value={acttitle}
                onChange={(e) => setActtitle(e.target.value)}
                />
                <input
                type="actcomment"
                placeholder="感想を自由に書いてください"
                value={actcomment}
                onChange={(e) => setActcomment(e.target.value)}
                />
                
                <Button
                disabled={!acttitle}
                // className={
                //     comment ? styles.post_button : styles.post_buttonDisable
                // }
                type="submit"
                >
                <SendIcon />
                </Button>
            </div>
        </form>
      </div>


      
    </Card>
    </>
  );
};

export default SportsAct;


// ユーザ情報
//   avatar: user.photoUrl,
//   uid: user.uid,
//   username: user.displayName,
//   投稿内容
    //   actimage: url,
    //   acttitle: acttitle,
    //   actcomment: actcomment,
    //   level: level,
    //   date: date,
    //   timestamp: firebase.firestore.FieldValue.serverTimestamp(),