import React from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
// import mainvisual1 from "./img/mainvisual1.jpg";
import mainvisual2 from "./img/Mainvisual2.jpg";

const useStyles = makeStyles((theme) => ({
    topMain: {
      position: 'relative',
      // backgroundColor: theme.palette.grey[800],
      color: theme.palette.common.white,
      marginBottom: theme.spacing(4),
    //   画像を組み込む
      backgroundImage: `url(${mainvisual2})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: 'rgba(0,0,0,.2)',
    },
    topMainContent: {
      position: 'relative',
      padding: theme.spacing(3),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(6),
        paddingRight: 0,
      },
    },
  }));

  export default function TopMain(props) {
    const classes = useStyles();
    const { post } = props;
  
    return (
      <Paper className={classes.topMain} style={{ backgroundImage: `url(${post.image})` }}>
        {/* Increase the priority of the hero background image */}
        {<img style={{ display: 'none' }} src={post.image} alt={post.imageText} />}
        <div className={classes.overlay} />
        <Grid container>
          <Grid item md={8}>
            <div className={classes.topMainContent}>
              <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                {post.title}
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                {post.description}
              </Typography>
              <Link variant="subtitle1" href="#">
                {post.linkText}
              </Link>
            </div>
          </Grid>
        </Grid>
      </Paper>
    );
  }
  
  // TopMain.propTypes = {
  //   post: PropTypes.object,
  // };