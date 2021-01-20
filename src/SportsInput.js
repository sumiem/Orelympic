import React, { useState } from "react";
import { storage, db } from "./firebase";
import firebase from "firebase/app";
import { Button, IconButton, Grid, Card } from "@material-ui/core";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import Sportsfeed from "./Sportsfeed";
import Sports from "./Sports";
// import "./style.css";

import AppBar from '@material-ui/core/AppBar';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';


const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  toroku: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const SportsInput = () => {
  // 記述3. useStateを用意します　画像を保持する箱、入力された文字列を保持する箱
  const [inputImage, setInputImage] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [sports_id, setSports_id] = useState("");
  const onChangeImageHandler = (e) => {
    if (e.target.files[0]) {
      setInputImage(e.target.files[0]);
      e.target.value = "";
    }
  };
  // 記述7.送信処理を記述
  const sendSports = (e) => {
    // 状態を確認する
    // console.log(title, desc, inputImage, sports_id);
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
      const uploadSportsImg = storage.ref(`images/${fileName}`).put(inputImage);
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
            .ref("images")
            .child(fileName)
            .getDownloadURL()
            .then(async (url) => {
              await db.collection("sports").add({
                image: url,
                title: title,
                desc: desc,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              });
            });
        }
      );
    } else {
      // テキストだけの処理
      db.collection("sports").add({
        image: "",
        title: title,
        desc: desc,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
    setInputImage(null);
    setDesc("");
    setTitle("");
  };
  return (
    <div className="toroku">
      <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              スポーツ登録
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              いろんな記録を写真に残していきましょう。<br/>
              楽しみの記録はどんどん更新していきましょう。
              ときには悔しい記録も、成長へのステップです。
            </Typography>

            <div className="toroku">
        <Grid container spacing={2} justify="center">
        <Grid item>
        <form onSubmit={sendSports}>
        {/* 記述2 inputタグを書きます */}
        <input
          className=""
          placeholder="名前"
          type="text"
          autoFocus
          value={title}
          // eventを書きます onChange
          // 記述6 event
          onChange={(e) => setTitle(e.target.value)}
        /><br/>
        <input
          className="textbox"
          placeholder="What's up, today!?"
          type="text"
          autoFocus
          value={desc}
          // eventを書きます onChange
          // 記述6 event
          onChange={(e) => setDesc(e.target.value)}
        />
        <IconButton>
          <label>
            <AddAPhotoIcon />
            <input type="file" onChange={onChangeImageHandler} />
          </label>
        </IconButton>
        <Button type="submit" disabled={!desc} Button variant="contained" color="primary">
          投稿する
        </Button>
      </form>
      </Grid>
        <Grid item>
                {/* <Button variant="outlined" color="primary">
                    まとめて編集Secondary action
                  </Button> */}
        </Grid>
              </Grid>
            </div>
          </Container>  
      {/* <h3>写真を登録してみましょう</h3> */}
    </div>
  );
};
export default SportsInput;


// import React, { useState } from "react";
// import { storage, db } from "./firebase";
// import firebase from "firebase/app";
// import { Button, IconButton } from "@material-ui/core";
// import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";

// const TweetInput = () => {
//     // 記述３　use state
// // を用意して、uohがぞ報恩寺する場所,入力された文字列を保持する場所  

//   const [inputImage, setInputImage] = useState(null);
//   const [message, setMessage] = useState("");

//   const onChangeImageHandler = (e) => {
//     if (e.target.files[0]) {
//       setInputImage(e.target.files[0]);
//       e.target.value = "";
//     }
//   };
// // 記述７　送信処理を記述（リロードしない）
//   const sendTweet = (e) => {
//     // 状態の確認
//     console.log(message, inputImage)
//     e.preventDefault();
//   };

//   // テキストだけのとき、とテキストと画像のときで処理が違う
//   //     firebaseの仕様で同じファイル名の画像を複数回アップしてしまうと元々あったファイルが削除される
//   //     そのためにファイル名をランダムなファイル名を作る必要がある、それが下
//   if (inputImage){
//     const S =
//     "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; //ランダムな文字列を作るための候補、62文字
//   const N = 16; //16文字の文字列を作るという意味　生成したい文字数が１６の文字列になる
//   const randomMoji = Array.from(crypto.getRandomValues(new Uint32Array(N))) //乱数を生成してくれるもので0からランダムな数字が１６こ選ばれる
//     .map((n) => S[n % S.length])
//     .join("");
//   const fileName = randomMoji + "_" + inputImage.name;
//         // firebase storageに登録する処理
//   const uploadTweetImg = storage.ref(`images/${fileName}`).put(inputImage);
//         uploadTweetImg.on(
//           firebase.storage.TaskEvent.STATE_CHANGED,
//           () => {},
//           (err) => {
//             alert(err.message);
//           },
//           async () => {
//             await storage
//               .ref("images")
//               .child(fileName)
//               .getDownloadURL()
//               .then(async (url) => {
//                 await db.collection("posts").add({
//                   image: url,
//                   text: message,
//                   timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//                 });
//               });
//           }
//         );
//   } else {
// // テキストだけの処理
// db.collection("posts").add({
//         image: "",
//         text: message,
//         timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//       });
//   }
//   setInputImage(null);
//   setMessage("");
// };

// return (
//     <div>
//      <h1>登録のフォーム</h1>
//       {/*  */}
//       {/* 記述１. FORMの書き方 */}
//       <form onSubmit={sendTweet}>
//       {/* 記述2 inputタグを書きます */}
//       <input
//       className = ""
//       placeholder = "文字入力スペース"
//       type="text"
//       autoFocus
//       value={message}
//     //   eventを書きます。
// 　　// 記述６　イベント
//     onChange={(e) => setMessage(e.target.value)}
//     />
//       <IconButton>
//         <label>
//           <AddAPhotoIcon />
//           <input
//             type="file"
//             onChange={onChangeImageHandler}
//           />
//         </label>
//       </IconButton>
    
//       <Button
//           type="submit"
//           disabled={!message}
//         >
//           送信
//       </Button>
//     </form>

//     </div>
//   );
// };
// export default TweetInput;