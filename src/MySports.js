import React, { useState, useEffect } from "react";
import { db } from "./firebase";
// import firebase from "firebase/app";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import "date-fns";
import Grid from "@material-ui/core/Grid";
// import DateFnsUtils from "@date-io/date-fns";
// import {
//   MuiPickersUtilsProvider,
//   KeyboardDatePicker,
// } from "@material-ui/pickers";

import { Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import Card from "@material-ui/core/Card";
// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import Radio from "@material-ui/core/Radio";
// import RadioGroup from "@material-ui/core/RadioGroup";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import FormLabel from "@material-ui/core/FormLabel";
// import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
// import CardActions from "@material-ui/core/CardActions";
// import CardContent from "@material-ui/core/CardContent";
// import IconButton from "@material-ui/core/IconButton";
// import { red } from "@material-ui/core/colors";
// import mainVisual from "./img/Mainvisual2.jpg";
// import StarBorderIcon from "@material-ui/icons/StarBorder";
import goldMedal from "./img/goldMedal.png";
// import { AccessTimeSharp, AcUnitRounded } from "@material-ui/icons";
import sports3 from "./img/sports3.jpg";

var moment = require("moment");

const useStyles = makeStyles((theme) => ({
    paper: {
        height: 240,
        width: 120,
      },
      control: {
        padding: theme.spacing(2),
      },
    stamp : {
        position: "relative",
        height: 200,
      },
    
    media: {
        height: 0,
        paddingTop: "100%", 
        // backgroundColor: "black",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        borderRadius: "50%",
    },

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

    img3: {
        margin: "auto",
        display: "block",
        maxWidth: "100%",
        maxHeight: "100%",
    },
    // message: {
    //     // position: "relative",
    //     // left: 0,
    //     // right: 0,
    //     // top: "75%",
    //     // bottom: 0,
    //     // display: "flex",
    //     // alignItems: "center",
    //     // justifyContent: "center",
    //     // color: theme.palette.common.white,
    //     // position: "absolute",
    //     position: "absolute",
    //     bottom: 0,
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     width: "100%",
    //     background: "linear-gradient(to top, #F00, transparent)",
    //     height: "25%",
    //     margin: "0, 0, 0, auto",
    //   },
    
}));

const MySports = () => {
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

    // const [sports, setSports] = useState([
    //     {
    //       id: "",
    //       image: "",
    //       sportsname: "",
    //       sportsimage: "",
    //     },
    //   ]);

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
                actDate: doc.data().actDate,
                actImage: doc.data().actImage,
                timestamp: doc.data().timestamp,
              }))
            )
          );
        return () => {
          unSub();
        };
      }, []);

    //   useEffect(() => {
    //     const unSub = db
    //       .collection("sports")
    //       .orderBy("timestamp", "desc")
    //       .onSnapshot((snapshot) =>
    //         setSports(
    //           snapshot.docs.map((doc) => ({
    //             id: doc.id,
    //             image: doc.data().image,
    //             sportsname: doc.data().sportsname,
    //             detail: doc.data().detail,
    //           }))
    //         )
    //       );
    //     return () => {
    //       unSub();
    //     };
    //   }, []);
    

// console.log(myActs) 
// ここまでうまく言ってる
    return (
        <div>
        <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
        <Grid container justify="center" spacing={1}>
            {myActs.map((myact) => (
            <Grid key={myact.id} item>
              <Grid className={classes.paper}>
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
                  <Box className={classes.imageButton}>
                    <img
                            className={classes.img3}
                            alt="complex"
                            src={goldMedal}
                            height="85"
                            width="85"
                    />
                  </Box>
                  <Box className={classes.messaage}>
                    <Typography>{myact.sportsname}</Typography>
                  </Box>
                </div>
              </Grid>
            </Grid>
            ))}
        </Grid>
        </Grid>
        </Grid>
        </div>
    );
};

export default MySports;


    // var acts = db.collectionGroup('acts').where('uid', '==', user.uid);
    // acts.get().then(function (querySnapshot) {
    // querySnapshot.forEach(function (doc) {
    //     console.log(doc.id, ' => ', doc.data());
    // });
    // });
