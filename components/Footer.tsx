import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Divider } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import { createStyles, useTheme, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: "#131619",
      opacity: 1,
      //padding: "1.5rem 1rem",
      justifyContent: "center",
      padding: '2rem',
      position: 'absolute'
    },
    text: {
      letterSpacing: "1px",
      padding: "1rem 0",
      display: "block",
      overflow: "hidden",
    },
    socialMedia: {
      marginRight: "0.8em",
      display: "inline-block",
      height: "2rem",
      width: "2rem",
    },
  })
);

export default function Footer() {
  const classes = useStyles();
  return (
    <footer>
        <Grid container className={classes.root}>
          <Grid item xs={12} sm={12} md={8}>
            <img src="/images/celo_logo.svg" />
          </Grid>

          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="caption" className={classes.text} align="left">
              Big Dipper for Celo. Let’s make money connected.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12} md={8} style={{ marginBottom: "0.5rem" }}>
            <Link
              href="https://github.com/celo-org"
              className={classes.socialMedia}
            >
              <img src="/images/social media_github.svg" />
            </Link>
            <Link
              href="https://medium.com/celoorg"
              className={classes.socialMedia}
            >
              <img src="/images/social media_medium.svg" />
            </Link>
            <Link
              href="https://twitter.com/CeloOrg"
              className={classes.socialMedia}
            >
              <img src="/images/social media_twitter.svg" />
            </Link>
          </Grid>
        </Grid>
    </footer>
  );
}
