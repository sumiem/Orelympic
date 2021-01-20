import React from "react";
import { withRouter, Link } from "react-router-dom";

// Style用
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
// import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { CssBaseline } from "@material-ui/core";

// Style用
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  icon: {
    marginRight: theme.spacing(2),
  },
}));

const Header = (props) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          {/* <CameraIcon className={classes.icon} /> */}
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            className={classes.title}
            // noWrap
          >
            Orelympic Home
          </Typography>
          <Link to="/login" color="inherit">
            <Button variant="contained" color="primary">
              Login
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default withRouter(Header);
