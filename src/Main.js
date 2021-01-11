import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
// import Container from "@material-ui/core/Container";
// import Typography from "@material-ui/core/Typography";
// import Divider from "@material-ui/core/Divider";

// import Markdown from './Markdown';

const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
}));

const Main = (props) => {
  const classes = useStyles();
  //   const { posts, title } = props;

  return (
    <div>
      <Grid item xs={12} md={8}>
        {/* <Typography variant="h6" gutterBottom>
                {title}
                </Typography> */}
        {/* <Divider /> */}
        <Grid className={classes.markdown}></Grid>
      </Grid>
    </div>
  );
};

export default Main;
