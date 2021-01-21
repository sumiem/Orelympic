import React, { useState, useEffect } from "react";
import { db } from "./firebase";
// Style 用
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
// import Divider from "@material-ui/core/Divider";

// データ取得newData
import newsData from "./newsData";
// import sportsData from "./sportsData";

const useStyles = makeStyles((theme) => ({
  // markdown: {
  //   ...theme.typography.body2,
  //   padding: theme.spacing(3, 0),
  // },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  // control: {
  //   padding: theme.spacing(2),
  //   root: {
  //     flexGrow: 1,
  //     padding: theme.spacing(2),
  //     textAlign: "center",
  //     color: theme.palette.text.secondary,
  //   },
  // },
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    // display: "flex",
    flexGrow: 1,
    // height: "100%",
    // transform: "translateZ(0)",
  },
  gridList2: {
    Width: "100%",
    Height: "60%",
    flexGrow: 1,
    height: 450,
  },

  title: {
    // color: theme.palette.primary.light,
    color: "000000"
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  img: {
    objectFit: "cover",
  }
}));

// SportsDataの表示

const Main = (props) => {
  const classes = useStyles();
  const [sports, setSports] = useState([
    {
      id: "",
      image: "",
      sportsname: "",
      detail: "",
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
            sportsname: doc.data().sportsname,
            detail: doc.data().detail,
          }))
        )
      );
    return () => {
      unSub();
    };
  }, []);


  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Grid>
          {/* <Typography variant="h6" gutterBottom>
                {title}
                </Typography> */}
          {/* <Divider /> */}
          {/* SPORTS内容 */}
          <Paper className={classes.paper}>
            <Typography variant="h6" gutterBottom>
              Sports
            </Typography>
            <div className={classes.root}>
              <GridList cellHeight={180} className={classes.gridList2} cols={3}>
                {sports.map((sportsdata) => (
                    <GridListTile key={sportsdata.id}>
                      <img src={sportsdata.image} alt={sportsdata.sportsname} />
                      <GridListTileBar
                        title={sportsdata.sportsname}
                        // subtitle={<span>by: </span>}
                        // classes={{
                        //   root: classes.titleBar,
                        //   title: classes.title,
                        // }}
                        actionIcon={
                          <IconButton aria-label={`star ${sportsdata.title}`} className={classes.icon}>
                            {/* <StarBorderIcon className={classes.title} /> */}
                          </IconButton>
                        }
                      />
                    </GridListTile>
                ))}
              </GridList>
            </div>
          </Paper>
          <br />

          {/* NEWS内容 */}
          <Paper className={classes.paper}>
            <Typography variant="h6" gutterBottom>
              News
            </Typography>
            <div className={classes.root}>
              <GridList className={classes.gridList} cols={2.5}>
                {newsData.map((tile3) => (
                  <GridListTile key={tile3.id}>
                      <img src={tile3.img} alt={tile3.title} className={classes.img}/>
                      <GridListTileBar
                        title={tile3.title}
                        classes={{
                          root: classes.titleBar,
                          title: classes.title,
                        }}
                        actionIcon={
                          <IconButton aria-label={`star ${tile3.title}`}>
                            <StarBorderIcon className={classes.title} />
                          </IconButton>
                        }
                      />
                  </GridListTile>
                ))}
              </GridList>
            </div>
          </Paper>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Main;
