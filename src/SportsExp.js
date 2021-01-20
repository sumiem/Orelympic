import React, { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { selectUser } from "./features/userSlice";

import SportsAct from "./SportsAct";
import NavBar from "./NavBar";

// import AppBar from "@material-ui/core/AppBar";
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
import CssBaseline from "@material-ui/core/CssBaseline";
import Gridlist from "@material-ui/core/GridList";
// import Grid from '@material-ui/core/Grid';
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  // root: {
  //   maxWidth: 345,
  //   flexGrow: 1,
  // },
  // icon: {
  //   marginRight: theme.spacing(2),
  // },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  // footer: {
  //   backgroundColor: theme.palette.background.paper,
  //   padding: theme.spacing(6),
  // },
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
      <div>
        {sports[0]?.id && (
          <>
            <Container className={classes.cardGrid} maxWidth="md">
              {/* <Grid container spacing={2}> */}
              <Gridlist spacing={4}>
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
              </Gridlist>
              {/* </Grid> */}
            </Container>
          </>
        )}
      </div>
    </>
  );
};

export default withRouter(SportsExp);

// ユーザ情報の取得（Reduxを使わなかった場合）↓ thenをsetUserの前に持ってくると解決するかも（実証まだ）
// const [user, setUser] = useState(null);
// useEffect(() => {
//     const unSub = auth.onAuthStateChanged((authUser) => {
//       if (authUser){ setUser(authUser);
//       }else{ setUser(null);
//       };
//     });
//       return () => unSub();
//     },);
// 例 UID: {user && user.uid}
