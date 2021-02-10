import React, { useState, useEffect } from "react";
import { storage, db } from "./firebase";
import firebase from "firebase/app";
import { Button, IconButton, Grid } from "@material-ui/core";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
// import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  toroku: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },

  // cardGrid: {
  //   paddingTop: theme.spacing(8),
  //   paddingBottom: theme.spacing(8),
  // },
  // card: {
  //   height: "100%",
  //   display: "flex",
  //   flexDirection: "column",
  // },
  // cardMedia: {
  //   paddingTop: "56.25%", // 16:9
  // },
  // cardContent: {
  //   flexGrow: 1,
  // },

  addaphoto: {
    display: "none",
  },
}));

const UpdateSports = (props) => {
  const classes = useStyles();
  //  propsでもらったデータを更新する
  const [inputImage, setInputImage] = useState(null);
  const [detail, setDetail] = useState("");
  const [sportsLogo, setSportsLogo] = useState("");

  const [sportsdata, setSportsdata] = useState([
    {
      detail: "",
      image: "",
      // sportsLogo:"",
    },
  ]);

  // var updateTimestamp = docRef.update({
  //     timestamp: firebase.firestore.FieldValue.serverTimestamp()
  // });

  const onChangeImageHandler = (e) => {
    if (e.target.files[0]) {
      setInputImage(e.target.files[0]);
      e.target.value = "";
    }
  };

  // imageのURLを直接変更する場合
  const [imageUrl, setImageUrl] = useState(null);
  const sendImageUrl = (e) => {
    e.preventDefault();
    db.collection("sports").doc(props.id).update({
      image: imageUrl,
    });
    setImageUrl("");
  };
  // スポーツ情報のオリンピックリンク
  const [sportsUrl, setSportsUrl] = useState("");
  const sendSportsUrl = (e) => {
    e.preventDefault();
    db.collection("sports").doc(props.id).update({
      sportsUrl: sportsUrl,
    });
    setSportsUrl("");
  };

  const sendSportsdata = (e) => {
    e.preventDefault();
    if (inputImage) {
      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const N = 16;
      const randomMoji = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join("");
      const fileName = randomMoji + "_" + inputImage.sportsname;
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
              await db.collection("sports").doc(props.id).update({
                image: url,
                // sportsname: sportsname,
                detail: detail,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                // sportsLogo: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              });
            });
        }
      );
    } else {
      // テキストだけの処理
      db.collection("sports").doc(props.id).update({
        // image: "",
        // sportsname: sportsname,
        detail: detail,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        // sportsLogo: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      });
    }
    setDetail("");
    setInputImage(null);
    // setSportsLogo("");
  };
  // if (detail){
  //     newData["detail"] = detail;
  // }
  // if (sportImage){
  //     newData["sportsImage"] = sportsImage;
  // }
  // 更新する内容

  return (
    <>
      <div>
        <div> スポーツ名：{props.sportsname}</div>
        <div>スポーツno:{props.sportsid}</div>
        <div>スポーツデータのid:{props.id}</div>
      </div>
      <div>
        <div>スポーツ詳細：{props.detail} </div>
        <div>スポーツURL："{props.sportsUrl}" </div>
      </div>
      <div>{/* <div>更新情報</div> */}</div>
      <div>
        {props.image ? (
          <div>
            <img src={props.image} alt="" width="180px" height="auto" />
          </div>
        ) : (
          <h1>画像なし</h1>
        )}
      </div>
      <div className="toroku">
        <Grid container spacing={2} justify="center">
          <Grid item>
            <form onSubmit={sendSportsdata}>
              {/* 記述2 inputタグを書きます */}
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
                  <AddAPhotoIcon fontSizeLarge />
                  <input
                    type="file"
                    onChange={onChangeImageHandler}
                    className={classes.addaphoto}
                  />
                </label>
              </IconButton>
              <Button
                type="submit"
                //   disabled={!sportsname}
                Button
                variant="contained"
                color="primary"
              >
                投稿する
              </Button>
            </form>
          </Grid>
          <Grid>
            <Typography>URLを直接入力</Typography>
            <form onSubmit={sendImageUrl}>
              <input
                className="imageUrl"
                placeholder="imageUrlを直接編集"
                type="text"
                autoFocus
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <Button
                type="submit"
                disabled={!imageUrl}
                Button
                variant="contained"
                color="primary"
              >
                投稿する
              </Button>
            </form>
          </Grid>

          <Grid>
            <Typography>オリンピック種目URL</Typography>
            <Typography>URLを直接入力</Typography>
            <form onSubmit={sendSportsUrl}>
              <input
                className="sportsUrl"
                placeholder="sportsUrlを直接編集"
                type="text"
                autoFocus
                value={imageUrl}
                onChange={(e) => setSportsUrl(e.target.value)}
              />
              <Button
                type="submit"
                disabled={!sportsUrl}
                Button
                variant="contained"
                color="primary"
              >
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
    </>
  );
};

export default UpdateSports;
