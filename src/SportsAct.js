import React, { useState, useEffect } from "react";
import { db, auth, storage } from "./firebase";
import firebase from "firebase/app";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import { Avatar, Typography, Button, TextField, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import MessageIcon from "@material-ui/icons/Message";
import SendIcon from "@material-ui/icons/Send";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Modal from "@material-ui/core/Modal";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import CameraIcon from "@material-ui/icons/Camera";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import GridList from "@material-ui/core/GridList";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import mainVisual from "./img/Mainvisual2.jpg";
import StarBorderIcon from "@material-ui/icons/StarBorder";

import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

import MoreVertIcon from "@material-ui/icons/MoreVert";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}
function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
var moment = require("moment");

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: theme.spacing(1),
  },
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    maxWidth: 360,
    // maxHeight: 2000,
  },
  media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  cardContent: {
    flexGrow: 1,
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  MuiCardHeaderTitle: {
    fontSize: 30,
  },
  // titleCardHeader{
  //   fontSize: 30,
  // },

  // },
  // title: {
  //   margin: auto,
  // },
  // modal: {
  //   outline: "none",
  //   position: "absolute",
  //   width: 400,
  //   borderRadius: 10,
  //   backgroundColor: "white",
  //   boxShadow: theme.shadows[5],
  //   padding: theme.spacing(10),
  // },
}));

// SportsExpからスポーツの情報(sports)がpropsに入ってる場合
const SportsAct = (props) => {
  const user = useSelector(selectUser);
  const classes = useStyles();

  // コメントの表示非表示の切り替え
  //   const [openComments, setOpenComments] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //   コメント追加用
  const [act, setAct] = useState("");

  const [acttitle, setActtitle] = useState("");
  const [actImage, setActImage] = useState(null);
  const [actcomment, setActcomment] = useState("");
  const [level, setLevel] = useState("");
  const [actDate, setActDate] = useState(new Date());

  //   素のデータだけどセットするから書く
  // const [sportsId, setSportsId] = useState("");
  // const [sportsname, setSportsname] = useState("");
  // const [sportsno, setSportsno] = useState("");
  // actsの箱を作る(ここで宣言したから表示できる)
  const [acts, setActs] = useState([
    {
      id: "",
      uid: "",
      avatar: "",
      username: "",
      //  ↑投稿者情報  ↓投稿情報
      acttitle: "",
      actImage: "",
      actcomment: "",
      level: "",
      actDate: null,
      timestamp: null,
      sportsId: "",
      sportsname: "",
      sportsno: "",
      sportsimage: "",
    },
  ]);

  const onChangeImageHandler = (e) => {
    if (e.target.files[0]) {
      setActImage(e.target.files[0]);
      e.target.value = "";
    }
  };

  const handleDateChange = (date) => {
    setActDate(date);
  };
  const handleChange = (event) => {
    setLevel(event.target.value);
  };

  //   過去のコメントを取得（受信処理）
  //   データをとってくる sports(props)にアクセスして、その中のactを取得してuseStateで代入
  useEffect(() => {
    const unSub = db
      .collection("sports")
      .doc(props.sportsId)
      .collection("acts")
      .where("uid", "==", user.uid)
      .orderBy("timestamp", "desc")
      .limit(1)
      .onSnapshot((snapshot) => {
        setActs(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            // sportsのドキュメントid(上から受信)
            sportsId: doc.data().sportsId,
            // sportsno: doc.data().sportsno,
            sportsname: doc.data().sportsname,
            sportsimage: doc.data().sportsimage,
            // 投稿の情報
            acttitle: doc.data().acttitle,
            actcomment: doc.data().actcomment,
            level: doc.data().level,
            actDate: doc.data().actDate,
            actImage: doc.data().actImage,
            timestamp: doc.data().timestamp,
            // ここは確かめるユーザーデータを使う
            uid: doc.data().uid,
            username: doc.data().username,
            avatar: doc.data().avatar,
          }))
        );
      });
    return () => {
      unSub();
    };
    // 投稿のIDが変わった場合は対象の投稿のコメントを入れる。
  }, [props.sportsId]);

  // console.log(acts);

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
      const uploadActImg = storage.ref(`actimages/${fileName}`).put(actImage);
      uploadActImg.on(
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
                  avatar: user.photoUrl,
                  uid: user.uid,
                  username: user.displayName,
                  // 投稿内容
                  actImage: url,
                  acttitle: acttitle,
                  actcomment: actcomment,
                  level: level,
                  actDate: actDate,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  // スポーツ情報
                  sportsId: props.sportsId,
                  // sportsno: props.sportsno,
                  sportsname: props.sportsname,
                });
            });
        }
      );
    } else {
      db.collection("sports").doc(props.sportsId).collection("acts").add({
        // コメントするユーザのデータと、入力テキストをactに入力（追記する）
        //   Reduxを使わないならここ書き換える↓自分のデータ
        uid: user.uid,
        avatar: user.photoUrl,
        username: user.displayName,
        //入力データ
        actImage: "",
        acttitle: acttitle,
        actcomment: actcomment,
        level: level,
        actDate: actDate,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        // スポーツのデータ
        sportsId: props.sportsId,
        // sportsno: props.sportsno,
        sportsname: props.sportsname,
        sportsimage: props.image,
      });
    }
    setAct("");

    setActImage(null);
    setActtitle("");
    setActcomment("");
    setActtitle("");
    setLevel("");
    setActDate(null);
  };

  return (
    <>
      <Grid item key={props} xs={12} sm={3} md={4}>
        <Card className={classes.root}>
          <CardHeader
            className="cardHeader"
            avatar={
              <Avatar
                src={props.image}
                variant="rounded"
                className={classes.avatar}
              />
            }
            // action={
            //   <IconButton aria-label="settings">
            //     <MoreVertIcon />
            //   </IconButton>
            // }
            title={props.sportsname}
            // subheader={props.detail}
          />
          {/* <div>
          {props.image && (
            <CardMedia
              className={classes.media}
              image={props.image}
              title={props.sportsname}
            />
          )}
        </div> */}

          <CardActions textAlign="right" justify="center">
            <Button
              variant="outlined"
              color="primary"
              onClick={handleClickOpen}
            >
              やったよ！登録
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
              fullWidth
              maxWidth="md"
            >
              <DialogTitle id="form-dialog-title">
                スポーツ経験を登録する
              </DialogTitle>
              <DialogContent>
                <DialogContentText>楽しい経験を登録しよう！</DialogContentText>
                <form onSubmit={sendAct}>
                  <div>
                    <div>
                      <Box textAlign="center">
                        <IconButton>
                          <label>
                            <AddAPhotoIcon
                              color="primary"
                              fontSize="large"
                              className={actImage}
                            />
                            <input
                              type="file"
                              onChange={onChangeImageHandler}
                            />
                          </label>
                        </IconButton>
                      </Box>
                    </div>
                    <div>
                      <Typography>タイトル</Typography>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        type="acttitle"
                        placeholder="題名・一言！*必須項目"
                        value={acttitle}
                        onChange={(e) => setActtitle(e.target.value)}
                      />
                      <Typography>感想</Typography>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        multiline
                        rows={3}
                        type="actcomment"
                        placeholder="感想を自由に書いてください"
                        value={actcomment}
                        onChange={(e) => setActcomment(e.target.value)}
                      />
                    </div>
                    <FormLabel component="legend">Level</FormLabel>
                    <RadioGroup
                      aria-label="level"
                      name="level"
                      value={level}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="4"
                        control={<Radio />}
                        label="試合したよ"
                      />
                      <FormControlLabel
                        value="3"
                        control={<Radio />}
                        label="レッスン受けたよ"
                      />
                      <FormControlLabel
                        value="2"
                        control={<Radio />}
                        label="ちょこっと体験"
                      />
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label="なりきり写真！"
                      />
                    </RadioGroup>
                  </div>
                  <div>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid container justify="space-around">
                        <KeyboardDatePicker
                          margin="normal"
                          id="date-picker-dialog"
                          label="Date picker dialog"
                          format="MM/dd/yyyy"
                          value={actDate}
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
                      disabled={!acttitle}
                      type="submit"
                      onClick={handleClose}
                    >
                      <Typography>登録する</Typography>
                    </Button>
                  </div>
                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                {/* <Button onClick={handleClose} color="primary">
                Subscribe
              </Button> */}
              </DialogActions>
            </Dialog>
          </CardActions>

          {/* <div>
              <Typography>ユーザーの体験情報</Typography>
            </div> */}
          <CardContent className={classes.cardContent}>
            <div>
              {acts.map((act) => (
                <div key={act.id}>
                  <div>
                    {act.actImage && (
                      <CardMedia
                        className={classes.media}
                        image={act.actImage}
                        title={act.acttitle}
                      />
                    )}
                    {!act.actImage && (
                      <CardMedia
                        className={classes.media}
                        image={mainVisual}
                        title="イメージなし"
                      />
                    )}
                  </div>
                  <div>
                    <Typography>{act.acttitle} </Typography>
                    <Typography>{act.actcomment}</Typography>
                    <Typography>{act.level}</Typography>
                    <Typography>
                      {act.actDate &&
                        moment(new Date(act.actDate?.toDate())).format(
                          "Do MMM"
                        )}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default SportsAct;

// メダル　<a href='https://ja.pngtree.com/so/メダルクリップ'>メダルクリップ pngから ja.pngtree.com</a>
{
  /* <a href='https://ja.pngtree.com/so/メダルクリップ'>メダルクリップ pngから ja.pngtree.com</a> */
}

// User情報取得
// const [user, setUser] = useState(null);
// useEffect(() => {
//     const unSub = auth.onAuthStateChanged((authUser) => {
//       if (authUser){ setUser(authUser);
//       }else{ setUser(null);
//       };
//     });
//       return () => unSub();
//     },);
// 例 UID: {user && user.uid}

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

{
  /* {acts.map((act) => ( */
}
{
  /* // <div key={act.id}> */
}
{
  /* <Avatar src={act.avatar} /> */
}
{
  /* <GridListTile key={act.img} imgFullWidth>
                  {act.actImage && (
                    <img src={act.actImage} alt={act.acttitle} className={classes.media}/>
                    )}
                    <GridListTileBar
                        title={act.acttitle}
                        classes={{
                          root: classes.titleBar,
                          title: classes.title,
                        }}/>                  
                  </GridListTile> */
}
