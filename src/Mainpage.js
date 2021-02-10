import React, { useEffect } from "react";
import { db, auth } from "./firebase";
import { withRouter, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, login, logout } from "./features/userSlice";
// Style用
import { Avatar, Typography, Box } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";

import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
// import AccountCircle from "@material-ui/icons/AccountCircle";
import MySports from "./MySports";
import Main from "./Main";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
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
  large: {
    width: theme.spacing(13),
    height: theme.spacing(13),
  },
  apptitle: {
    flexGrow: 1,
  },
  box1: {
    marginRight: "30px",
  },
}));

const Mainpage = (props) => {
  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      !user && props.history.push("login");
    });
  return () => unSub();
  },[props.history]);
    const user = useSelector(selectUser);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  // const user = useSelector(selectUser);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const unSub = auth.onAuthStateChanged((authUser) => {
  //     // if (authUser){
  //     // }else{ props.history.push("login"); };
  //     if (authUser) {
  //       dispatch(
  //         login({
  //           uid: authUser.uid,
  //           photoUrl: authUser.photoURL,
  //           displayName: authUser.displayName,
  //         })
  //       );
  //     } else {
  //       dispatch(logout());
  //     }
  //   });
  //   return () => unSub();
  // }, [dispatch]);

  // console.log(user.photoUrl);
  const classes = useStyles();

  return (
    <>
      <React.Fragment>
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
          <Link to ="/facilityresistration" color="inherit">
          <Link to ="/instlist" color="inherit">
          <MenuItem onClick={handleClose}>インストラクターリスト</MenuItem></Link>
          <Link to ="/courselist" color="inherit">
          <MenuItem onClick={handleClose}>体験コース</MenuItem></Link>
          <MenuItem onClick={handleClose}>施設登録</MenuItem></Link>
          <Link to ="/instresistration" color="inherit">
          <MenuItem onClick={handleClose}>インストラクター登録</MenuItem></Link>
        </Menu>
            <Typography
              variant="h6"
              color="inherit"
              className={classes.apptitle}
              noWrap
            >
              Orelympic Mainpage
            </Typography>

            {auth && (
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  // onClick={handleMenu}
                  color="inherit"
                >
                  {/* <AccountCircle
                    src={user.photoUrl}
                    className={classes.avatar}
                  /> */}
                  <Avatar src={user.photoUrl} className={classes.avatar} />
                  {/* <Typography>{user.displayName}</Typography> */}
                </IconButton>
                <Button
                  color="inherit"
                  id="menu-appbar"
                  onClick={async () => {
                    try {
                      await auth.signOut();
                      props.history.push("login");
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

        <main>
          {/* Hero unit */}

          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Box
                display="flex"
                justifyContent="center"
                flexGrow="1"
                spacing="2"
              >
                <Box className={classes.box1}>
                  <Avatar src={user.photoUrl} className={classes.large} />
                  {/* <Avatar src={user.photoURL} className={classes.large} /> */}
                </Box>
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color="textPrimary"
                  gutterBottom
                >
                  {user.displayName}さん
                </Typography>
              </Box>

              <Grid>
                <Typography
                  variant="h5"
                  align="center"
                  color="textSecondary"
                  paragraph
                >
                  目標は全制覇！
                  <br />
                  さらなるメダルの獲得まであとすこし！
                  <br />
                </Typography>
                <div className={classes.heroButtons}>
                  <Grid container spacing={2} justify="center">
                    <Grid item>
                      <Link to="/sportsexp">
                        <Button variant="contained" color="primary">
                          種目を登録・探す
                        </Button>
                      </Link>
                    </Grid>
                    <Grid item> 
                      <Link to="/courselist">
                        <Button variant="contained" color="primary">
                          体験コースをみる
                        </Button>
                      </Link>
                    </Grid>
                    <Grid item> 
                      <Link to="/instlist">
                        <Button variant="contained" color="primary">
                         インストラクターを見る
                        </Button>
                      </Link>
                    </Grid>
                    {/* <Grid item>
                    <Button variant="outlined" color="primary">
                      今までの記録を見る
                    </Button>
                  </Grid> */}
                    {/* <Grid item>
                      <Button variant="outlined" color="primary">
                        ユーザー情報の登録
                      </Button>
                    </Grid> */}
                  </Grid>
                </div>
              </Grid>
            </Container>
          </div>

          <MySports />
          {/* ここから下は自分の写真と記録のアルバム */}
          {/* スポーツ一覧（メダルつき）エリアと、自分の投稿した写真エリア */}
          <Container className={classes.cardGrid} maxWidth="md">
            <Main />
          </Container>
        </main>

        {/* Footer */}
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            Footer
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            component="p"
          >
            Something here to give the footer a purpose!
          </Typography>
        </footer>
        {/* End footer */}
      </React.Fragment>
    </>
  );
};

// export default Mainpage;

export default withRouter(Mainpage);
