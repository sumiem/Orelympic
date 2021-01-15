import React from "react";

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

// データ取得　newData
import newsData from "./newsData";
import sportsData from "./newsData";

const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  control: {
    padding: theme.spacing(2),
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    flexGrow: 1,
    height: "100%",
    // transform: "translateZ(0)",
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
}));

const Main = (props) => {
  const classes = useStyles();

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
              <GridList className={classes.gridList} cols={2.5}>
                {sportsData.map((tile) => (
                  <GridListTile key={tile.img}>
                    <img src={tile.img} alt={tile.title} />
                    <GridListTileBar
                      title={tile.title}
                      classes={{
                        root: classes.titleBar,
                        title: classes.title,
                      }}
                      actionIcon={
                        <IconButton aria-label={`star ${tile.title}`}>
                          <StarBorderIcon className={classes.title} />
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
                {newsData.map((tile) => (
                  <GridListTile key={tile.img2}>
                    <img src={tile.img} alt={tile.title} />
                    <GridListTileBar
                      title={tile.title}
                      classes={{
                        root: classes.titleBar,
                        title: classes.title,
                      }}
                      actionIcon={
                        <IconButton aria-label={`star ${tile.title}`}>
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
