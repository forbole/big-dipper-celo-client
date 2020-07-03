import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Layout from "../components/Layout";
import ChartData from "../components/ChartData";
import LatestBlocks from "../components/block/LatestBlocks";
import LatestTransactions from "../components/transaction/LatestTransactions";
import Grid from "@material-ui/core/Grid";
import AccountList from "../components/account/AccountList";

const useStyles = makeStyles((theme: Theme) =>
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
        <Grid item xs={12} className={classes.bottomPadding}>
          <AccountList />
        </Grid>
      </Grid>
    </Layout>
  );
}
