import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { Redirect, withRouter, Link } from "react-router-dom";
import firebase from "firebase/app";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import Typography from "@material-ui/core/Typography";
// import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Button, IconButton, Box, Grid, Avatar } from "@material-ui/core";

// import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
// import Input from "@material-ui/core/Input";
// import InputLabel from "@material-ui/core/InputLabel";
// import MenuItem from "@material-ui/core/MenuItem";
// import FormControl from "@material-ui/core/FormControl";
// import Select from "@material-ui/core/Select";
// import Checkbox from "@material-ui/core/Checkbox";
// import Chip from "@material-ui/core/Chip";
// import Radio from "@material-ui/core/Radio";
// import RadioGroup from "@material-ui/core/RadioGroup";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import FormControl from '@material-ui/core/FormControl';
// import FormLabel from "@material-ui/core/FormLabel";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    //   width: '25ch',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: "md",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
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
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
}));

const InstList = () => {

    firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
          return <Redirect to="/home" />;
        }
      });
      const classes = useStyles();
      const user = useSelector(selectUser);
      const theme = useTheme();

      const [insts, setInsts] = useState([
        {
          id: "",
          instName: "",
          instImage: null,
          instUrl: "",
          phone: "",
          email: "",
          instDetail: "",
          spec: "",
          isntStyle: "",
          area: "",
          sports1: "",
          sports2: "",
          sports3: "",
        },
      ]);
      useEffect(() => {
        const unSub = db
          .collection("insts")
          .orderBy("timestamp", "desc")
          .onSnapshot((snapshot) =>
            setInsts(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                instName: doc.data().instName,
                instImage: doc.data().instImage,
                instUrl: doc.data().instUrl,
                phone: doc.data().instPhone,
                email: doc.data().instEmail,
                instDetail: doc.data().instDetail,
                spec: doc.data().spec,
                instStyle: doc.data().instStyle,
                area: doc.data().area,
                sports1: doc.data().sports1,
                sports2: doc.data().sports2,
                sports3: doc.data().sports3,
                timestamp: doc.data().timestamp,
              }))
            )
          );
        return () => {
          unSub();
        };
      }, []);    
    return (
        <>
        <div>
      <Container className={classes.cardGrid} maxWidth="md" spacing={4}>
              {/* <Grid container spacing={2}> */}
              <Grid container spacing={4}>
                {insts.map((inst) => (
                      <Card className={classes.root}>
                      <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                          インストラクター
                        </Typography>
                        <Avatar src={inst.instImage} className={classes.large} />
                        <Typography variant="h5" component="h2">
                        {inst.instName}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                        {inst.spec}
                        </Typography>
                        <Typography variant="body2" component="p">
                        ☑ 初回講習あり ☑ レンタルあり ☑初心者歓迎
                        </Typography>
                        <Typography variant="body2" component="p">
                        <div className={classes.chips}>
                        {inst.sports1 && (
                        <Chip key={inst.sports1} label={inst.sports1} className={classes.chip} />)}
                        {inst.sports2 && (
                        <Chip key={inst.sports2} label={inst.sports2} className={classes.chip} />)}
                        {inst.sports3 && (
                        <Chip key={inst.sports3} label={inst.sports3} className={classes.chip} />)}
                        </div>
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small"><a target="_blank" href={inst.instUrl} className={classes.link}>インストラクターURL</a></Button><br/>
                        <Link to="/courselist" color="inherit">
                          <Button variant="contained" color="primary">
                          体験コースをみる
                          </Button>
                        </Link>
                        <Button size="small">Detail</Button>
                      </CardActions>
                    </Card>
                ))}
              </Grid>
              {/* </Grid> */}
        </Container>
        </div>
            
        </>
    )
}

export default withRouter(InstList);
