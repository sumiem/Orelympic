import React, { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import { withRouter, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser, login, logout } from "./features/userSlice";
// Style用
import { Avatar, Typography, Box } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";

import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MySports from "./MySports";
import Main from "./Main";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  large: {
    width: theme.spacing(13),
    height: theme.spacing(13),
  },
  apptitle: {
    flexGrow: 1,
  },
}));

const Mainpage = (props) => {
  const user = useSelector(selectUser);
  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      !user && props.history.push("login");
    });
    return () => unSub();
  });
  // const user = useSelector(selectUser);
  // const [sports, setSports] = useState([
  //   {
  //     id: " 1",
  //     title: "aaaa",
  //     image: "",
  //     desc: "sssss",
  //     sports_no: "1",
  //   },
  // ]);
  //記述２.useEffectの処理
  // useEffect(() => {
  //   const firebaseData = db
  //     .collection("sports")
  //     // .orderBy("sports_no", "desc")
  //     .onSnapshot((snapshot) =>
  //       setSports(
  //         snapshot.docs.map((doc) => ({
  //           id: doc.id,
  //           title: doc.data().title,
  //           image: doc.data().image,
  //           desc: doc.data().desc,
  //           sports_no: doc.data().sports_no,
  //         }))
  //       )
  //     );
  //   return () => {
  //     firebaseData();
  //   };
  // }, []);

  // console.log(sports);
  const classes = useStyles();

  return (
    <>
      <React.Fragment>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            {/* <CameraIcon className={classes.icon} /> */}
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              color="inherit"
              className={classes.apptitle}
              noWrap
            >
              Orelympic Personal Mainpage
            </Typography>

            {auth && (
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  // onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle
                    src={user.photoUrl}
                    className={classes.avatar}
                  />
                  {/* <Avatar 
                      src={user.photoUrl}
                      className={classes.avatar}
                      /> */}
                  <Typography>{user.displayName}</Typography>
                </IconButton>

                <Button
                  color="inherit"
                  id="menu-appbar"
                  onClick={async () => {
                    try {
                      await auth.signOut();
                      props.history.push("login");
                    } catch (error) {
                      alert(error.message);
                    }
                  }}
                >
                  Logout
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>

        <main>
          {/* Hero unit */}

          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Box display="flex" justifyContent="center" flexGrow="1">
                <Avatar alt="Remy Sharp" src="" className={classes.large} />
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color="textPrimary"
                  gutterBottom
                >
                  {user.displayName}さん
                </Typography>
              </Box>

              <Grid>
                <Typography
                  variant="h5"
                  align="center"
                  color="textSecondary"
                  paragraph
                >
                  目標は全制覇！
                  <br />
                  さらなるメダルの獲得まであとすこし！
                  <br />
                  意気込み！
                </Typography>
                <div className={classes.heroButtons}>
                  <Grid container spacing={2} justify="center">
                    <Grid item>
                      <Link to="/sportsexp">
                        <Button variant="contained" color="primary">
                          種目を探す・登録する
                        </Button>
                      </Link>
                    </Grid>
                    {/* <Grid item>
                    <Button variant="outlined" color="primary">
                      今までの記録を見る
                    </Button>
                  </Grid> */}
                    <Grid item>
                      <Button variant="outlined" color="primary">
                        ユーザー情報の登録
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Container>
          </div>

          <MySports />
          {/* ここから下は自分の写真と記録のアルバム */}
          {/* スポーツ一覧（メダルつき）エリアと、自分の投稿した写真エリア */}
          <Container className={classes.cardGrid} maxWidth="md">
            <Main />
          </Container>
        </main>

        {/* Footer */}
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            Footer
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            component="p"
          >
            Something here to give the footer a purpose!
          </Typography>
        </footer>
        {/* End footer */}
      </React.Fragment>
    </>
  );
};

// export default Mainpage;

export default withRouter(Mainpage);
