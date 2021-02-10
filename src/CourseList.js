import React from 'react';
import { withRouter, Link } from "react-router-dom";
import tennis from "./img/TennisTaiken.png";
import volley from "./img/VolleyTaiken.png";
import beachv from "./img/BeachVTaiken.png";
import judo from "./img/JudoTaiken.png"
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import NavBar from "./NavBar";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    img3:{
            width: "100%",
            objectFit: "cover",
    },
  }));

const CourseList = () => {
    const classes = useStyles();
    return (
        <>
              <NavBar />
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
          <img
                        className={classes.img3}
                        alt="complex"
                        src={volley}
                      />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
          <img
                        className={classes.img3}
                        alt="complex"
                        src={judo}
                      />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
          <img
                        className={classes.img3}
                        alt="complex"
                        src={beachv}
                      />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
          <img
                        className={classes.img3}
                        alt="complex"
                        src={tennis}
                      />
          </Paper>
        </Grid>

      </Grid>
            
        </div>
        </>
    )
}

export default withRouter(CourseList);
