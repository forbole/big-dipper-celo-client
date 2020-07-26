import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "0 0 1rem 0",
      display: "inline-flex",
      borderRadius: 5,
      paddingBottom: "0",
    },

    card: {
      display: "inline-flex",
    },

    address: {
      overflowWrap: "break-word",
      padding: "0rem",
      margin: "-0.5rem 0rem",
    },
  })
);

const AddressCard = (address: any) => {
  const classes = useStyles();
  // console.log(address);
  return (
    <Card>
      <CardContent>
        <Grid container spacing={1} className={classes.card}>
          <Grid item xs={10} sm={10} md={10}>
            <Typography variant="body1" gutterBottom>
              Address
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="body2" gutterBottom align="center">
              <img src="/images/copy.svg" />
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="body2" gutterBottom align="center">
              <img src="/images/qr-code.svg" />
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.address}>
            <Typography variant="body2" align="left">
              {address.address}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default AddressCard