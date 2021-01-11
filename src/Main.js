import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";

const useStyles = makeStyles((theme) => ({
    mainGrid: {
      marginTop: theme.spacing(3),
    },
  }));

const Main = () => {
    return (
        <div>
            <Grid>
              <h1>スポーツ情報</h1>
              <br />
              <h1>イベントニュース</h1>
              <br />
            </Grid>
        </div>
    )
}

export default Main
