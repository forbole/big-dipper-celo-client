import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Divider } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { createStyles, useTheme, Theme } from "@material-ui/core/styles";
import theme from "../themes/celo-theme"

const useStyles = makeStyles({
  root: {
    backgroundColor: "#131619",
    opacity: 1,
    justifyContent: "center",
    padding: '2rem 0',
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
  },

  footerLink: {
    color: theme.palette.common.white,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  }

});

const Footer = () => {
  const classes = useStyles();
  return (
    <footer>
      <Grid container className={classes.root}>
        <Grid item sm={11} md={9}>
          <div><img src="/images/bigdipper-logo.svg" className={classes.bdLogo} /></div>
          <div><Typography variant="body2" className={classes.text} align="left">
            Big Dipper for Celo, presented by <a href="https://forbole.com" className={classes.footerLink} target="_blank">Forbole</a>.
            </Typography></div>
          <div>
          <Link
            href="https://github.com/forbole/big-dipper-celo-client"
            target="_blank"
            className={classes.socialMedia}
          >
            <img src="/images/social-media-github.svg" />
          </Link>
          <Link
            href="https://medium.com/bigdipperlive"
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
          </Link></div>
        </Grid>
      </Grid>
    </footer>
  );
}

export default Footer