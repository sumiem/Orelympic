import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
// import Button from "@material-ui/core/Button";
// コンテンツ
import Header from "./Header";
import TopMain from "./TopMain";
import Main from "./Main";
import Sidebar from "./Sidebar";
import mainvisual1 from "./img/mainvisual1.jpg";
// import Footer from './Footer';

// スタイルの形式
const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

//   NAV BAR
const sections = [
  { title: "Technology", url: "#" },
  { title: "Design", url: "#" },
  { title: "Culture", url: "#" },
  { title: "Business", url: "#" },
  { title: "Politics", url: "#" },
  { title: "Opinion", url: "#" },
  { title: "Science", url: "#" },
  { title: "Health", url: "#" },
  { title: "Style", url: "#" },
  { title: "Travel", url: "#" },
];

//   メイン画像
const topMain = {
  id: 2,
  title: "俺たちのスポーツまつり　Orelympic",
  description:
    "オレリンピックとは、種目を通じてスポーツを最高に楽しむ、自分のためのオリンピックです。",
  image: {mainvisual1},
  imgText: "main image description",
  linkText: "Continue reading…(coming soon)",
};

const sidebar = {
  id: 1,
  title: "Login",
  description: "今すぐ始める！?ログインページへ",
  social: [
    { id: 1, name: "Twitter", icon: TwitterIcon },
    { id: 2, name: "Facebook", icon: FacebookIcon },
  ],
};

const Home = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Orelymic Home" sections={sections} />
        <br />
        <main>
          <TopMain post={topMain} />
          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>
              Orelympic
            </Typography>
            <Divider />
          </Grid>
          <Grid container spacing={4}>
            {/* <h1>Orelympic説明</h1>
            <br /> */}
          </Grid>
          {/* メインのグリッド */}
          <Grid container spacing={5} className={classes.mainGrid}>
            <Grid item xs={12} sm={8}>
              <Paper className={classes.paper}>
                <Main title="Orelympic" />
              </Paper>
            </Grid>
            {/* Sidebar */}
            <Grid item xs={12} sm={4}>
              <Paper className={classes.paper}>
                <Sidebar
                  key={sidebar.id}
                  title={sidebar.title}
                  description={sidebar.description}
                  social={sidebar.social}
                />
              </Paper>
            </Grid>
          </Grid>
        </main>
      </Container>
    </React.Fragment>
  );
};

export default withRouter (Home);
