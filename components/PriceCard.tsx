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
    smallCard: {
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
    largeCard: {
      display: "flex",
      padding: "1rem",
      //border: "solid 1px rgba(61, 66, 71, 1)",
      background: "#43484C",
      borderRadius: 4,
      marginBottom: "1rem",
    },
    setFontSize: {
      marginRight: "-1.7rem",
      fontSize: "1.0625rem",
    },
  };
});

type PriceCardProps = { size: string };


const PriceCard = ({ size }: PriceCardProps) => {
  const classes = useStyles();
  switch (size) {
    case "small":
      return (
        <Card className={cx(classes.smallCard)} elevation={0}>
          <Grid container>
            <Grid item md={5}>
              <Typography align="left" variant="body2">
                cGLD Price
              </Typography>
            </Grid>
            <Grid item md={5}>
              <Typography
                align="right"
                variant="body2"
                className={classes.price}
              >
                $2.8
              </Typography>
            </Grid>
            <Grid item md={5} className={classes.inline}>
              <Typography align="left" variant="body2">
                Market Cap
              </Typography>
            </Grid>
            <Grid item md={5}>
              <Typography
                align="right"
                variant="body2"
                className={classes.price}
              >
                $10,413,896
              </Typography>
            </Grid>
          </Grid>
        </Card>
      );

    case "large":
      return (
        <Card className={cx(classes.largeCard)} elevation={0}>
          <Grid container>
            <Grid item xs={5}>
              <Typography align="left" variant="body1">
                cGLD Price
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="right" className={classes.setFontSize}>
                $2.8
              </Typography>
            </Grid>
            <Grid item xs={5} className={classes.inline}>
              <Typography align="left" variant="body1">
                Market Cap
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="right" className={classes.setFontSize}>
                $10,413,896
              </Typography>
            </Grid>
          </Grid>
        </Card>
      );
    default:
      return null;
  }
}

export default PriceCard