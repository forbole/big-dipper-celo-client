import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AccountList from "../components/account/AccountList";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
    },

  })
);

export default function Accounts() {
  const classes = useStyles();
  return (
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={12}>
          <AccountList />
        </Grid>
      </Grid>
  );
}
