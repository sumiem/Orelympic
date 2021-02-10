import React, { useState, useEffect } from "react";
import { storage, db } from "./firebase";
import { Redirect, withRouter } from "react-router-dom";
import firebase from "firebase/app";
import { Button, IconButton, Grid } from "@material-ui/core";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
// import "./style.css";
// import Sport from "./Sport";

import Typography from "@material-ui/core/Typography";
// import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
// import Link from "@material-ui/core/Link";

// const useStyles = makeStyles((theme) => ({
//   icon: {
//     marginRight: theme.spacing(2),
//   },
//   toroku: {
//     backgroundColor: theme.palette.background.paper,
//     padding: theme.spacing(8, 0, 6),
//   },
//   heroButtons: {
//     marginTop: theme.spacing(4),
//   },
//   cardGrid: {
//     paddingTop: theme.spacing(8),
//     paddingBottom: theme.spacing(8),
//   },
//   card: {
//     height: "100%",
//     display: "flex",
//     flexDirection: "column",
//   },
//   cardMedia: {
//     paddingTop: "56.25%", // 16:9
//   },
//   cardContent: {
//     flexGrow: 1,
//   },
//   footer: {
//     backgroundColor: theme.palette.background.paper,
//     padding: theme.spacing(6),
//   },
//   root: {
//     width: '100%',
//     maxWidth: '36ch',
//     backgroundColor: theme.palette.background.paper,
//   },
//   inline: {
//     display: 'inline',
//   },
// }));

// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const SportsResister = () => {
  // const classes = useStyles();
  firebase.auth().onAuthStateChanged(function(user) {
    if(!user){return <Redirect to="/home" />}});
  // });
  // const unSub = auth.onAuthStateChanged((user) => {
  //   if(!user){return <Redirect to="/home" />}});

  // 記述3. useStateを用意します。画像を保持する箱、入力された文字列を保持する箱
  const [inputImage, setInputImage] = useState(null);
  const [sportsname, setSportsname] = useState("");
  const [detail, setDetail] = useState("");
  const [sportsid, setSportsid] = useState("");

  const onChangeImageHandler = (e) => {
    if (e.target.files[0]) {
      setInputImage(e.target.files[0]);
      e.target.value = "";
    }
  };

  const [sports, setSports] = useState([
    {
      id: "",
      sportsname:"",
      timestamp: null,
    },
  ]);

//   var user = firebase.auth().currentUser;
//   var name, email, photoUrl, uid, emailVerified;
// if (user != null) {
//     name = user.displayName;
//     email = user.email;
//     photoUrl = user.photoURL;
//     emailVerified = user.emailVerified;
//     uid = user.uid;  
//   };
// console.log(photoUrl)
  //記述２.useEffectの処理を書きます
  useEffect(() => {
    const firebaseData = db
      .collection("sports")
      .orderBy("sportsid", "desc")
      .onSnapshot((snapshot) =>
        setSports(
          snapshot.docs.map((doc) => ({
            // id: doc.id,
            sportsname: doc.data().sportsname,
            // image: doc.data().image,
            // text: doc.data().text,
            // timestamp: doc.data().timestamp,
          }))
        )
      );
    return () => {
      firebaseData();
    };
  }, []);

  // console.log(sports);


  // 記述7.送信処理を記述
  const sendSports = (e) => {

    // 状態を確認する
    // console.log(detail, sportsname, inputImage, sportsid);
    e.preventDefault();
    if (inputImage) {
      // 画像 + テキストの処理
      // firebaseの仕様で同じファイル名の画像を複数回アップしてしまうと元々あったファイルが削除される
      // そのためにファイル名をランダムなファイル名を作る必要がある、それが下　定型文
      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; //ランダムな文字列を作るための候補、62文字
      const N = 16; //16文字の文字列を作るという意味　生成したい文字数が１６の文字列になる
      const randomMoji = Array.from(crypto.getRandomValues(new Uint32Array(N))) //乱数を生成してくれるもので0からランダムな数字が１６こ選ばれる
        .map((n) => S[n % S.length])
        .join("");
      const fileName = randomMoji + "_" + inputImage.name;

      // firebase storageに登録する処理
      const uploadSportsImg = storage
        .ref(`sportsimages/${fileName}`)
        .put(inputImage);
      // firebaseのDBに登録する処理
      uploadSportsImg.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        () => {}, //進捗度合いの管理するもの、
        (err) => {
          //エラーに関する処理
          alert(err.message);
        },
        async () => {
          //成功したとき
          await storage
            .ref("sportsimages")
            .child(fileName)
            .getDownloadURL()
            .then(async (url) => {
              await db.collection("sports").add({
                image: url,
                sportsname: sportsname,
                detail: detail,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              });
            });
        }
      );
    } else {
      // テキストだけの処理
      db.collection("sports").add({
        image: "https://source.unsplash.com/random",
        sportsid: sportsid,
        sportsname: sportsname,
        detail: detail,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
    setInputImage(null);
    setDetail("");
    setSportsname("");
    setSportsid("");
  };

  
  return (
    <>
    {/* 登録フォーム */}
    <div className="toroku">      
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          スポーツ登録
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          いろんなスポーツを投稿をしていきましょう。
        </Typography>
        <div className="toroku">
          <Grid container spacing={2} justify="center">
            <Grid item>
              <form onSubmit={sendSports}>
                {/* 記述2 inputタグを書きます */}
                <input
                  className=""
                  placeholder="スポーツID"
                  type="text"
                  autoFocus
                  value={sportsid}
                  // eventを書きます onChange
                  // 記述6 event
                  onChange={(e) => setSportsid(e.target.value)}
                />
                <br />
                <input
                  className=""
                  placeholder="スポーツ名"
                  type="text"
                  autoFocus
                  value={sportsname}
                  // eventを書きます onChange
                  // 記述6 event
                  onChange={(e) => setSportsname(e.target.value)}
                />
                <br />
                <input
                  className="textbox"
                  placeholder="スポーツ詳細!"
                  type="text"
                  autoFocus
                  value={detail}
                  // eventを書きます onChange
                  // 記述6 event
                  onChange={(e) => setDetail(e.target.value)}
                />
                <IconButton>
                  <label>
                    <AddAPhotoIcon />
                    <input type="file" onChange={onChangeImageHandler} />
                  </label>
                </IconButton>
                <Button
                  type="submit"
                  disabled={!sportsname}
                  Button
                  variant="contained"
                  color="primary"
                >
                  投稿する
                </Button>
              </form>
            </Grid>
            <Grid item>
            {sports.map((sport) => (

              <div> {sport.sportsname}</div>))}
              {/* <Button variant="outlined" color="primary">
                    まとめて編集Secondary action
                  </Button> */}
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
    
    </>
  );
};
export default withRouter(SportsResister);
