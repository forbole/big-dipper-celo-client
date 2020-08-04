import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Layout from "../components/Layout";
import Grid from "@material-ui/core/Grid";
import AccountList from "../components/account/AccountList";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
    },

    bottomPadding: {
      padding: "1rem",
    },
  })
);

export default function Accounts() {
  const classes = useStyles();
  return (
    <Layout>
      <Grid container className={classes.root}>
        <Grid item xs={12} md={8} className={classes.bottomPadding}>
          <AccountList />
        </Grid>
      </Grid>
    </Layout>
  );
}
