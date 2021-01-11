import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";

// コンテンツ
import Header from "./Header";
import TopMain from "./TopMain";
import Main from "./Main";
import Sidebar from "./Sidebar";
// import Footer from './Footer';
// import post1 from './blog-post.1.md';
// import post2 from './blog-post.2.md';
// import post3 from './blog-post.3.md';

// スタイルの形式
const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
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
  title: "俺たちのスポーツまつり　Orelympic",
  description:
    "オレリンピックとはXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  image: "https://source.unsplash.com/random",
  imgText: "main image description",
  linkText: "Continue reading…",
};

// カード
// const featuredPosts = [
//     {
//       title: 'Featured post',
//       date: 'Nov 12',
//       description:
//         'This is a wider card with supporting text below as a natural lead-in to additional content.',
//       image: 'https://source.unsplash.com/random',
//       imageText: 'Image Text',
//     },
//     {
//       title: 'Post title',
//       date: 'Nov 11',
//       description:
//         'This is a wider card with supporting text below as a natural lead-in to additional content.',
//       image: 'https://source.unsplash.com/random',
//       imageText: 'Image Text',
//     },
//   ];

// ポストの配列
// const posts = [post1, post2, post3];

const sidebar = {
  title: "Login",
  description: "今すぐ始める！　ログインページへ",
  social: [
    { name: "Twitter", icon: TwitterIcon },
    { name: "Facebook", icon: FacebookIcon },
  ],
};

const Home = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Header title="Orelymic Home" sections={sections} />
        <br />
        <main>
          <TopMain post={topMain} />
          <Grid container spacing={4}>
            {/* <h1>Orelympic説明</h1>
            <br /> */}
          </Grid>
          {/* メインのグリッド */}
          <Grid container spacing={5} className={classes.mainGrid}>
            <Main title="Orelympic" />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
    </React.Fragment>
  );
};

export default Home;
