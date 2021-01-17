import React, { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import { withRouter, Link, Router } from "react-router-dom";

// Style用
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
// import CameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
// import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircle from "@material-ui/icons/AccountCircle";

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
}));

// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// データベースからとってくる
// const beach = {
//   name: "ビーチバレー",
//   desc: "XXXXXXXXXXXXXXXXXXXXXXXXX",
//   image:"https://source.unsplash.com/random"
// };

// const cards = [beach, basket];

const Mainpage = (props) => {
  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      !user && props.history.push("login");
    });
    return () => unSub();
  });

  const [sports, setSports] = useState([
    {
      id: " 1",
      title: "aaaa",
      image: "",
      desc: "sssss",
      sports_no: "1",
    },
  ]);
  //記述２.useEffectの処理
  useEffect(() => {
    const firebaseData = db
      .collection("sports")
      // .orderBy("sports_no", "desc")
      .onSnapshot((snapshot) =>
        setSports(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().title,
            image: doc.data().image,
            desc: doc.data().desc,
            sports_no: doc.data().sports_no,
          }))
        )
      );
    return () => {
      firebaseData();
    };
  }, []);

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
              className={classes.title}
              noWrap
            >
              Orelympic Personal Mainpage
            </Typography>
            {/* あとで、アカウントのボタン実装https://material-ui.com/components/app-bar/#app-bar*/}
            {auth && (
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  // onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
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
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                写　ニックネーム
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
              >
                貴方は４８種目中○種目でメダル！
                <br />
                関数を入れたい。
                <br />
                意気込み！ 「個人詳細ページへのリンク」
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
                  <Grid item>
                    <Button variant="outlined" color="primary">
                      今までの記録を見る
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </div>
          {/* ここから下は自分の写真と記録のアルバム */}
          {/* スポーツ一覧（メダルつき）エリアと、自分の投稿した写真エリア */}
          <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {sports.map((card) => (
                <Grid item key={card} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      key={card.id}
                      className={classes.cardMedia}
                      image={card.image}
                      title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.title}
                      </Typography>
                      <Typography>{card.desc}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">
                        View
                      </Button>
                      <Button size="small" color="primary">
                        Edit・登録
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <br />
            {/* 自分で投稿した写真一覧 ----------------------あとでdbの変更しますよ！*/}
            <h1>You are the Orelympia!</h1> <br />
            <Grid container spacing={4}>
              {sports.map((card2) => (
                <Grid item key={card2} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      key={card2.id}
                      className={classes.cardMedia}
                      image={card2.image}
                      title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card2.title}
                      </Typography>
                      <Typography>{card2.desc}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">
                        View
                      </Button>
                      <Button size="small" color="primary">
                        Edit・登録
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
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

export default withRouter(Mainpage);
