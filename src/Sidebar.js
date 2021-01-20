import React from "react";
// import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  sidebarLoginBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
}));

const Sidebar = (props) => {
  const classes = useStyles();
  const { social } = props;

  return (
    <Grid>
      {/* <Grid item xs={12} md={4}> */}
      <Paper elevation={0} className={classes.sidebarLoginBox}>
        <Typography variant="h6" gutterBottom>
          いますぐ始める？
        </Typography>
        <Link to="/login">
                  <Button variant="contained" color="primary">
                    ログインページへ
                  </Button>
                </Link>
      </Paper>
      <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
        Social
      </Typography>
      {social.map((network) => (
        <Grid display="block" variant="body1" href="#" key={network.id}>
          <Grid container direction="row" spacing={1} alignItems="center">
            <Grid item>
              <network.icon />
            </Grid>
            <Grid item>{network.name}</Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}
export default withRouter(Sidebar);

// Sidebar.propTypes = {
//   archives: PropTypes.array,
//   description: PropTypes.string,
//   social: PropTypes.array,
//   title: PropTypes.string,
// };
