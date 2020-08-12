import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Divider } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { createStyles, useTheme, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#131619",
    opacity: 1,
    justifyContent: "center",
    padding: '2rem',
    position: 'absolute'
  },
  text: {
    letterSpacing: "1px",
    padding: "0 0 1rem 0",
    display: "block",
    overflow: "hidden",
  },
  socialMedia: {
    marginRight: "0.8em",
    display: "inline-block",
    height: "2rem",
    width: "2rem",
    verticalAlign: "middle"
  },
  bdLogo: {
    height: "2.8rem",
    marginLeft: "-9px"
  },

  bdIcon: {
    height: "3rem",
    width: "3rem",
    marginRight: "0.3em",
    marginLeft: "-0.55rem",
    display: "inline-block",
    verticalAlign: "middle",
  }

});

const Footer = () => {
  const classes = useStyles();
  return (
    <footer>
      <Grid container className={classes.root}>
        <Grid item xs={12} md={8}>
          <img src="/images/bigdipper-logo.svg" className={classes.bdLogo} />
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography variant="body2" className={classes.text} align="left">
            Big Dipper for Celo, presented by Forbole.
            </Typography>
        </Grid>

        <Grid item xs={12} md={8} >
          <Link
            href="https://cosmos.bigdipper.live"
            target="_blank"
            className={classes.bdIcon}
          >
            <img src="/images/bigdipper-icon.svg" />
          </Link>
          <Link
            href="https://github.com/forbole/big-dipper"
            target="_blank"
            className={classes.socialMedia}
          >
            <img src="/images/social-media-github.svg" />
          </Link>
          <Link
            href="https://medium.com/forbole"
            target="_blank"
            className={classes.socialMedia}
          >
            <img src="/images/social-media-medium.svg" />
          </Link>
          <Link
            href="https://twitter.com/bigdipperlive"
            target="_blank"
            className={classes.socialMedia}
          >
            <img src="/images/social-media-twitter.svg" />
          </Link>
        </Grid>
      </Grid>
    </footer>
  );
}

export default Footer