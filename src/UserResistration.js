import React, { useState, useEffect } from "react";
import { storage, db } from "./firebase";
import { Redirect, withRouter } from "react-router-dom";
import firebase from "firebase/app";
// Redux
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";

import NavBar from "./NavBar";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Container, Avatar, Box, Button, Typography } from "@material-ui/core";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import IconButton from "@material-ui/core/IconButton";
import "date-fns";
// import Radio from "@material-ui/core/Radio";
// import RadioGroup from "@material-ui/core/RadioGroup";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    maxWidth: "md",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  avatar: {
    // backgroundColor: red[500],
    // borderColor: red[500],
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  hiddenicon: {
    textAlign: "center",
    display: "none",
  },
  addiconloaded: {
    cursor: "pointer",
    color: "gray",
  },
  addicon: {
    cursor: "pointer",
    color: "primary",
  },
}));

const UserResistration = () => {
  const classes = useStyles();
  // ユーザ承認及びユーザーの情報取得
  firebase.auth().onAuthStateChanged(function (user) {
    if (!user) {
      return <Redirect to="/home" />;
    }
  });
  const user = useSelector(selectUser);
  // ほしいユーザー情報（氏名・ニックネーム・Avatar写真・好きなスポーツ（ボール・陸上）・（屋内）・郵便番号・好きな言葉
  const [fullName, setFullName] = useState("");
  const [nickName, setNickName] = useState(user.displayName);
  const [profileImage, setProfileImage] = useState(null);
  const [words, setWords] = useState("");
  const [favoriteSports, setFavoriteSports] = useState("");
  const [postcode, setPostcode] = useState("");
  const [likePlace, setLikePlace] = useState("");
  const [startDate, setStartDate] = useState(null);
  //

  // user情報の箱
  const [profiles, setProfiles] = useState([
    {
      id: "",
      uid: "",
      //  ↑投稿者情報  ↓投稿情報
      fullName: "",
      nickName: "",
      profileImage: "",
      words: "",
      favoriteSports: "",
      postcode: "",
      likePlace: "",
      startDate: new Date(),
      timestamp: null,
    },
  ]);
  const onChangeImageHandler = (e) => {
    if (e.target.files[0]) {
      setProfileImage(e.target.files[0]);
      e.target.value = "";
    }
  };

  const handleDateChange = (date) => {
    setStartDate(date);
  };
  //   const handleChange = (event) => {
  //     setLikePlace(event.target.value);
  //   };
  // データ取得
  useEffect(() => {
    const unSub = db
      .collection("users")
      //   .doc("user.uid")
      // あとで、docをuidにしたので、一度試したら変更する。
      .where("uid", "==", user.uid)
      .orderBy("timestamp", "desc")
      //   .limit(1)
      .onSnapshot((snapshot) => {
        setProfiles(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            uid: doc.data().uid,
            // sportsのドキュメントid(上から受信)
            fullName: doc.data().fullName,
            // sportsno: doc.data().sportsno,
            nickName: doc.data().nickName,
            profileImage: doc.data().profileImage,
            // 投稿の情報
            words: doc.data().words,
            favoriteSport: doc.data().favoriteSport,
            likePlace: doc.data().likePlace,
            postcode: doc.data().postcode,
            startDate: doc.data().startDate,
            timestamp: doc.data().timestamp,
            // ここは確かめるユーザーデータを使う
          }))
        );
      });
    // console.log(profiles);
    return () => {
      unSub();
    };
  }, []);
  // console.log(profiles);

  // 送信処理
  const sendProfile = (e) => {
    e.preventDefault();
    if (profileImage) {
      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const N = 16;
      const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join("");
      const fileName = randomChar + "_" + profileImage.name;
      // firebase storageに登録する処理
      const uploadProfileImg = storage
        .ref(`profileimages/${fileName}`)
        .put(profileImage);
      uploadProfileImg.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        () => {},
        (err) => {
          alert(err.message);
        },
        async () => {
          await storage
            //   imagesのフォルダを作る↓
            .ref("profileimages")
            .child(fileName)
            .getDownloadURL()
            // URLリンクが成功したら、firestoreのpostのimageにurlをいれる
            .then(async (url) => {
              await db.collection("users").doc(user.uid).set(
                {
                  // ユーザ情報
                  uid: user.uid,
                  // 投稿内容
                  profileImage: url,
                  fullName: fullName,
                  nickName: nickName,
                  words: words,
                  favoriteSports: favoriteSports,
                  postcode: postcode,
                  likePlace: likePlace,
                  startDate: startDate,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                }
                ,{ merge: true }
              );
            });
        }
      );
    } else {
      db.collection("users").doc(user.uid).set(
        {
          // ユーザ情報
          uid: user.uid,
          // 投稿内容
          fullName: fullName,
          nickName: nickName,
          words: words,
          favoriteSports: favoriteSports,
          postcode: postcode,
          likePlace: likePlace,
          startDate: startDate,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        }
        ,{ merge: true }
      );
    }
    // setProfileImage(null);
    setFullName("");
    setNickName("");
    setWords("");
    setFavoriteSports("");
    setPostcode("");
    setLikePlace("");
    setStartDate(null);
  };

  return (
    <>
      <NavBar />
      <Container className={classes.root2}>
        <form onSubmit={sendProfile}>
          <div className={classes.root}>
            <div>
              <Typography>{user.displayName}さんの情報登録</Typography>
              <Typography>
                ユーザー情報の変更箇所のみ記入してください
              </Typography>
            </div>

            <Container className={classes.root}>
              <div>
                <Avatar className={classes.avatar} />
                <Box className="classes.box1">
                  <IconButton>
                    <label>
                      <AddAPhotoIcon
                        color="primary"
                        fontSize="large"
                        className={
                          profileImage ? classes.addiconloaded : classes.addicon
                        }
                      />
                      写真を選択
                      <input
                        className={classes.hiddenicon}
                        type="file"
                        onChange={onChangeImageHandler}
                      />
                    </label>
                  </IconButton>
                </Box>
              </div>
              <div>
                <TextField
                  id="standard-full-width"
                  label="参加表示名＊必須"
                  style={{ margin: 8 }}
                  //   placeholder="user.username"
                  defaultValue={user.displayName}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={nickName}
                  onChange={(e) => setNickName(e.target.value)}
                />
                <TextField
                  id="filled-full-width"
                  label="参加に向けて一言！"
                  multiline
                  rows={2}
                  style={{ margin: 8 }}
                  placeholder="最高に楽しむ"
                  // defaultValue={profile.words}
                  helperText="意気込みをどうぞ！"
                  fullWidth
                  margin="normal"
                  //   InputLabelProps={{
                  //     shrink: true,
                  //   }}
                  value={words}
                  onChange={(e) => setWords(e.target.value)}
                  variant="filled"
                />
                <TextField
                  label="好きなスポーツ"
                  id="margin-none"
                  placeholder="テニス"
                  className={classes.textField}
                  helperText="Some important text"
                  value={favoriteSports}
                  // defaultValue={profile.favoriteSports}
                  onChange={(e) => setFavoriteSports(e.target.value)}
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="space-around">
                    <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      label="開始日"
                      format="MM/dd/yyyy"
                      value={startDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
              </div>
              <div>
                <Button
                  variant="outlined"
                  color="primary"
                  //   disabled={!acttitle}
                  type="submit"
                  //   onClick={handleClose}
                >
                  <Typography>登録する</Typography>
                </Button>
              </div>
            </Container>
          </div>
        </form>
      </Container>

      <div>
        <Typography>登録内容</Typography>
        {profiles.map((profile) => (
          <div key={profile.id}>
            <Container className={classes.root}>
              <Typography>{profile.nickName}さんの情報</Typography>
              <div className={classes.root}>
                <Box>
                  {profile.profileImage && (
                    <Avatar src={user.photoUrl} className={classes.avatar} />
                  )}
                </Box>
              </div>
              <div>
                {profile.nickName && (
                  <Typography>選手名：{profile.nickName}</Typography>
                )}
                {!profile.nickName && (
                  <Typography>
                    選手名：上記フォームで登録してください
                  </Typography>
                )}
              </div>
              <div>
                {profile.words && (
                  <Typography>意気込み：{profile.words}</Typography>
                )}
              </div>
              <div>
                {profile.favoriteSports && (
                  <Typography>好きなスポーツ：{profile.favoriteSports}</Typography>
                )}
              </div>
            </Container>
          </div>
        ))}
      </div>
    </>
  );
};

export default withRouter(UserResistration);
