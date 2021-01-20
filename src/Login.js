import React, { useState, useEffect } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import { withRouter, Link } from "react-router-dom";
import { auth, provider, storage } from "./firebase";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "./features/userSlice";
//構成テンプレート
import styles from "./Login.module.css";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import { Paper, Modal, IconButton } from "@material-ui/core";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EmailIcon from "@material-ui/icons/Email";
import CameraIcon from "@material-ui/icons/Camera";

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

// スタイル
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  //ログイン状態の保持
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [avatarImage, setAvatarImage] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  // Email忘れた時にパスワードリセット
  const sendResetEmail = async (e) => {
    await auth
      .sendPasswordResetEmail(resetEmail)
      .then(() => {
        setOpenModal(false);
        setResetEmail("");
      })
      .catch((err) => {
        alert(err.message);
        setResetEmail("");
      });
  };

  // IMG画像を入れる関数
  const onChangeImageHandler = (e) => {
    if (e.target.files[0]) {
      setAvatarImage(e.target.files[0]);
      e.target.value = "";
    }
  };
  // GOOGLE
  const signInGoogle = async () => {
    await auth.signInWithPopup(provider).catch((err) => alert(err.message));
  };
  // Email認証
  const signInEmail = async () => {
    await auth.signInWithEmailAndPassword(email, password);
  };
  // Sinup(新規登録)
  const signUpEmail = async () => {
    const authUser = await auth.createUserWithEmailAndPassword(email, password);
    let url = "";
    if (avatarImage) {
      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const N = 16;
      const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join("");
      const fileName = randomChar + "_" + avatarImage.name;
      await storage.ref(`avatars/${fileName}`).put(avatarImage);
      url = await storage.ref("avatars").child(fileName).getDownloadURL();
    }
    await authUser.user?.updateProfile({
      displayName: username,
      photoURL: url,
    });
    dispatch(
      updateUserProfile({
        displayName: username,
        photoUrl: url,
      })
    );
  };

  // ログインした時に表示を切り替える
  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      user && props.history.push("/");
    });
    return () => unSub();
  }, [props.history]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isLogin ? "Login" : "Register"}
        </Typography>
        <form className={classes.form} noValidate>
          {/* フィールドのセット */}
          {!isLogin && (
            <>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              {/* アバター画像登録onChangeImageHandler呼び出し */}
              <Box textAlign="center">
                <IconButton>
                  <label>
                    <AccountCircleIcon
                      fontSize="large"
                      className={
                        avatarImage
                          ? styles.login_addIconLoaded
                          : styles.login_addIcon
                      }
                    />
                    <input
                      className={styles.login_hiddenIcon}
                      type="file"
                      onChange={onChangeImageHandler}
                    />
                  </label>
                </IconButton>
              </Box>
            </>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          {/* サインイン */}
          <Button
            // 文字が少ないとボタン押せませんよ
            disabled={
              isLogin
                ? !email || password.length < 6
                : !username || !email || password.length < 6 || !avatarImage
            }
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            startIcon={<EmailIcon />}
            onClick={
              isLogin
                ? async () => {
                    try {
                      await signInEmail();
                    } catch (err) {
                      alert(err.message);
                    }
                  }
                : async () => {
                    try {
                      await signUpEmail();
                    } catch (err) {
                      alert(err.message);
                    }
                  }
            }
          >
            {isLogin ? "Login" : "Register"}
          </Button>
          {/* パスワード忘れ */}
          <Grid container>
            <Grid item xs>
              <span
                className={styles.login_reset}
                onClick={() => setOpenModal(true)}
              >
                Forgot password ?
              </span>
            </Grid>
            {/* Resisterにするか？ CSSのトグルモード*/}
            {/* xsを消すと右寄りに   <Grid item xs> */}
            <Grid item>
              <span
                className={styles.login_toggleMode}
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Create new account ?" : "Back to login"}
              </span>
            </Grid>
          </Grid>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            startIcon={<CameraIcon />}
            onClick={signInGoogle}
          >
            SignIn with Google
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default withRouter(Login);

{
  /* 前の設定 */
}
//   <div justify="center">
//   <FormControl>
//     <TextField
//       name="email"
//       label="E-mail"
//       value={email} //useStateのEメールが入ってくる
//       onChange={(e) => setEmail(e.target.value)}
//     />
//   </FormControl>
//   <br />
//   {/* パスワードフォーム*/}
//   <FormControl>
//     <TextField
//       name="password"
//       label="Password"
//       type="password"
//       value={password} //useStateのEメールが入ってくる
//       onChange={(e) => setPassword(e.target.value)}
//     />
//   </FormControl>
//   <br />
//   <Button
//     variant="contained"
//     color="primary"
//     size="small"
//     //   ボタンを押した時の登録処理を書く
//     onClick={
//       isLogin //Login成功してる時
//         ? async () => {
//             try {
//               await auth.signInWithEmailAndPassword(email, password);
//               props.history.push("/");
//             } catch (error) {
//               //ログインできない時、失敗した時はえらーMSG
//               alert(error.message);
//             }
//           }
//         : async () => {
//             try {
//               // 新規登録　作成時 firebaseに[createUserWithEmailAndPassword]というものがあるのでそれに
//               // email, passwordで保持した状態を送り→成功すればhistoryによって画面遷移が実行される
//               await auth.createUserWithEmailAndPassword(
//                 email,
//                 password
//               );
//               props.history.push("/");
//             } catch (error) {
//               // ログインできない、失敗したときはエラーで表示される
//               alert(error.message);
//             }
//           }
//     }
//   >
//     {isLogin ? "ログインする" : "登録する"}
//   </Button>
//   {/* ここに追加 */}
//   <Typography align="center">
//     <span onClick={() => setIsLogin(!isLogin)}>
//       {isLogin ? "Create new account ?" : "Back to Login"}
//     </span>
//   </Typography>
// </div>
