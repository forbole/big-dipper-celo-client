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
      padding: "1rem",
      justifyContent: "center",
      background: "#43484C",
      borderRadius: 5,
    },


  };
});

const MarketCard = () => {
  const classes = useStyles();
  return (
    <Card className={cx(classes.card)} >
      <Grid container spacing={1}>
        <Grid item xs={6}  >
          <Typography align="left" variant="body1">
            cGLD Price
          </Typography>
        </Grid>
        <Grid item xs={6}  >
          <Typography align="right" variant="body1">
            $2.8
          </Typography>
        </Grid>
        <Grid item xs={6}  >
          <Typography align="left" variant="body1">
            Market Cap
          </Typography>
        </Grid>
        <Grid item xs={6}  >
          <Typography align="right" variant="body1">
            $10,413,896
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

export default MarketCard