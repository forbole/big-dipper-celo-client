import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Link from "../components/Link";
import { makeStyles, useTheme, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import cx from "clsx";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles(({ spacing }) => {
  return {
    card: {
      display: "flex",
      padding: "0.3rem",
      justifyContent: "center",
      //borderLeft: "thick solid #FBCC5C",
      background: "#43484C",
      borderRadius: 5,
      //boxShadow: "0 2px 4px 0 rgba(138, 148, 159, 0.2)",
    },

    cGLD: {
      padding: "0.5rem 0 0.1rem 0.5rem",
    },
    cGLDPrice: {
      padding: "0.5rem 0.5rem 0.1rem 0",
    },

    marketCap: {
      padding: "0.1rem 0 0.5rem 0.5rem",
    },

    marketPrice: {
      padding: "0.1rem 0.5rem 0.5rem 0",
    },
  };
});

const MarketCard = () => {
  const classes = useStyles();
  return (
    <Card className={cx(classes.card)} elevation={0}>
      <Grid container>
        <Grid item xs={6} className={classes.cGLD}>
          <Typography align="left" variant="body1">
            cGLD Price
          </Typography>
        </Grid>
        <Grid item xs={6} className={classes.cGLDPrice}>
          <Typography align="right" variant="body1">
            $2.8
          </Typography>
        </Grid>
        <Grid item xs={6} className={classes.marketCap}>
          <Typography align="left" variant="body1">
            Market Cap
          </Typography>
        </Grid>
        <Grid item xs={6} className={classes.marketPrice}>
          <Typography align="right" variant="body1">
            $10,413,896
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

export default MarketCard