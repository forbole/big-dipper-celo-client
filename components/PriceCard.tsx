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
    inline: {
      //marginRight: '0rem',
    },
    card: {
      display: "flex",
      padding: "0.5rem",
      border: "solid 1px rgba(61, 66, 71, 1)",
      background: "#43484C",
      borderRadius: 4,
      width: "13rem",
    },
    price: {
      marginRight: "-1.7rem",
    },
  };
});

export default function PriceCard() {
  const classes = useStyles();
  return (
    <Card className={cx(classes.card)} elevation={0}>
      <Grid container>
        <Grid item md={5}>
          <Typography align="left" variant="body2">
            cGLD Price
          </Typography>
        </Grid>
        <Grid item md={5}>
          <Typography align="right" variant="body2" className={classes.price}>
            $2.8
          </Typography>
        </Grid>
        <Grid item md={5} className={classes.inline}>
          <Typography align="left" variant="body2">
            Market Cap
          </Typography>
        </Grid>
        <Grid item md={5}>
          <Typography align="right" variant="body2" className={classes.price}>
            $10,413,896
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}
