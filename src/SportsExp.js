import React, { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter, Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { selectUser } from "./features/userSlice";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

import SportsAct from "./SportsAct";
import NavBar from "./NavBar";

// import AppBar from "@material-ui/core/AppBar";
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
import CssBaseline from "@material-ui/core/CssBaseline";
// import Gridlist from "@material-ui/core/GridList";
import Grid from '@material-ui/core/Grid';
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

const SportsExp = (props) => {
  // const user = useSelector(selectUser);
  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      !user && props.history.push("login");
    });
    return () => unSub();
  });
  // const dispatch = useDispatch();
  const classes = useStyles();
  const [sports, setSports] = useState([
    {
      id: "",
      image: "",
      sportsno: "",
      sportsname: "",
      detail: "",
      username: "",
      timestamp: "",
      sportsavatar: "",
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
            sportsno: doc.data().sportsno,
            sportsname: doc.data().sportsname,
            detail: doc.data().detail,
            timestamp: doc.data().timestamp,
            username: doc.data().username,
            sportsavatar: doc.data().sportsavatar,
          }))
        )
      );
    return () => {
      unSub();
    };
  }, []);

  return (
    <>
      <CssBaseline />
      <NavBar />
      <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Grid>
                <Typography
                  variant="h5"
                  align="center"
                  color="textSecondary"
                  paragraph
                >
                     
                <br/>まだやってない種目を探してみよう
                </Typography>
                <div className={classes.heroButtons}>
                  <Grid container spacing={2} justify="center">
                    <Grid item> 
                      <Link to="/courselist">
                        <Button variant="contained" color="primary">
                          体験コース
                        </Button>
                      </Link>
                    </Grid>
                    <Grid item> 
                      <Link to="/instlist">
                        <Button variant="contained" color="primary">
                         インストラクター
                        </Button>
                      </Link>
                    </Grid>
                    <Grid item> 
                      <Link to="/myactlist">
                        <Button variant="contained" color="primary">
                         MY記録
                        </Button>
                      </Link>
                    </Grid>
                    <Grid item> 
                      <Link to="/facilityresistration">
                        <Button variant="contained" color="primary">
                         施設登録
                        </Button>
                      </Link>
                    </Grid>
                    {/* <Grid item>
                      <Button variant="outlined" color="primary">
                        ユーザー情報の登録
                      </Button>
                    </Grid> */}
                  </Grid>
                </div>
              </Grid>
            </Container>
          </div>
      <div>
        {sports[0]?.id && (
          <>
            <Container className={classes.cardGrid} maxWidth="md" spacing={4}>
              {/* <Grid container spacing={2}> */}
              <Grid container spacing={4}>
                {sports.map((sport) => (
                  <SportsAct
                    key={sport.id}
                    sportsId={sport.id}
                    image={sport.image}
                    sportsname={sport.sportsname}
                    sportsno={sport.sportsid}
                    detail={sport.detail}
                    timestamp={sport.timestamp}
                    uername={sport.username}
                    sportsavatar={sport.sportsavatar}
                  />
                ))}
              </Grid>
              {/* </Grid> */}
            </Container>
          </>
        )}
      </div>
    </>
  );
};

export default withRouter(SportsExp);
