import React, { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import { makeStyles } from '@material-ui/core/styles';

import { useSelector, useDispatch } from "react-redux";
import { selectUser, login, logout } from "./features/userSlice";

import SportsAct from "./SportsAct"
import NavBar from "./NavBar"

import AppBar from "@material-ui/core/AppBar";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Gridlist from '@material-ui/core/GridList';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    flexGrow: 1,
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
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
}));

const SportsExp = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
    const classes = useStyles();
    const [sports, setSports] = useState([
        {
            id: "",
            image: "",
            sportsno: "",
            sportsname: "",
            detail: "",
            username: "",
            timestamp: "",
            sportsavatar:"",
        },
    ]);


    useEffect(() => {
        const unSub = db
          .collection("sports")
          .orderBy("timestamp", "desc")
          .onSnapshot((snapshot) =>
            setSports(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                image: doc.data().image,
                sportsno: doc.data().sportsno,
                sportsname: doc.data().sportsname,
                detail: doc.data().detail,
                timestamp: doc.data().timestamp,
                username: doc.data().username,
                sportsavatar: doc.data().sportsavatar
              }))
            )
          );
        return () => {
          unSub();
        };
      }, []);
    

    return (
        <>
        <CssBaseline />
        <NavBar />
        <div>
            <Typography>スポーツ一覧</Typography></div>
            {/* ログアウトの書き方あとでちぇっくして */}
            <Button
                  color="inherit"
                  id="menu-appbar"
                  onClick={async () => {
                    await auth.signOut();
                  }}
                >
                  Logout
                </Button>
        <button>
          logout
        </button>
        {/* <div>{props.sportsname}</div> */}
        {/* <div>{props.timestamp}</div> */}

        <div>
        {/* sportsがあって、idがある場合 */}
        {sports[0]?.id && (
          <>
          <Container className={classes.cardGrid} maxWidth="lg">
          {/* <Grid container spacing={2}> */}
            <Gridlist container spacing={4}>
            {sports.map((sport) => (
              <SportsAct
              key={sport.id}
              sportsId={sport.id}
              image={sport.image}
              sportsname={sport.sportsname}
              sportsno={sport.sportsid}
              detail={sport.detail}
              timestamp={sport.timestamp}
              uername={sport.username}
              sportsavatar={sport.sportsavatar}
              />
            ))}
            </Gridlist>
            {/* </Grid> */}
            </Container>
          </>
        )}

        </div>
        </>
    )
};


export default SportsExp

    // ユーザ情報の取得（Reduxを使わなかった場合）↓ thenをsetUserの前に持ってくると解決するかも（実証まだ）
    // const [user, setUser] = useState(null);
    // useEffect(() => {
    //     const unSub = auth.onAuthStateChanged((authUser) => {
    //       if (authUser){ setUser(authUser);
    //       }else{ setUser(null);
    //       };
    //     });
    //       return () => unSub();
    //     },);
        // 例 UID: {user && user.uid}
        
{/* <Container className={classes.cardGrid} maxWidth="md">
<Grid container spacing={4}>
    {sports.map((sport) => (
        <Grid item key={sport} xs={12} sm={6} md={4}>
        <Card className={classes.root}>
            <CardActionArea> 
            <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image= {sport.image}
            //   image= {sport.image ? ("{sport.image}") 
            //   : ( "画像なし" )}
            title="Contemplative Reptile"
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                {sport.sportsname}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                {sports.detail}
            </Typography>
            </CardContent>
            </CardActionArea>
            <CardActions>
            <Button size="small" color="primary">
            View
            </Button>
            <Button size="small" color="primary">
            スポーツ登録リンク
            </Button>
        </CardActions>
        </Card>
        </Grid>
        ))}

</Grid>
</Container> */}