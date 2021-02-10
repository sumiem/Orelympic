import React, { useState, useEffect } from "react";
import { db } from "./firebase";
// import firebase from "firebase/app";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import NavBar from "./NavBar";
import Card from "@material-ui/core/Card";
import mainVisual from "./img/Mainvisual2.jpg";
import certificate from "./img/certificate.png";

import CardContent from "@material-ui/core/CardContent";
// import DateFnsUtils from "@date-io/date-fns";
// import {
//   MuiPickersUtilsProvider,
//   KeyboardDatePicker,
// } from "@material-ui/pickers";

import { Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import goldMedal from "./img/goldMedal.png";
import sports3 from "./img/sports3.jpg";
import msilver from "./img/mSilver.png";
import mbronze from "./img/mBronze.png";

import "date-fns";
var moment = require("moment");
const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
      },
    paper: {
        // height: 240,
        width: 270,
      },
    stamp : {
        position: "relative",
        // height: 300,
      },
    media: {
        height: 0,
        paddingTop: "100%", 
        backgroundSize: "cover",
        backgroundPosition: "center center",
        borderRadius: "10%",
    },
    // media: {
    //     height: 0,
    //     paddingTop: "56.25%", // 16:9
    //   },
// メダルの位置
    imageButton: {
        position: "absolute",
        left: `$50%`,
        right: -15,
        top: -25,
        bottom: `$30%`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: theme.palette.common.white,
    },
    imageButton2: {
        position: "absolute",
        left: `$50%`,
        top: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: theme.palette.common.white,
    },
    
    root: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        maxWidth: 360,
        borderRadius: 20,
        // maxHeight: 2000,
      },

      cardContent: {
        flexGrow: 1,
        postision: "relative",
      },

      image5: {
        position: "relative",
        height: 200,
      },
    
      img3: {
        margin: "auto",
        display: "block",
        maxWidth: "100%",
        maxHeight: "100%",
      },

      actdetail0: {
        // position: "absolute",
        // bottom: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        // background: "linear-gradient(to top,  #000000, transparent)",
        // height: "30%",
        // margin: "0, 0, 0, auto",
      },
      actdetail: {
        position: "absolute",
        bottom: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        background: "linear-gradient(to top,  #000000, transparent)",
        height: "30%",
        margin: "0, 0, 0, auto",
      },

      actdetail1: {
        position: "absolute",
        top: "53%",
        // left: "50%",
        display: "flex",
        alignItems: "cecnter",
        justifyContent: "center",
        width: "40%",
        // background: "linear-gradient(to top,  #FFF, transparent)",
        height: "10%",
        margin: "0, 0, 0, auto",
      },
      acttitle: {
        color: "white",
      },
      details: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      hiddenicon: {
        textAlign: "center",
        display: "none",
      },
      addiconloaded: {
        cursor: "pointer",
        color: "gray",
      },
      addicon: {
        cursor: "pointer",
        color: "primary",
      },
}));

const MyActList = () => {
    const user = useSelector(selectUser);
    const classes = useStyles();
    const [myActs, setMyActs] = useState([
        {
            // actのid
            id: "",
            // スポーツのデータ
            sportsId: "",
            sportsname: "",
            sportsimage: "",
            // 自分のデータ
            acttitle: "",
            actDate: "",
            actImage: "",
            timestamp: "",
            // sportsavatar:"",
        },
    ]);

    useEffect(() => {
        const unSub = db
          .collectionGroup('acts')
          .where('uid', '==', user.uid)
          .orderBy("timestamp", "desc")
          .onSnapshot((snapshot) =>
            setMyActs(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                sportsId: doc.data().sportsId,
                sportsname: doc.data().sportsname,
                sportsimage: doc.data().sportsimage,
                acttitle: doc.data().acttitle,
                actcomment: doc.data().actcomment,
                level: doc.data().level,
                actDate: doc.data().actDate,
                actImage: doc.data().actImage,
                timestamp: doc.data().timestamp,
              }))
            )
          );
        return () => {
          unSub();
        };
      });
    

// console.log(myActs) 
// ここまでうまく言ってる
    return (
        <>
        <NavBar />
        <Container className={classes.cardGrid} maxWidth="lg">
        {/* <Grid container className={classes.root} spacing={3}> */}
        <Grid container spacing={3}>
        <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
            {myActs.map((myact) => (
            <Grid key={myact.id} item>
              <Grid className={classes.paper}>
              <Box className={classes.actdetail0} >
                    <Typography fontWeight="fontWeightBold">{myact.sportsname}</Typography>
              </Box>
                <div className={classes.stamp}>
                {myact.actImage && (
                  <Box className={classes.media}
                          style={{
                            backgroundImage: `url(${myact.actImage})`,
                          }}
                        />
                )}
                {!myact.actImage && (
                    <Box className={classes.media}
                        style={{
                            backgroundImage: `url(${sports3})`,
                            }}
                    />
                    )}
                  {/* <Box className={classes.imageButton}>
                    <img
                            className={classes.img3}
                            alt="complex"
                            src={goldMedal}
                            height="85"
                            width="85"
                    />
                  </Box> */}
                  <Box className={classes.imageButton2}>
                    <img
                            className={classes.img2}
                            alt="complex"
                            src={certificate}
                            // height="100%"
                            width="100%"
                    />
                  </Box>
                  </div>
                  <div>
                    <Box>
                    <Typography>{myact.acttitle}</Typography>
                    </Box><Box className={classes.actdetail3}>
                    <Typography>{myact.actcomment}</Typography>
                    </Box><Box className={classes.actdetail4}>
                    <Typography>
                      {" "}
                      {myact.actDate &&
                        moment(new Date(myact.actDate?.toDate())).format(
                          "Do MMM"
                        )}
                    </Typography>
                  </Box>
                </div>
              </Grid>
            </Grid>
            ))}
        </Grid>
        </Grid>
        </Grid>
        </Container>
        </>
    );
};

export default MyActList;


    // var acts = db.collectionGroup('acts').where('uid', '==', user.uid);
    // acts.get().then(function (querySnapshot) {
    // querySnapshot.forEach(function (doc) {
    //     console.log(doc.id, ' => ', doc.data());
    // });
    // });
