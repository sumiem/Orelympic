import React, { useState, useEffect } from "react";
import { db } from "./firebase";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "lg",
    flexGrow: 1,
  },
  // icon: {
  //   marginRight: theme.spacing(2),
  // },
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

const SportsList = () => {
  const classes = useStyles();
  const [sports, setSports] = useState([
    {
      id: "",
      image: "",
      sportsid: "",
      sportsname: "",
      detail: "",
      username: "",
      timestamp: "",
    },
  ]);

  useEffect(() => {
    const unSub = db
      .collection("sports")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setSports(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            image: doc.data().image,
            sportsid: doc.data().sportsid,
            sportsname: doc.data().sportsname,
            detail: doc.data().detail,
            timestamp: doc.data().timestamp,
          }))
        )
      );
    return () => {
      unSub();
    };
  }, []);

  // firebaseの情報を取得します
  // console.log (sports);

  // 表示
  return (
    <>
      <div>
        <Typography>スポーツ一覧</Typography>
      </div>

      {/* <div>{props.sportsname}</div> */}
      {/* <div>{props.timestamp}</div> */}

      <div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {sports.map((sport) => (
              <Grid item key={sport.id} xs={12} sm={6} md={4}>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Contemplative Reptile"
                      height="140"
                      image={sport.image}
                      //   image= {sport.image ? ("{sport.image}")
                      //   : ( "画像なし" )}
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {sport.sportsname}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {sports.detail}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      スポーツ登録リンク
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default SportsList;

// <ul>
//     {sports.map((sport) => (
//         <li>{sport.sportsname}</li>

// </ul>
