import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Layout from "../components/Layout";
import ChartData from "../components/ChartData";
import LatestBlocks from "../components/block/LatestBlocks";
import LatestTransactions from "../components/transaction/LatestTransactions";
import Grid from "@material-ui/core/Grid";
import Ledger from "../components/ledger/Ledger";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
    },

  })
);

export default function Index() {
  const classes = useStyles();
  return (
    <Layout >
      <Grid container  className={classes.root}>
        <Grid container spacing={2}>
        <Grid item xs={12} >
          <ChartData />
        </Grid>
        <Grid item xs={12} lg={6}  >
          <LatestBlocks pagination={false} displayCard={false} />
        </Grid>
        <Grid item xs={12} lg={6}  >
          <LatestTransactions pagination={false} />
        </Grid>
        <Grid item xs={12} lg={6}  >
          <Ledger />
        </Grid>
      </Grid>
      </Grid>
    </Layout>
  );
}
