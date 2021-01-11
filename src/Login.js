import React, { useState, useEffect } from "react";
import { Button, FormControl, TextField, Typography } from "@material-ui/core";
import { auth } from "./firebase";

//構成テンプレート
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Orelympic
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
// スタイル
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


//propsを追記してくださいね♪
const Login = (props) => {  
  //ログイン状態の保持
  const [isLogin, setIsLogin] = useState(true);
  //上記がTrueでなく、Falseだと逆   
  // メールの状態を保持
  const [email, setEmail] = useState("");
  // パスワードの状態を保持
  const [password, setPassword] = useState("");

    useEffect(() => {
        // 認証関係に対して何かしらの変更があったときに実行されるfirebaseの機能
        // onAuthStateChangedは→ログインしていたとか、ログアウトしたとかで呼び出される
        // userというパラメーターがあり、これには「ログインが成功したときに」この部分に全部格納される
        // userに何らかの情報がはいっていればログインに成功、入ってなければログイン失敗、ログインしていない
        const unSub = auth.onAuthStateChanged((user) => {
          // 判定の条件は何らかの情報が入っていた時→ルートの画面（App）に遷移させる(逆にuserにない場合は常にこの画面に止まり続ける)
          user && props.history.push("/");
        });
        return () => unSub();
      }, [props.history]);
      const classes = useStyles();

    return(
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <div justify="center">
          {/* ログインしているときのタイトの切り替え */}
          <h1>{isLogin ? "Login" : "Register=登録"}</h1>
          <br />
          {/* フォームの記述 */}
          <FormControl>
              <TextField 
              name="email"
              label="E-mail"
              value={email}   //useStateのEメールが入ってくる
              onChange={(e) => setEmail(e.target.value)}
              />
          </FormControl><br/>
          {/* パスワードフォーム*/}
          <FormControl>
              <TextField 
              name="password"
              label="Password"
              type="password"
              value={password}   //useStateのEメールが入ってくる
              onChange={(e) => setPassword(e.target.value)}
              />
          </FormControl><br/>
          <Button variant="contained" color="primary" size="small"
        //   ボタンを押した時の登録処理を書く
            onClick={
                isLogin //Login成功してる時
                ? async () => {
                    try{
                        await auth.signInWithEmailAndPassword(email, password);
                        props.history.push("/");
                    }catch(error){
                        //ログインできない時、失敗した時はえらーMSG
                        alert(error.message);
                    }
                }
                : async() =>{
                    try {
                        // 新規登録　作成時 firebaseに[createUserWithEmailAndPassword]というものがあるのでそれに
                        // email, passwordで保持した状態を送り→成功すればhistoryによって画面遷移が実行される
                        await auth.createUserWithEmailAndPassword(email, password);
                        props.history.push("/");
                      } catch (error) {
                        // ログインできない、失敗したときはエラーで表示される
                        alert(error.message);
                      }
                }
            }
          
          >
              {isLogin ? "ログインする" : "登録する"}
          </Button>
          {/* ここに追加 */}
          <Typography align="center">
              <span onClick={() => setIsLogin(!isLogin)}>
                  {isLogin ? "Create new account ?":"Back to Login"}
              </span>


          </Typography>
          
        </div>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
        </Container>

    )
};

export default Login;
