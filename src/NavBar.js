import React from "react";
import { auth } from "./firebase";
import { withRouter, useHistory, Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
// import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';

// スタイルの形式
const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  control: {
    padding: theme.spacing(2),
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  apptitle: {
    flexGrow: 1,
  },
}));

const NavBar = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <IconButton
            edge="start"
            // className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleClick}
          >
            <MenuIcon />           
          </IconButton>
        <Menu
          id="fade-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <Link to ="/" color="inherit">
          <MenuItem onClick={handleClose}>mainpage</MenuItem></Link>
          <Link to ="/sportsexp" color="inherit">
          <MenuItem onClick={handleClose}>mySportsList</MenuItem></Link>
          <Link to ="/sportslist" color="inherit">
          <MenuItem onClick={handleClose}>sportslist</MenuItem></Link>
        </Menu>
          <Typography
            variant="h6"
            color="inherit"
            className={classes.apptitle}
            noWrap
          >
            Orelympic Personal Page
          </Typography>
          {/* あとで、アカウントのボタン実装https://material-ui.com/components/app-bar/#app-bar*/}
          {auth && (
            <div>
              <Link to ="/" color="inherit">
              <Button variant="contained" color="primary">
                Mainpage
                </Button>
              </Link>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                // onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Button
                color="inherit"
                id="menu-appbar"
                onClick={async () => {
                  try {
                    await auth.signOut();
                    history.push("login");
                  } catch (error) {
                    alert(error.message);
                  }
                }}
              >
                Logout
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default withRouter(NavBar);
