import React, { useState, useEffect } from "react";
import { db, auth } from "./firebase";

import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// import Container from '@material-ui/core/Container';
// import Grid from '@material-ui/core/Grid';
import UpdateSports from "./UpdateSports";

const SportsLists = () => {
    // const classes = useStyles();
    const [sports, setSports] = useState([
        {
            id: "",
            image: "",
            // sportsid: "",
            sportsname: "",
            detail: "",
            username: "",
            timestamp: "",
            sportsLogo: "",
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
                sportsid: doc.data().sportsid,
                sportsname: doc.data().sportsname,
                detail: doc.data().detail,
                timestamp: doc.data().timestamp,
                sportsLogo: doc.data().sportsLogo,
              }))
            )
          );
        return () => {
          unSub();
        };
      }, []);



    return (
        <>
        <div><Typography>スポーツ一覧</Typography></div>
        {sports.map((sport) => (
            <p>{sport.detail}</p>
        ))}
        {/* <div>
        {sports.map((sport) => (
            <>
            <UpdateSports
              key={sport.id}
              id={sport.id}
              image={sport.image}
              sportsid={sport.sportsid}
              sportsname={sport.sportsname}              
              detail={sport.detail}
              timestamp={sport.timestamp}
              sportsLogo={sport.sportsLogo}
            />
            </>
        ))}
        </div> */}
        </>
    );
};

export default SportsLists
