import React, { useState, useEffect } from "react";
import { storage, db } from "./firebase";
import { Redirect, withRouter } from "react-router-dom";
import firebase from "firebase/app";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";

import Typography from "@material-ui/core/Typography";
// import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Button, IconButton, Box } from "@material-ui/core";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import TextField from "@material-ui/core/TextField";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// import FormControl from '@material-ui/core/FormControl';
import FormLabel from "@material-ui/core/FormLabel";

const useStyles = makeStyles((theme) => ({
  root: {
    //   display: 'flex',
    //   flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    //   width: '25ch',
  },
  formControl: {
    margin: theme.spacing(1),
    //   minWidth: 120,
    maxWidth: "md",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
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

const FacilityResistration = () => {
  firebase.auth().onAuthStateChanged(function (user) {
    if (!user) {
      return <Redirect to="/home" />;
    }
  });
  // const user = useSelector(selectUser);
  const classes = useStyles();
  const user = useSelector(selectUser);

  const [inputImage, setInputImage] = useState(null);
  const [resistDate, setResistDate] = useState(null);
  const [facilityName, setFacilityName] = useState("");
  const [facilityType, setFacilityType] = useState("");
  const [facilityUrl, setFacilityUrl] = useState("");
  const [facilityPostCode, setFacilityPostCode] = useState("");
  const [facilityAddress, setFacilityAddress] = useState("");
  const [facilityPhone, setFacilityPhone] = useState("");
  const [facilityEmail, setFacilityEmail] = useState("");
  const [facilityDetail, setFacilityDetail] = useState("");
  const [facilityNo, setFacilityNo] = useState("");
  const [facilityComment, setFacilityComment]=useState("");
  // const [facilityNo, setFacilityNo] = useState("");
  const [facilityStyle, setFacilityStyle] = useState("");
  const [area, setArea] = useState("");

  const onChangeImageHandler = (e) => {
    if (e.target.files[0]) {
      setInputImage(e.target.files[0]);
      e.target.value = "";
    }
  };

  const [facilities, setFacilities] = useState([
    {
      id: "",
      facilityName: "",
      facilityImage: "null",
      facilityType: "",
      facilityUrl: "",
      facilityPostCode: "",
      facilityStyle: "",
      facilityComment:"",
    },
  ]);
  const names = [
    "東京都",
    "神奈川県",
    "埼玉県",
    "千葉県",
    "群馬県",
    "茨城県",
    "栃木県",
    "関東以外",
  ];

  const sports = [
    "陸上競技",
    "バスケットボール(3×3)",
    "バスケットボール",
    "サッカー",
    "テニス",
    "バドミントン",
    "バレーボール",
    "ハンドボール",
    "ホッケー",
    "ラグビー",
    "アーチェリー",
    "カヌー（スラローム）",
    "カヌー（スプリント）",
    "ボート",
    "セーリング",
    "ビーチバレーボール",
    "サーフィン",
    "スケードボード",
    "スポーツクライミング",
    "トライアスロン",
    "体操競技",
    "新体操",
    "トランポリン",
    "ウェイトリフティング",
    "近代五種",
    "テコンドー",
    "レスリング",
    "ボクシング",
    "空手",
    "柔道",
    "馬術",
    "射撃",
    "ゴルフ",
    "フェンシング",
    "競泳",
    "飛び込み",
    "水球",
    "アーティスティックスイミング",
    "マラソンスイミング",
    "野球・ソフトボール",
    "卓球",
    "自転車競技(BMXフリースタイル)",
    "自転車競技(BMXレーシング)",
    "自転車競技（トラック）",
    "自転車競技（マウンテンバイク）",
  ];

  // const handleChange = (event) => {
  //     setPersonName(event.target.value);
  //   };

  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setArea(value);
  };

  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState("Choose wisely");
  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(" ");
    setError(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    if (value === "best") {
      setHelperText("You got it!");
      setError(false);
    } else if (value === "worst") {
      setHelperText("Sorry, wrong answer!");
      setError(true);
    } else {
      setHelperText("Please select an option.");
      setError(true);
    }
  };

  useEffect(() => {
    const unSub = db
      .collection("facility")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setFacilities(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            facilityName: doc.data().facilityName,
            facilityImage: doc.data().facilityImage,
            facilityType: doc.data().facilityType,
            facilityUrl: doc.data().facilityUrl,
            facilityPhone: doc.data().facilityPhone,
            facilityEmail: doc.data().facilityEmail,
            facilityPostCode: doc.data().facilityPostCode,
            facilityStyle: doc.data().facilityStyle,
            facilityComment: doc.data().facilityComment,
            timestamp: doc.data().timestamp,
          }))
        )
      );
    return () => {
      unSub();
    };
  }, []);

  const sendFacilities = (e) => {
    e.preventDefault();
    if (inputImage) {
      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const N = 16;
      const randomMoji = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join("");
      const fileName = randomMoji + "_" + inputImage.facilityName;
      // firebase storageに登録する処理
      const uploadFacilityImg = storage
        .ref(`facilityimages/${fileName}`)
        .put(inputImage);
      // firebaseのDBに登録する処理
      uploadFacilityImg.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        () => {}, //進捗度合いの管理するもの、
        (err) => {
          //エラーに関する処理
          alert(err.message);
        },
        async () => {
          //成功したとき
          await storage
            .ref("facilityimages")
            .child(fileName)
            .getDownloadURL()
            .then(async (url) => {
              await db.collection("facilities").add({
                facilityImage: url,
                uid: user.uid,
                facilityName: facilityName,
                facilityType: facilityType,
                facilityUrl: facilityUrl,        
                facilityPhone: facilityPhone,
                facilityEmail: facilityEmail,
                facilityPostCode: facilityPostCode,
                facilityStyle: facilityStyle,
                facilityComment: facilityComment,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              });
            });
        }
      );
    } else {
      // テキストだけの処理
      db.collection("facilities").add({
        // facilityImage: url,
        uid: user.uid,
        facilityName: facilityName,
        facilityType: facilityType,
        facilityUrl: facilityUrl,
        facilityPhone: facilityPhone,
        facilityEmail: facilityEmail,
        facilityPostCode: facilityPostCode,
        facilityStyle: facilityStyle,
        facilityComment: facilityComment,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
    setInputImage(null);
    setFacilityName("");
    setFacilityType("");
    setFacilityUrl("");
    setFacilityPhone("");
    setFacilityEmail("");
    setFacilityPostCode("");
    setFacilityStyle("");
    setFacilityComment("");
    setArea("");
  };

  return (
    <>
      <div className={classes.root}>
        <Container>
          <Typography>店舗情報登録</Typography>
          <div className={classes.root}>
            <div>
              <form  onSubmit={sendFacilities}>
                <FormControl className={classes.formControl}>
                  <Box className="classes.box1">
                    <IconButton>
                      <label>
                        <AddAPhotoIcon
                          color="primary"
                          fontSize="large"
                          className={
                            inputImage ? classes.addiconloaded : classes.addicon
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
                  <TextField
                    id="standard-full-width"
                    label="店舗名・施設名"
                    style={{ margin: 8 }}
                    placeholder="オレリン公民館"
                    helperText="必須項目"
                    fullWidth
                    margin="normal"
                    value={facilityName}
                    // InputLabelProps={{
                    //     shrink: true,
                    // }}
                    onChange={(e) => setFacilityName(e.target.value)}
                  />
                  <TextField
                    id="standard-full-width"
                    label="URL・WebSite"
                    style={{ margin: 8 }}
                    placeholder="http://"
                    fullWidth
                    margin="normal"
                    // InputLabelProps={{
                    //   shrink: true,
                    // }}
                    value={facilityUrl}
                    onChange={(e) => setFacilityUrl(e.target.value)}
                  />
                  <TextField
                    id="standard-full-width"
                    label="電話番号"
                    // className={classes.textField}
                    style={{ margin: 8 }}
                    placeholder="0300000000"
                    helperText="電話番号(任意・情報は公開されます）"
                    fullWidth
                    margin="normal"
                    // InputLabelProps={{
                    //   shrink: true,
                    // }}
                    value={facilityPhone}
                    onChange={(e) => setFacilityPhone(e.target.value)}
                  />
                  <TextField
                    id="standard-full-width"
                    label="Email"
                    // className={classes.textField}
                    style={{ margin: 8 }}
                    placeholder="0300000000"
                    helperText="Email(任意・情報は公開されます）"
                    fullWidth
                    margin="normal"
                    // InputLabelProps={{
                    //   shrink: true,
                    // }}
                    value={facilityEmail}
                    onChange={(e) => setFacilityEmail(e.target.value)}
                  />
                  <TextField
                    label="郵便番号"
                    id="margin-dense"
                    className={classes.textField}
                    helperText="郵便番号を７桁の半角数字で入力　1112222 (ハイフン-なし）(任意・情報は公開されます）"
                    margin="dense"
                    value={facilityPostCode}
                    onChange={(e) => setFacilityPostCode(e.target.value)}
                  />
                  <FormLabel component="legend"> 施設タイプ</FormLabel>
                  <RadioGroup
                    row
                    aria-label="position"
                    name="position"
                    defaultValue="A1"
                    onChange={handleRadioChange}
                  >
                    <FormControlLabel
                      value="A1"
                      control={<Radio color="primary" />}
                      label="店舗"
                    />
                    <FormControlLabel
                      value="B1"
                      control={<Radio color="primary" />}
                      label="施設（場所のみ）"
                    />
                    <FormControlLabel
                      value="C1"
                      control={<Radio color="primary" />}
                      label="インストラクター利用（レッスン・イベント等）"
                    />
                  </RadioGroup>
                  <TextField
                    label="施設の内容・出来るスポーツ"
                    id="margin-dense"
                    // className={classes.textField}
                    helperText="わかりやすく説明してください"
                    margin="dense"
                    value={facilityComment}
                    multiline
                    rows={3}
                    onChange={(e) => setFacilityComment(e.target.value)}
                  />
                  {/*スポーツ */}
                  <Button
                    type="submit"
                    disabled={!facilityName}
                    Button
                    variant="contained"
                    color="primary"
                  >
                    投稿する
                  </Button>
                </FormControl>
              </form>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default FacilityResistration;
