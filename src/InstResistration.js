import React, { useState, useEffect } from "react";
import { storage, db } from "./firebase";
import { Redirect, withRouter, Link } from "react-router-dom";
import firebase from "firebase/app";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import InstList from "./InstList";

import Typography from "@material-ui/core/Typography";
// import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Button, IconButton, Box, Grid, Avatar } from "@material-ui/core";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import TextField from "@material-ui/core/TextField";
// import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
// import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
// import Checkbox from "@material-ui/core/Checkbox";
// import Chip from "@material-ui/core/Chip";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// import FormControl from '@material-ui/core/FormControl';
import FormLabel from "@material-ui/core/FormLabel";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    //   width: '25ch',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
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
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
}));

// function getStyles(name, personName, theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium
//   };
// }


const InstResistration = () => {
  firebase.auth().onAuthStateChanged(function (user) {
    if (!user) {
      return <Redirect to="/home" />;
    }
  });
  const classes = useStyles();
  const user = useSelector(selectUser);
  const theme = useTheme();

  // 紹介写真・登録日・名前・webpage
  const [inputImage, setInputImage] = useState(null);
  const [instName, setInstName] = useState("");
  const [instUrl, setInstUrl] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [instDetail, setInstDetail] = useState("");
  const [spec, setSpec] = useState("");
  const [instStyle, setInstStyle] = useState("");
  const [area, setArea] = useState("");
  const [sports1, setSports1] = useState("");
  const [sports2, setSports2] = useState("");
  const [sports3, setSports3] = useState("");
  // const [instDetail, setInstDetail] = useState("");
  // const [resistDate, setResistDate] = useState(null);
  // const [instType, setInstType] = useState("");

  const onChangeImageHandler = (e) => {
    if (e.target.files[0]) {
      setInputImage(e.target.files[0]);
      e.target.value = "";
    }
  };

  const [insts, setInsts] = useState([
    {
      id: "",
      instName: "",
      instImage: null,
      instUrl: "",
      phone: "",
      email: "",
      instDetail: "",
      spec: "",
      isntStyle: "",
      area: "",
      sports1: "",
      sports2: "",
      sports3: "",
    },
  ]);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250
      }
    }
  };
  const areas = [
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

  // const handleChangeMultiple = (event) => {
  //   const { options } = event.target;
  //   const value = [];
  //   for (let i = 0, l = options.length; i < l; i += 1) {
  //     if (options[i].selected) {
  //       value.push(options[i].value);
  //     }
  //   }
  //   setArea(value);
  // };

  function getStyles1(sports, sports1, theme) {
    return {
      fontWeight:
        sports1.indexOf(sports) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  function getStyles2(sports, sports2, theme) {
    return {
      fontWeight:
        sports2.indexOf(sports) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  function getStyles3(sports, sports3, theme) {
    return {
      fontWeight:
        sports3.indexOf(sports) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
    const handleChange1 = (event) => {
      setSports1(event.target.value);
    };
    const handleChange2 = (event) => {
      setSports2(event.target.value);
    };
    const handleChange3 = (event) => {
      setSports3(event.target.value);
    };

  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("Choose wisely");
  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(" ");
    setError(false);
  };

  useEffect(() => {
    const unSub = db
      .collection("insts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setInsts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            instName: doc.data().instName,
            instImage: doc.data().instImage,
            instUrl: doc.data().instUrl,
            phone: doc.data().instPhone,
            email: doc.data().instEmail,
            instDetail: doc.data().instDetail,
            spec: doc.data().spec,
            instStyle: doc.data().instStyle,
            area: doc.data().area,
            sports1: doc.data().sports1,
            sports2: doc.data().sports2,
            sports3: doc.data().sports3,
            timestamp: doc.data().timestamp,
          }))
        )
      );
    return () => {
      unSub();
    };
  }, []);

  const sendInsts = (e) => {
    e.preventDefault();
    if (inputImage) {
      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const N = 16;
      const randomMoji = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join("");
      const fileName = randomMoji + "_" + inputImage.instName;
      // firebase storageに登録する処理
      const uploadFacilityImg = storage
        .ref(`instimages/${fileName}`)
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
            .ref("instimages")
            .child(fileName)
            .getDownloadURL()
            .then(async (url) => {
              await db.collection("insts").add({
                instImage: url,
                uid: user.uid,
                instName: instName,
                instUrl: instUrl,
                phone: phone,
                email: email,
                instDetail: instDetail,
                spec: spec,
                instStyle: instStyle,
                area: area,
                sports1: sports1,
                sports2: sports2,
                sports3: sports3,
                // id: doc.id,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              });
            });
        }
      );
    } else {
      // テキストだけの処理
      db.collection("insts").add({
        uid: user.uid,
        instName: instName,
        instUrl: instUrl,
        phone: phone,
        email: email,
        instDetail: instDetail,
        spec: spec,
        instStyle: instStyle,
        area: area,
        sports1: sports1,
        sports2: sports2,
        sports3: sports3,
        // id: doc.id,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
    setInputImage(null);
    setInstName("");
    setInstUrl("");
    setPhone("");
    setEmail("");
    setInstDetail("");
    setSpec("");
    setInstStyle("");
    setArea("");
    setSports1("");
    setSports2("");
    setSports3("");
  };

  return (
    <>
      <div className={classes.root}>
        <Container>
          <Typography>インストラクター情報登録</Typography>
          <div className={classes.root}>
            <div>
              <form onSubmit={sendInsts}>
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
                    // id="standard-full-width"
                    label="インストラクター名（公開用）"
                    style={{ margin: 8 }}
                    placeholder="名前、もしくは活動名"
                    helperText="必須項目"
                    fullWidth
                    margin="normal"
                    value={instName}
                    onChange={(e) => setInstName(e.target.value)}
                  />
                  <TextField
                    id="standard-full-width"
                    label="URL・WebSite・活動内容がわかるSNSなどへのリンク"
                    style={{ margin: 8 }}
                    placeholder="http://"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={instUrl}
                    onChange={(e) => setInstUrl(e.target.value)}
                  />
                    <TextField
                    id="standard-full-width"
                    label="電話番号(任意・公開されます)"
                    // className={classes.textField}
                    style={{ margin: 8 }}
                    placeholder="0300000000"
                    helperText="電話番号（公開されます）SNSなどでの連絡を希望の場合はこちらに記入しないでください"
                    fullWidth
                    margin="normal"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {/* <box> */}
                  {/* <InputLabel shrink htmlFor="select-multiple-native">
                      エリア
                    </InputLabel>
                    <Select
                      multiple
                      native
                      value={area}
                      onChange={handleChangeMultiple}
                      inputProps={{
                        id: "select-multiple-native",
                      }}
                    >
                      {names.map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </Select> */}
                  {/* </box> */}
                  <TextField
                    id="standard-full-width"
                    label="専門のスポーツ"
                    style={{ margin: 8 }}
                    placeholder="バレーボール・ビーチバレー"
                    helperText="必須項目"
                    fullWidth
                    margin="normal"
                    value={spec}
                    onChange={(e) => setSpec(e.target.value)}
                  />
                  <TextField
                    id="standard-full-width"
                    label="詳細"
                    style={{ margin: 8 }}
                    placeholder="〇〇代表"
                    helperText="必須項目"
                    fullWidth
                    margin="normal"
                    value={instDetail}
                    onChange={(e) => setInstDetail(e.target.value)}
                  />
                  <FormLabel component="legend">  インストラクタータイプ</FormLabel>
                  <RadioGroup
                    row
                    aria-label="position"
                    name="position"
                    defaultValue="I1"
                    onChange={handleRadioChange}
                  >
                    <FormControlLabel
                      value="I1"
                      control={<Radio color="primary" />}
                      label="有資格のインストラクター・コーチ"
                    />
                    <FormControlLabel
                      value="I2"
                      control={<Radio color="primary" />}
                      label="複数の場所でのインストラクター・コーチ経験あり"
                    />
                    <FormControlLabel
                      value="I3"
                      control={<Radio color="primary" />}
                      label="施設・団体内でのインストラクター経験あり"
                    />
                  </RadioGroup>
      <div>
      <FormLabel component="legend"> 体験クラスが出来るスポーツ（３つまで選択できます）</FormLabel>
      <FormControl className={classes.formControl} xs={3}>
        <InputLabel id="demo-mutiple-name-label" >Sports1</InputLabel>
        <Select
          labelId="demo-mutiple-name-label"
          id="available-sports"
          value={sports1}
          onChange={handleChange1}
          input={<Input />}
          MenuProps={MenuProps}
        >
          {sports.map((sports) => (
            <MenuItem key={sports} value={sports} style={getStyles1(sports, sports1, theme)}>
              {sports}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-name-label" xs={3}>Sports2</InputLabel>
        <Select
          labelId="demo-mutiple-name-label"
          id="available-sports"
          value={sports2}
          onChange={handleChange2}
          input={<Input />}
          MenuProps={MenuProps}
        >
          {sports.map((sports) => (
            <MenuItem key={sports} value={sports} style={getStyles2(sports, sports2, theme)}>
              {sports}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl} xs={3}>
        <InputLabel id="demo-mutiple-name-label">Sports3</InputLabel>
        <Select
          labelId="demo-mutiple-name-label"
          id="davailable-sports"
          value={sports3}
          onChange={handleChange3}
          input={<Input />}
          MenuProps={MenuProps}
        >
          {sports.map((sports) => (
            <MenuItem key={sports} value={sports} style={getStyles3(sports, sports3, theme)}>
              {sports}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
                  <Button
                    type="submit"
                    disabled={!instName}
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
      </div><br/>
      <div>
      <Container className={classes.cardGrid} maxWidth="md" spacing={4}>
              {/* <Grid container spacing={2}> */}
              <Grid container spacing={4}>
                {insts.map((inst) => (
                      <Card className={classes.root}>
                      <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                          インストラクター
                        </Typography>
                        <Avatar src={inst.instImage} className={classes.large} />
                        <Typography variant="h5" component="h2">
                        {inst.instName}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                        {inst.spec}
                        </Typography>
                        <Typography variant="body2" component="p">
                        ☑ 初回講習あり ☑ レンタルあり ☑初心者歓迎
                        </Typography>
                        <Typography variant="body2" component="p">
                        <div className={classes.chips}>
                        {inst.sports1 && (
                        <Chip key={inst.sports1} label={inst.sports1} className={classes.chip} />)}
                        {inst.sports2 && (
                        <Chip key={inst.sports2} label={inst.sports2} className={classes.chip} />)}
                        {inst.sports3 && (
                        <Chip key={inst.sports3} label={inst.sports3} className={classes.chip} />)}
                        </div>
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small"><a target="_blank" href={inst.instUrl} className={classes.link}>インストラクターURL</a></Button><br/>
                        <Link to="/courselist" color="inherit">
                          <Button variant="contained" color="primary">
                          体験コースをみる
                          </Button>
                        </Link>
                        <Button size="small">Detail</Button>
                      </CardActions>
                    </Card>
                  // <Typography>{inst.instName}</Typography>
                  // <InstList
                  //   key={inst.id}
                  //   // sportsId={sport.id}
                  //   instImage={inst.instImage}
                  //   instName={inst.instName}
                  //   instUrl={inst.instUrl}
                  //   phone={inst.phone}
                  //   email={inst.email}
                  //   instDetail={inst.instDetail}
                  //   spec={inst.spec}
                  //   instStyle={inst.instStyle}
                  //   area={inst.area}
                  //   timestamp={inst.timestamp}
                  // />
                ))}
              </Grid>
              {/* </Grid> */}
        </Container>
        </div><br/>
        <Card>

        </Card>

    </>
  );
};

export default InstResistration;
